document.addEventListener('DOMContentLoaded', () => {

async function displayDifferentialsContent() {
  const differentialsContent = document.getElementById('differentials-content');
  differentialsContent.innerHTML = ''; // Clear any existing content

  const combinedData = await combineData();

  const pageDataHeading = "differentials";

  if (!combinedData || combinedData.length === 0) {
    console.error('No combined data available');
    return;
  }

  const tableHeaders = [
    'Web Name',
    'eXP 1 GW',
    'eXP 3 GW',
    'eXP 5 GW',
    'Price',
    '% Selected By',
    'Form'
  ];

  const columnData = [
    'web_name',
    'difficultyFactor',
    'difficultyFactor3',
    'difficultyFactor5',
    'price',
    'selectedBy',
    'form'
  ];

  const columnDataFormatting = [
    'string',
    2,
    2,
    2,
    1,
    1,
    1
  ]

  const playersLessThan10PercentOwned = combinedData.filter(player => parseFloat(player.selectedBy) < 10);

  const goalkeepers = playersLessThan10PercentOwned.filter(player => player.positionID === 1);
  const defenders = playersLessThan10PercentOwned.filter(player => player.positionID === 2);
  const midfielders = playersLessThan10PercentOwned.filter(player => player.positionID === 3);
  const forwards = playersLessThan10PercentOwned.filter(player => player.positionID === 4);

  differentialsContent.appendChild(await createTable('Forwards', forwards, tableHeaders, columnData, pageDataHeading, columnDataFormatting));
  differentialsContent.appendChild(await createTable('Midfielders', midfielders, tableHeaders, columnData, pageDataHeading, columnDataFormatting));
  differentialsContent.appendChild(await createTable('Defenders', defenders, tableHeaders, columnData, pageDataHeading,columnDataFormatting));
  differentialsContent.appendChild(await createTable('Goalkeepers', goalkeepers, tableHeaders, columnData, pageDataHeading, columnDataFormatting));
}

window.displayDifferentialsContent = displayDifferentialsContent;
});