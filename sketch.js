Papa.parse('spotify_summary.csv', {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    console.log("running");
    console.log(results.data);
    const tbody = document.querySelector('#dataTable tbody');
 
    results.data.forEach(row => {
 
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
  },
 
  error: function(err) {
    console.error("FAILED");
    console.error(err);
  }
});