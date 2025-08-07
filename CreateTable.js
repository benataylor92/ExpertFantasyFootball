async function createTable(title, players, tableHeaders, columnData, pageDataHeading, columnDataFormatting) {
    const transfers = await fetchTeamIDAndPlayerNames();
    const transfers1 = transfers.picks;
    const transfers2 = transfers1.map(transfer => transfer.element);

    const tableContainer = document.createElement('div');

    const tableTitle = document.createElement('h2');
    tableTitle.classList.add('table-title');
    tableTitle.textContent = title;
    tableContainer.appendChild(tableTitle);

    const table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    tableHeaders.forEach((headerText, index) => {
      const th = document.createElement('th');
      th.textContent = headerText;
      th.addEventListener('click', () => sortTable(players, index));
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    let showAll = false;

    function renderTableRows(players) {
      tbody.innerHTML = '';
      const playersToShow = showAll ? players : players.slice(0, 10);

      playersToShow.forEach(item => {
          const row = document.createElement('tr');

          const webNameCell = document.createElement('td');
          webNameCell.textContent = item.web_name || ''; 
          row.appendChild(webNameCell);
          
          if(columnDataFormatting[1] === 'string') {
              const teamCell = document.createElement('td');
              teamCell.textContent = item[columnData[1]] || ''; 
              row.appendChild(teamCell);
          } else {
          const PointsPerGameCell = document.createElement('td');
          PointsPerGameCell.textContent = columnData[1] 
              ? (item[columnData[1]] !== undefined ? parseFloat(item[columnData[1]]).toFixed(columnDataFormatting[1]) : '') 
              : '';
          row.appendChild(PointsPerGameCell);
          }

          const FormCell = document.createElement('td');
          FormCell.textContent = columnData[2] && columnData[7]
              ? `${item[columnData[2]] !== undefined ? parseFloat(item[columnData[2]]).toFixed(columnDataFormatting[2]) : ''} (${item[columnData[7]] !== undefined ? parseFloat(item[columnData[7]]).toFixed(columnDataFormatting[7]) : ''})`
              : (item[columnData[2]] !== undefined ? parseFloat(item[columnData[2]]).toFixed(columnDataFormatting[2]) : '');
          row.appendChild(FormCell);
          
          const difficultyFactorCell = document.createElement('td');
          difficultyFactorCell.textContent = columnData[3] 
              ? (item[columnData[3]] !== undefined ? parseFloat(item[columnData[3]]).toFixed(columnDataFormatting[3]) : '') 
              : '';
          row.appendChild(difficultyFactorCell);
          
          const difficultyFactor3Cell = document.createElement('td');
          difficultyFactor3Cell.textContent = columnData[4] && columnData[8]
              ? `${item[columnData[4]] !== undefined ? parseFloat(item[columnData[4]]).toFixed(columnDataFormatting[4]) : ''} (${item[columnData[8]] !== undefined ? parseFloat(item[columnData[8]]).toFixed(columnDataFormatting[8]) : ''})`
              : (item[columnData[4]] !== undefined ? parseFloat(item[columnData[4]]).toFixed(columnDataFormatting[4]) : '');
          row.appendChild(difficultyFactor3Cell);
          
          if(columnDataFormatting[5] === 'string') {
            const teamCell = document.createElement('td');
            teamCell.textContent = item[columnData[5]] || ''; 
            row.appendChild(teamCell);
        } else {
          const difficultyFactor5Cell = document.createElement('td');
          difficultyFactor5Cell.textContent = columnData[5] 
              ? (item[columnData[5]] !== undefined ? parseFloat(item[columnData[5]]).toFixed(columnDataFormatting[5]) : '') 
              : '';
          row.appendChild(difficultyFactor5Cell);
        }
         
          if(columnDataFormatting[6] === 'string') {
            const teamCell = document.createElement('td');
            teamCell.textContent = item[columnData[6]] || ''; 
            row.appendChild(teamCell);
        } else {
          const selectedByCell = document.createElement('td');
          selectedByCell.textContent = columnData[6] && columnData[9]
              ? `${item[columnData[6]] !== undefined ? parseFloat(item[columnData[6]]).toFixed(columnDataFormatting[6]) : ''} (${item[columnData[9]] !== undefined ? parseFloat(item[columnData[9]]).toFixed(columnDataFormatting[9]) : ''})`
              : (item[columnData[6]] !== undefined ? parseFloat(item[columnData[6]]).toFixed(columnDataFormatting[6]) : '');
          row.appendChild(selectedByCell);
        }
          
          if (transfers2.includes(item.Id)) {
              row.style.backgroundColor = 'lightgreen';
          }
          
          tbody.appendChild(row);
      });
    }

    function sortTable(players, columnIndex) {
      const sortDirection = headerRow.children[columnIndex].getAttribute('data-sort-direction') === 'asc' ? 'desc' : 'asc';
      headerRow.children[columnIndex].setAttribute('data-sort-direction', sortDirection);

      players.sort((a, b) => {
        let aText, bText;

        switch (columnIndex) {
          case 0:
            aText = a.web_name;
            bText = b.web_name;
            break;
          case 1:
            aText = parseFloat(a[columnData[columnIndex]]);
            bText = parseFloat(b[columnData[columnIndex]]);
            break;
          case 2:
            aText = parseFloat(a[columnData[columnIndex]]);
            bText = parseFloat(b[columnData[columnIndex]]);
            break;
          case 3:
            aText = parseFloat(a[columnData[columnIndex]]);
            bText = parseFloat(b[columnData[columnIndex]]);
            break;
          case 4:
            aText = parseFloat(a[columnData[columnIndex]]);
            bText = parseFloat(b[columnData[columnIndex]]);
            break;
          case 5:
            aText = parseFloat(a[columnData[columnIndex]]);
            bText = parseFloat(b[columnData[columnIndex]]);
            break;
            case 6:
                aText = parseFloat(a[columnData[columnIndex]]);
                bText = parseFloat(b[columnData[columnIndex]]);
            break;
          default:
            return 0;
        }

        if (typeof aText === 'number' && typeof bText === 'number') {
          return sortDirection === 'asc' ? aText - bText : bText - aText;
        } else {
          return sortDirection === 'asc' ? aText.localeCompare(bText) : bText.localeCompare(aText);
        }
      });

      renderTableRows(players);
    }

    if(pageDataHeading === 'differentials') {
      players.sort((a, b) => parseFloat(b[columnData[3]]) - parseFloat(a[columnData[3]]));
    }
    if(pageDataHeading === 'newsAndInjuries') {
      players.sort((a, b) => {
        return String(a[columnData[1]]).localeCompare(String(b[columnData[1]]));
    });
    }
    else {
      players.sort((a, b) => parseFloat(b[columnData[5]]) - parseFloat(a[columnData[5]]));
    }
    renderTableRows(players);

    const showMoreButton = document.createElement('button');
    showMoreButton.textContent = 'Show More';
    showMoreButton.addEventListener('click', () => {
      showAll = !showAll;
      showMoreButton.textContent = showAll ? 'Show Less' : 'Show More';
      renderTableRows(players);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table); // Append the table to the container
    tableContainer.appendChild(showMoreButton);

    return tableContainer;
}

window.createTable = createTable;