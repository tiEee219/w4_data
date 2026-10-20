const tempoFilter = document.getElementById('tempoFilter');
const sortOrder = document.getElementById('sortOrder');

let allData = [];
let chart = null;

Papa.parse('spotify_summary.csv', {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
  allData = results.data;
  updateDisplay();
},
  error: function(err) {
    console.error("FAILED");
    console.error(err);
  }
});
tempoFilter.addEventListener('change', updateDisplay);
sortOrder.addEventListener('change', updateDisplay);

function updateDisplay() {
  let rows = allData.filter(row => {
  const score = Number(row.avg_danceability);

  if (tempoFilter.value === 'higher') {
    return score >= 0.6;
  }

  if (tempoFilter.value === 'lower') {
    return score < 0.6;
  }

  return true;
 });
  
  if (sortOrder.value === 'dance_desc') {
    rows.sort((a, b) =>
      Number(b.avg_danceability) - Number(a.avg_danceability)
    );
  }
  const tbody = document.querySelector('#dataTable tbody');
  tbody.innerHTML = '';

  rows.forEach(row => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${row.tempo_group}</td>
      <td>${row.song_count}</td>
      <td>${row.avg_tempo}</td>
      <td>${row.avg_danceability}</td>
      <td>${row.min_danceability}</td>
      <td>${row.max_danceability}</td>
    `;

    tbody.appendChild(tr);
  });
  const labels = rows.map(row => row.tempo_group);
  const values = rows.map(row => Number(row.avg_danceability));

  if (chart) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.update();

  } else {
    chart = new Chart(
      document.getElementById('danceabilityChart'),
      {
        type: 'bar',

        data: {
          labels: labels,
          datasets: [{
            label: 'Average Danceability',
            data: values,
            backgroundColor: '#4e79a7'
          }]
        },

        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Tempo Range (BPM)'
              }
            },

            y: {
              min: 0,
              max: 1,

              title: {
                display: true,
                text: 'Average Danceability'
              }
            }
          }
        }
      }
    );
  }
}
