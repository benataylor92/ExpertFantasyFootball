document.addEventListener('DOMContentLoaded', () => { 

  async function displayMyTeam() {
    const myTeamContent = document.getElementById('my-team-content');
    myTeamContent.innerHTML = ''; // Clear any existing content

    try {
      // Fetch the player rank data
      const rankData = await GetPlayerRank();

      if (rankData) {
        // Create a container for the rank squares
        const rankContainer = document.createElement('div');
        rankContainer.classList.add('rank-container'); // Add a class for styling

        // Create the entry last rank square
        const entryLastRankSquare = document.createElement('div');
        entryLastRankSquare.classList.add('rank-square', 'last-rank'); // Add classes for styling
        entryLastRankSquare.textContent = `Last Rank: ${rankData.entry_last_rank.toLocaleString()}`;
        rankContainer.appendChild(entryLastRankSquare);

        // Create the entry rank square
        const entryRankSquare = document.createElement('div');
        entryRankSquare.classList.add('rank-square', 'entry-rank'); // Add classes for styling
        entryRankSquare.textContent = `Entry Rank: ${rankData.entry_rank.toLocaleString()}`;
        rankContainer.appendChild(entryRankSquare);

        // Calculate the difference between last entry rank and new rank
        const rankDifference = rankData.entry_last_rank - rankData.entry_rank;

        // Create the difference square
        const differenceSquare = document.createElement('div');
        differenceSquare.classList.add('rank-square', 'difference-rank'); // Add classes for styling
        differenceSquare.textContent = `${rankDifference > 0 ? '+' : ''}${rankDifference.toLocaleString()}`;

        // Add a class for positive or negative difference
        if (rankDifference > 0) {
          differenceSquare.classList.add('positive-difference');
        } else {
          differenceSquare.classList.add('negative-difference');
        }

        rankContainer.appendChild(differenceSquare);

        // Append the rank container to the myTeamContent
        myTeamContent.appendChild(rankContainer);

        // Add a new feature: Team Summary
        displaySuggestedTransfer(myTeamContent);
      } else {
        console.error('Failed to retrieve rank data.');
      }
    } catch (error) {
      console.error('Error fetching player rank:', error);
    }
  }

  async function displaySuggestedTransfer(container) {
    const suggestedTransfersContainer = document.createElement('div');
    // suggestedTransfersContainer.classList.add('suggested-transfers-container'); // Add a class for styling
  
    try {
      // Fetch the player's team data
      const transfers = await fetchTeamIDAndPlayerNames();
      const transfers1 = transfers.picks;
  
      // Fetch combined data to get expected points
      const combinedData = await combineData();
  
      // Add a title for the suggested transfers section
      const suggestTransferTitle = document.createElement('h2');
      suggestTransferTitle.textContent = 'Suggested Team';
      suggestedTransfersContainer.appendChild(suggestTransferTitle);
  
      // Check if players exist in the response
      if (transfers1) {
        // Create a table to display players
        const table = document.createElement('table');
        table.style.width = '100%';
        table.setAttribute('border', '1');
  
        // Create the table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['Web Name', 'Position', 'eXP 1 GW', 'eXP 3 GW', 'eXP 5 GW'];
        headers.forEach(headerText => {
          const th = document.createElement('th');
          th.textContent = headerText;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
  
        // Create the table body
        const tbody = document.createElement('tbody');
  
        // Separate the last 4 players as subs
        const mainPlayers = transfers1.slice(0, -4); // All players except the last 4
        const subs = transfers1.slice(-4); // Last 4 players

        function mapPosition(positionID) {
          switch (positionID) {
            case 1:
              return 'GK'; // Goalkeeper
            case 2:
              return 'DEF'; // Defender
            case 3:
              return 'MID'; // Midfielder
            case 4:
              return 'FWD'; // Forward
            default:
              return 'N/A'; // Unknown position
          }
        }
  
        // Add rows for main players
        mainPlayers.forEach(player => {
          const playerData = combinedData.find(data => data.Id === player.element);
  
          const row = document.createElement('tr');
  
          // Web Name
          const webNameCell = document.createElement('td');
          webNameCell.textContent = playerData ? playerData.web_name : 'Unknown';
          row.appendChild(webNameCell);
  
          // Position
          const positionCell = document.createElement('td');
          positionCell.textContent = playerData ? mapPosition(playerData.positionID) : 'N/A';
          row.appendChild(positionCell);
  
          // Expected Points for GW 1
          const exp1GWCell = document.createElement('td');
          const exp1GW = playerData && playerData.difficultyFactor
            ? Number(playerData.difficultyFactor).toFixed(2)
            : 'N/A';
          exp1GWCell.textContent = exp1GW;
          row.appendChild(exp1GWCell);
  
          // Expected Points for GW 3
          const exp3GWCell = document.createElement('td');
          const exp3GW = playerData && playerData.difficultyFactor3
            ? Number(playerData.difficultyFactor3).toFixed(2)
            : 'N/A';
          exp3GWCell.textContent = exp3GW;
          row.appendChild(exp3GWCell);
  
          // Expected Points for GW 5
          const exp5GWCell = document.createElement('td');
          const exp5GW = playerData && playerData.difficultyFactor5
            ? Number(playerData.difficultyFactor5).toFixed(2)
            : 'N/A';
          exp5GWCell.textContent = exp5GW;
          row.appendChild(exp5GWCell);
  
          tbody.appendChild(row);
        });

        let totalExp1GW = 0;

        mainPlayers.forEach(player => {
          const playerData = combinedData.find(data => data.Id === player.element);

          if(playerData) {
            totalExp1GW += playerData.difficultyFactor ? Number(playerData.difficultyFactor) : 0;
          };
        });

        // Add a totals row for main players
        const totalsRow = document.createElement('tr');

        // Empty cell for "Web Name"
        const emptyCell = document.createElement('td');
        emptyCell.textContent = 'Total Expected GW Points';
        emptyCell.style.fontWeight = 'bold';
        totalsRow.appendChild(emptyCell);

        // Empty cell for "Position"
        const emptyPositionCell = document.createElement('td');
        totalsRow.appendChild(emptyPositionCell);

        // Total for eXP 1 GW
        const totalExp1GWCell = document.createElement('td');
        totalExp1GWCell.textContent = totalExp1GW.toFixed(2);
        totalExp1GWCell.style.fontWeight = 'bold';
        totalsRow.appendChild(totalExp1GWCell);

        const emptygw3Cell = document.createElement('td');
        totalsRow.appendChild(emptygw3Cell);

        const emptygw5Cell = document.createElement('td');
        totalsRow.appendChild(emptygw5Cell);

        tbody.appendChild(totalsRow);
  
        // Add a separator row for subs
        const subsHeaderRow = document.createElement('tr');
        const subsHeaderCell = document.createElement('td');
        subsHeaderCell.setAttribute('colspan', headers.length);
        subsHeaderCell.textContent = 'Subs';
        subsHeaderCell.style.textAlign = 'center';
        subsHeaderCell.style.fontWeight = 'bold';
        subsHeaderCell.style.backgroundColor = 'rgb(38, 112, 67)';
        subsHeaderCell.style.color = 'white';
        subsHeaderRow.appendChild(subsHeaderCell);
        tbody.appendChild(subsHeaderRow);
  
        // Add rows for subs
        subs.forEach(player => {
          const playerData = combinedData.find(data => data.Id === player.element);
  
          const row = document.createElement('tr');
  
          // Web Name
          const webNameCell = document.createElement('td');
          webNameCell.textContent = playerData ? playerData.web_name : 'Unknown';
          row.appendChild(webNameCell);
  
          // Position
          const positionCell = document.createElement('td');
          positionCell.textContent = playerData ? mapPosition(playerData.positionID) : 'N/A';
          row.appendChild(positionCell);
  
          // Expected Points for GW 1
          const exp1GWCell = document.createElement('td');
          const exp1GW = playerData && playerData.difficultyFactor
            ? Number(playerData.difficultyFactor).toFixed(2)
            : 'N/A';
          exp1GWCell.textContent = exp1GW;
          row.appendChild(exp1GWCell);
  
          // Expected Points for GW 3
          const exp3GWCell = document.createElement('td');
          const exp3GW = playerData && playerData.difficultyFactor3
            ? Number(playerData.difficultyFactor3).toFixed(2)
            : 'N/A';
          exp3GWCell.textContent = exp3GW;
          row.appendChild(exp3GWCell);
  
          // Expected Points for GW 5
          const exp5GWCell = document.createElement('td');
          const exp5GW = playerData && playerData.difficultyFactor5
            ? Number(playerData.difficultyFactor5).toFixed(2)
            : 'N/A';
          exp5GWCell.textContent = exp5GW;
          row.appendChild(exp5GWCell);
  
          tbody.appendChild(row);
        });
  
        table.appendChild(tbody);
  
        // Append the table to the suggested transfers container
        suggestedTransfersContainer.appendChild(table);
      } else {
        const noPlayersMessage = document.createElement('p');
        noPlayersMessage.textContent = 'No players found in your team.';
        suggestedTransfersContainer.appendChild(noPlayersMessage);
      }
  
      // Append the suggested transfers container to the provided container
      container.appendChild(suggestedTransfersContainer);
    } catch (error) {
      console.error('Error fetching team data:', error);
  
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Failed to load suggested transfers.';
      suggestedTransfersContainer.appendChild(errorMessage);
      container.appendChild(suggestedTransfersContainer);
    }
  }

  window.displayMyTeam = displayMyTeam;
});