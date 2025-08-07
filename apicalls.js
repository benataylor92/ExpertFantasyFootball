async function fetchTeamIDAndPlayerNames() {
    try {
      const teamIDResponse = await fetch('https://fantasy.premierleague.com/api/me/', {
        credentials: 'include'
      });
      if (!teamIDResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const teamIDData = await teamIDResponse.json();
      const teamID = teamIDData.player.entry;

      const playerNamesResponse = await fetch(`https://fantasy.premierleague.com/api/my-team/${teamID}/`, {
        credentials: 'include'
      });
      if (!playerNamesResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const playerNamesData = await playerNamesResponse.json();
      return playerNamesData;
    } catch (error) {
      console.error('Failed to fetch team ID or player names:', error);
      return [];
    }
}

async function GetPlayerRank() {
  try {
    const teamIDResponse = await fetch('https://fantasy.premierleague.com/api/me/', {
      credentials: 'include'
    });
    if (!teamIDResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const teamIDData = await teamIDResponse.json();
    const teamID = teamIDData.player.entry;

    const playerRankResponse = await fetch(`https://fantasy.premierleague.com/api/entry/${teamID}/`, {
      credentials: 'include'
    });
    if (!playerRankResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const playerRankData = await playerRankResponse.json();
    const playerOverallRank = playerRankData.leagues.classic.find(league => league.id === 314);

    if(playerOverallRank) {
      return {
        entry_rank: playerOverallRank.entry_rank,
        entry_last_rank: playerOverallRank.entry_last_rank
      };
     } else {
      console.warn('Overall league with id 314 not found.');
    return {
      entry_rank: 'N/A',
      entry_last_rank: 'N/A'
        }}
    }

   catch (error) {
    console.error('Failed to fetch team ID or player names:', error);
    return [];
  }
}

async function getCurrentGW() {
    try {
      const response = await fetch('https://fantasy.premierleague.com/api/me/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const currentGW = data.player.default_event;
      return currentGW;
    } catch (error) {
      console.error('Failed to fetch player data:', error);
      return [];
    }
}

async function fetchPlayerData() {
    try {
      const response = await fetch('https://fantasy.premierleague.com/api/elements/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('script finished');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch player data:', error);
      return [];
    }
}

async function callFixtures() {
    try {
      const response = await fetch('https://fantasy.premierleague.com/api/fixtures/?future=1');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('script finished');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch player data:', error);
      return [];
    }
}

async function callPlayersDetailedData() {
  try {
      const playerData = await fetchPlayerData();
      const playerIds = playerData.map(player => player.id);

      const detailedDataPromises = playerIds.map(async id => {
          const response = await fetch(`https://fantasy.premierleague.com/api/element-summary/${id}/`);
          if (!response.ok) {
              throw new Error(`Failed to fetch data for player ID ${id}`);
          }
          return response.json();
      });

      const detailedData = await Promise.all(detailedDataPromises);
      console.log('Detailed data fetched for all players');
      return detailedData;
  } catch (error) {
      console.error('Failed to fetch detailed player data:', error);
      return [];
  }
}

window.GetPlayerRank = GetPlayerRank;
window.callPlayersDetailedData = callPlayersDetailedData;
window.callFixtures = callFixtures;
window.fetchPlayerData = fetchPlayerData;
window.getCurrentGW = getCurrentGW;
window.fetchTeamIDAndPlayerNames = fetchTeamIDAndPlayerNames;