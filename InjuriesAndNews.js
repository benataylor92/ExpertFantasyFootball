document.addEventListener('DOMContentLoaded', () => {

async function displayNewsAndInjuries() {
    const newsAndInjuriesContent = document.getElementById('news-and-injuries-content');
    newsAndInjuriesContent.innerHTML = ''; // Clear any existing content

    const combinedData = await combineData();

    const pageDataHeading = "newsAndInjuries";

    const tableHeaders = [
        'Web Name',
        'Team',
        'Price',
        'Chance of Playing this Round',
        'Chance of Playing next Round',
        'News',
        'News Added'
      ];
    
      const columnData = [
        'web_name',
        'teamCode',
        'price',
        'chanceOfPlaying',
        'chanceOfPlayingNextRound',
        'news',
        'newsAdded'
      ];

      const columnDataFormatting = [
        'string',
        'string',
        1,
        'string',
        'string',
        'string',
        'string'
      ]

      const injuredPlayers = combinedData.filter(player => parseFloat(player.chanceOfPlaying) < 100);

      const goalkeepers = injuredPlayers.filter(player => player.positionID === 1);
      const defenders = injuredPlayers.filter(player => player.positionID === 2);
      const midfielders = injuredPlayers.filter(player => player.positionID === 3);
      const forwards = injuredPlayers.filter(player => player.positionID === 4);
    
      newsAndInjuriesContent.appendChild(await createTable('Forwards', forwards, tableHeaders, columnData, pageDataHeading, columnDataFormatting));
      newsAndInjuriesContent.appendChild(await createTable('Midfielders', midfielders, tableHeaders, columnData, pageDataHeading, columnDataFormatting));
      newsAndInjuriesContent.appendChild(await createTable('Defenders', defenders, tableHeaders, columnData, pageDataHeading,columnDataFormatting));
      newsAndInjuriesContent.appendChild(await createTable('Goalkeepers', goalkeepers, tableHeaders, columnData, pageDataHeading, columnDataFormatting));
} 
window.displayNewsAndInjuries = displayNewsAndInjuries;
});