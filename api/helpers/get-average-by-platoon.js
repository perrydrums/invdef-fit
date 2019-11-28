module.exports = {

  friendlyName: 'Get Average by Platoon',
  description: 'Get average of a certain field, based on platoon.',
  inputs: {
    table: {
      type: 'string',
      required: true,
    },
    field: {
      type: 'string',
      required: true,
    },
    platoon: {
      type: 'number',
      required: true,
    }
  },

  fn: async (inputs) => {
    const query = `
    SELECT AVG(${inputs.field}) AS v
    FROM ${inputs.table} AS i
    INNER JOIN anatomies ON i.anatomyId = anatomies.id
    WHERE anatomies.platoon = ${inputs.platoon}
    `;

    const result = await Anatomies.getDatastore().sendNativeQuery(query);
    return result.rows[0].v || null;
  }

};

