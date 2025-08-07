document.addEventListener('DOMContentLoaded', () => {

async function displayBestCaptains() {
  const combinedData = await combineData();
  const transfers = await fetchTeamIDAndPlayerNames();
  const transfers1 = transfers.picks;
  const transfers2 = transfers1.map(transfer => transfer.element);

  if (!combinedData || combinedData.length === 0) {
    console.error('No combined data available');
    return;
  }

  if (!transfers) {
    console.error('No transfers data available');
    return;
  }

  const players = combinedData.filter(player => player.positionID !== 5);

  players.sort((a, b) => b.expected_points_next_gw - a.expected_points_next_gw);

  const topPlayers = players.slice(0, 25);

  const tableContainer = document.createElement('div');
  const tableTitle = document.createElement('h2');
  tableTitle.textContent = 'Top Player by Expected Points Next GW';
  tableContainer.appendChild(tableTitle);

  const table = document.createElement('table');
  table.style.width = '100%';
  table.setAttribute('border', '1');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['Web Name', 'Expcted Points Next GW', 'Selected By'];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  topPlayers.forEach(player => {
    const row = document.createElement('tr');

    const webNameCell = document.createElement('td');
    webNameCell.textContent = player.web_name;
    row.appendChild(webNameCell);

    const epNextCell = document.createElement('td');
    epNextCell.textContent = player.expected_points_next_gw;
    row.appendChild(epNextCell);

    const selectedByCell = document.createElement('td');
    selectedByCell.textContent = player.selectedBy; 
    row.appendChild(selectedByCell);

    if (transfers2.includes(player.Id)) {
      row.style.backgroundColor = 'lightgreen';
    }

    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  tableContainer.appendChild(table);

  // Append the table to the new-page-content div
  const bestCaptainsContent = document.getElementById('best-captains-content');
  bestCaptainsContent.innerHTML = ''; // Clear any existing content
  bestCaptainsContent.appendChild(tableContainer);
}
// Ensure displayBestCaptains is available globally
window.displayBestCaptains = displayBestCaptains;

});
