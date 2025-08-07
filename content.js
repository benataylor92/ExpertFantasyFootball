async function workOutFixtureWeighting() {
  const fixturesData = await callFixtures();
  const playerData = await extractPlayerData();
  if (!fixturesData || !playerData) {
    console.error('No fixtures or player data available');
    return;
  }

  const combinedData = fixturesData
    .filter(fixture => fixture.team_h !== null || fixture.team_a !== null)
    .map(fixture => {
      const homePlayers = playerData.filter(player => player.team === fixture.team_h);
      const awayPlayers = playerData.filter(player => player.team === fixture.team_a);

      function multipleDataHome(difficulty) {
        if(difficulty === 5) {
          return 1.5;
        } else if(difficulty === 4) {
          return 1.75;
        } else if(difficulty === 3) {
          return 2;
        } else if(difficulty === 2) {
          return 2.25;
        } else if(difficulty === 1) {
          return 2.5;
        }
      }

      function multipleDataAway(difficulty) {
        if(difficulty === 5) {
          return 0.1;
        } else if(difficulty === 4) {
          return 0.2;
        } else if(difficulty === 3) {
          return 0.3;
        } else if(difficulty === 2) {
          return 0.4;
        } else if(difficulty === 1) {
          return 0.5;
        }
      }

      const homeData = homePlayers.map(homePlayer => ({
        playerId: homePlayer.Id,
        difficulty: fixture.team_h_difficulty,
        team: fixture.team_h,
        name: homePlayer.web_name,
        multiple: multipleDataHome(fixture.team_h_difficulty)
      }));

      const awayData = awayPlayers.map(awayPlayer => ({
        playerId: awayPlayer.Id,
        difficulty: fixture.team_a_difficulty,
        team: fixture.team_a,
        name: awayPlayer.web_name,
        multiple: multipleDataAway(fixture.team_a_difficulty)
      }));

      return [...homeData, ...awayData];
    })
    .flat();


  combinedData.forEach(item => {
    const itemInfo = [
      item.playerId,
      item.difficulty,
      item.team,
      item.name,
      item.multiple,
    ];

    console.log(itemInfo);
    return itemInfo;
  });

  console.log(combinedData);
}