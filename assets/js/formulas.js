// Add a replaceAll function to the string prototype.
String.prototype.replaceAll = function(search, replacement) {
  const target = this;
  return target.split(search).join(replacement);
};

/**
 * Fetch all formulas in the database.
 *
 * @returns {Promise<any>}
 */
const getFormulas = async () => {
  const req = await fetch('/formulas');
  return await req.json();
};

/**
 * Solve the formula using the endpoint and update the value of the fields.
 *
 * @param formula
 * @param variables
 *
 * @returns {Promise<void>}
 */
const updateField = async (formula, variables) => {
  let formattedFormula = formula.formula;
  for (let i = 0; i < variables.length; i ++) {
    // Remove the '< >' characters.
    const varField = variables[i].replace(/[<>]/g, '');

    const value = document.getElementById(varField).value || 0;
    formattedFormula = formattedFormula.replaceAll(variables[i], value);
  }

  // The formula is solved in the back-end.
  const request = await fetch('/formulas/solve', {
    method: 'POST',
    body: JSON.stringify({formula: formattedFormula}),
  });

  const result = await request.json();

  if (result.error) {
    // Handle Error.
    return;
  }

  // Set the value in the input field in the DOM.
  document.getElementById(formula.field).value = result.value.toFixed(2);
};

/**
 * Check which formula is needed on the page and set EventListeners.
 *
 * @returns {Promise<void>}
 */
const setFormulas = async () => {
  const formulas = await getFormulas();

  // Loop through all formulas in the system.
  for (let i = 0; i < formulas.length; i ++) {
    // Check if the formula is used on this page.
    if (!document.getElementById(formulas[i].field)) {
      continue;
    }

    // Get all variables from the formula string.
    const variables = formulas[i].formula.match(/<(.*?)>/g);

    // Remove duplicate variables.
    const uniqueVariables = variables.filter((item, pos, self) => {
      return self.indexOf(item) === pos;
    });

    for (let y = 0; y < uniqueVariables.length; y ++) {
      // Remove the '< >' characters.
      const varField = uniqueVariables[y].replace(/[<>]/g, '');

      // Stop if a field is missing.
      if (!document.getElementById(varField)) {
        break;
      }

      // Set EventListener that runs with every input change.
      document.getElementById(varField).addEventListener('input', async () => await updateField(formulas[i], uniqueVariables));
    }
  }
};

setFormulas();
