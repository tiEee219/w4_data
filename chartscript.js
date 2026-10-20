Papa.parse('spotify_summary.csv', {
  download: true,
  header: true,
  skipEmptyLines: true,

  complete: function(results) {
    const labels = [];
    const values = [];

    results.data.forEach(row => {
      labels.push(row.tempo_group);
      values.push(cleanNumber(row.avg_danceability));
    });

    new Chart(
      document.getElementById('danceabilityChart'),
      {
        type: 'bar',

        data: {
          labels: labels,
          datasets: [{
            label: 'Average Danceability',
            data: values,
            backgroundColor: '#9b4a4a'
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
              type: 'linear',
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
  },

  error: function(err) {
    console.error("FAILED TO LOAD CHART DATA");
    console.error(err);
  }
});

function cleanNumber(value) {
  return Number(
    String(value).replace(/[^0-9.-]/g, '')
  );
}