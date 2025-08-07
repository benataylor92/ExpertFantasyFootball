document.addEventListener('DOMContentLoaded', () => {
  
  function difficultyFactorFunction(difficulty, homeOrAway, pointsPerGame, form, chanceOfPlaying) {
    const baselinePoints = (parseFloat(pointsPerGame) + parseFloat(form)) / 2;
    if(chanceOfPlaying === 0) {
      return 0;
    }
    if(difficulty === 1 && homeOrAway === 'Home') {
      return (baselinePoints * 1.15).toFixed(2);
    }
    if(difficulty === 2 && homeOrAway === 'Home') {
      return (baselinePoints * 1.10).toFixed(2);
    }
    if(difficulty === 3 && homeOrAway === 'Home') {
      return (baselinePoints * 1.05).toFixed(2);
    }
    if(difficulty === 4 && homeOrAway === 'Home') {
      return baselinePoints.toFixed(2);
    }
    if(difficulty === 5 && homeOrAway === 'Home') {
      return (baselinePoints * 0.95).toFixed(2);
    }
    if(difficulty === 1 && homeOrAway === 'Away') {
      return (baselinePoints * 1.10).toFixed(2);
    }
    if(difficulty === 2 && homeOrAway === 'Away') {
      return (baselinePoints * 1.05).toFixed(2);
    }
    if(difficulty === 3 && homeOrAway === 'Away') {
      return baselinePoints.toFixed(2);
    }
    if(difficulty === 4 && homeOrAway === 'Away') {
      return (baselinePoints * 0.95).toFixed(2);
    }
    if(difficulty === 5 && homeOrAway === 'Away') {
      return (baselinePoints * 0.90).toFixed(2);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Format the date as "August 14, 2024, 10:30 PM"
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

  async function combineData() {
    const fixturesData = await callFixtures();
    const playerData = await fetchPlayerData();
    const currentGW = await getCurrentGW();

    const result = [];

    const eventsToConsider3 = [currentGW, currentGW + 1, currentGW + 2];
    const eventsToConsider5 = [currentGW, currentGW + 1, currentGW + 2, currentGW + 3, currentGW + 4];

    fixturesData.forEach(fixture => {
      if (eventsToConsider5.includes(fixture.event)) {
        const teams = [
          { team: fixture.team_h, difficulty: fixture.team_h_difficulty, homeOrAway: 'Home' },
          { team: fixture.team_a, difficulty: fixture.team_a_difficulty, homeOrAway: 'Away' }
        ];

        teams.forEach(({ team, difficulty, homeOrAway }) => {
          const players = playerData.filter(player => player.team === team);
          players.forEach(player => {
            const existingPlayer = result.find(p => p.Id === player.id);
            const difficultyFactor = parseFloat(difficultyFactorFunction(difficulty, homeOrAway, parseFloat(player.points_per_game), parseFloat(player.form), player.chance_of_playing_next_round));

            if (existingPlayer) {
              if (eventsToConsider3.includes(fixture.event)) {
                existingPlayer.difficultyFactor3 += difficultyFactor;
              }
              existingPlayer.difficultyFactor5 += difficultyFactor;
            } else {
              result.push({
                web_name: player.web_name,
                team: player.team,
                teamCode: WorkOutTeamFromTeamId(player.team),
                price: parseFloat(player.now_cost) / 10,
                expected_points_next_gw: player.ep_next,
                positionID: player.element_type,
                yellowCards: player.yellow_cards,
                news: player.news,
                newsAdded: formatDate(player.news_added),
                pointsPerGame: player.points_per_game,
                expectedGoals: player.expected_goals,
                actualGoals: player.goals_scored,
                expectedAssists: player.expected_assists,
                actualAssists: player.assists,
                expectedGoalsAndExpectedAssists: parseFloat(parseFloat(player.expected_goals) + parseFloat(player.expected_assists)).toFixed(2),
                actualGoalsAndActualAssists: player.goals_scored + player.assists,
                actualGoalsMinusExpectedGoals: parseFloat(parseFloat(player.goals_scored) - parseFloat(player.expected_goals)).toFixed(2),
                actualAssistsMinusExpectedAssists: parseFloat(parseFloat(player.assists) - parseFloat(player.expected_assists)).toFixed(2),
                actualGoalsAndAssistsMinusExpectedGoalsAndAssists: parseFloat(parseFloat(player.goals_scored) + parseFloat(player.assists) - parseFloat(player.expected_goals) - parseFloat(player.expected_assists)).toFixed(2),
                form: player.form,
                chanceOfPlaying: player.chance_of_playing_this_round,
                chanceOfPlayingNextRound: player.chance_of_playing_next_round,
                selectedBy: player.selected_by_percent,
                positionName: player.element_type === 1 ? 'Goalkeeper' : player.element_type === 2 ? 'Defender' : player.element_type === 3 ? 'Midfielder' : player.element_type === 4 ? 'Forward': 'Manager',
                event: fixture.event,
                difficulty,
                homeOrAway,
                Id: player.id,
                difficultyFactor: player.ep_next,
                difficultyFactor3: eventsToConsider3.includes(fixture.event) ? difficultyFactor : 0,
                difficultyFactor5: difficultyFactor
              });
            }
          });
        });
      }
    });

    return result;
  }

  async function displayCombinedData() {
    const combinedData = await combineData();
    const newPageContent = document.getElementById('expected-points-content'); 
    newPageContent.innerHTML = '';

    if (!combinedData || combinedData.length === 0) {
      console.error('No combined data available');
      return;
    }

    const goalkeepers = combinedData.filter(player => player.positionID === 1);
    const defenders = combinedData.filter(player => player.positionID === 2);
    const midfielders = combinedData.filter(player => player.positionID === 3);
    const forwards = combinedData.filter(player => player.positionID === 4);
    const manager = combinedData.filter(player => player.positionID === 5);

    newPageContent.appendChild(await createTable('Goalkeepers', goalkeepers));
    newPageContent.appendChild(await createTable('Defenders', defenders));
    newPageContent.appendChild(await createTable('Midfielders', midfielders));
    newPageContent.appendChild(await createTable('Forwards', forwards));
    newPageContent.appendChild(await createTable('Manager', manager));
  }

  async function createTable(title, players) {
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

    const headers = [
      'Web Name', 
      'Points Per Game', 
      'Form',
      'eXP 1 GW',
      'eXP 3 GW',
      'eXP 5 GW', 
      '% Selected By'
    ];
    headers.forEach((headerText, index) => {
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
        webNameCell.textContent = item.web_name;
        row.appendChild(webNameCell);

        const PointsPerGameCell = document.createElement('td');
        PointsPerGameCell.textContent = item.pointsPerGame;
        row.appendChild(PointsPerGameCell);

        const FormCell = document.createElement('td');
        FormCell.textContent = item.form;
        row.appendChild(FormCell);

        const difficultyFactorCell = document.createElement('td');
        difficultyFactorCell.textContent = item.difficultyFactor;
        row.appendChild(difficultyFactorCell);

        const difficultyFactor3Cell = document.createElement('td');
        difficultyFactor3Cell.textContent = item.difficultyFactor3.toFixed(2); // Display as fixed-point number
        row.appendChild(difficultyFactor3Cell);

        const difficultyFactor5Cell = document.createElement('td');
        difficultyFactor5Cell.textContent = item.difficultyFactor5.toFixed(2); // Display as fixed-point number
        row.appendChild(difficultyFactor5Cell);
        
        const selectedByCell = document.createElement('td');
        selectedByCell.textContent = item.selectedBy; 
        row.appendChild(selectedByCell);

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
            aText = parseFloat(a.pointsPerGame);
            bText = parseFloat(b.pointsPerGame);
            break;
          case 2:
            aText = parseFloat(a.form);
            bText = parseFloat(b.form);
            break;
          case 3:
            aText = parseFloat(a.difficultyFactor);
            bText = parseFloat(b.difficultyFactor);
            break;
          case 4:
            aText = parseFloat(a.difficultyFactor3);
            bText = parseFloat(b.difficultyFactor3);
            break;
          case 5:
            aText = parseFloat(a.difficultyFactor5);
            bText = parseFloat(b.difficultyFactor5);
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

    players.sort((a, b) => parseFloat(b.difficultyFactor5) - parseFloat(a.difficultyFactor5));

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
  
  window.displayCombinedData = displayCombinedData;
  window.combineData = combineData;
});