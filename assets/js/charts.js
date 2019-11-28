/**
 * Create a chart.
 *
 * @param {HTMLCanvasElement} element
 * @param {string} model
 */
const createChart = (element, model) => {
  // const ctx = document.getElementById(element).getContext('2d');

  // eslint-disable-next-line no-undef
  new Chart(element, {
    type: 'radar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45]
      }]
    },
    options: {}
  });

};

