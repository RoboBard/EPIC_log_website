document.getElementById('acForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedACs = Array.from(document.getElementById('acSelect').selectedOptions)
                             .map(option => option.value)
                             .join(',');

    fetchLogs(selectedACs);
});

async function fetchLogs(selectedACs) {
    const response = await fetch(`YOUR_API_GATEWAY_URL?ac=${selectedACs}`);
    const data = await response.json();
    const logs = data.logs;
    const summary = data.summary;

    document.getElementById('totalLogs').textContent = summary.total_logs;
    document.getElementById('totalErrors').textContent = summary.total_errors;
    document.getElementById('totalWarnings').textContent = summary.total_warnings;

    const table = document.getElementById('logTable').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Clear existing rows
    logs.forEach(log => {
        const row = table.insertRow();
        const cell = row.insertCell(0);
        cell.textContent = log;
    });
}

// Initial load with no ACs selected
fetchLogs('');
