/**
 * Create a chart.
 *
 * @param {string} element
 * @param {array} labels
 * @param {array} data
 * @param {string} platoon
 */
const createRadarChart = (element, labels, data, platoon) => {
  const ctx = document.getElementById(element).getContext('2d');

  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [
        {
          label: platoon,
          backgroundColor: 'rgba(255, 99, 132, 0.3)',
          borderColor: 'rgb(255, 99, 132)',
          data,
        },
        {
          label: 'Richtlijn',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 255, 0, 0.5)',
          data: [3, 3, 3, 3, 3],
        }
      ],
    },
    options: {
      scale: {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 5
        }
      }}
  });

};

