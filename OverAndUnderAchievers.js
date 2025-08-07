document.addEventListener('DOMContentLoaded', () => {

async function displayOverAndUnderAchieversContent() {
  const overAndUnderAchieversContent = document.getElementById('over-and-under-achievers-content');
  overAndUnderAchieversContent.innerHTML = ''; // Clear any existing content

  const combinedData = await combineData();
  const pageDataHeading = "overAndUnderAchievers";

  if (!combinedData || combinedData.length === 0) {
    console.error('No combined data available');
    return;
  }

  const tableHeaders = [
    'Web Name',
    'Expected Goals',
    'Actual Goals',
    'Expected Assists',
    'Actual Assists',
    'Combined Expected Goal Contribution',
    'Actual Goal Contribution',
  ];

  const columnData = [
    'web_name',
    'expectedGoals',
    'actualGoals',
    'expectedAssists',
    'actualAssists',
    'expectedGoalsAndExpectedAssists',
    'actualGoalsAndActualAssists',
    'actualGoalsMinusExpectedGoals', 
    'actualAssistsMinusExpectedAssists',
    'actualGoalsAndAssistsMinusExpectedGoalsAndAssists'
  ]

  const columnDataFormatting = [
    'string',
    2,
    'string',
    2,
    'string',
    2,
    0,
    2,
    2,
    2
  ]

  const goalkeepers = combinedData.filter(player => player.positionID === 1);
  const defenders = combinedData.filter(player => player.positionID === 2);
  const midfielders = combinedData.filter(player => player.positionID === 3);
  const forwards = combinedData.filter(player => player.positionID === 4);

  overAndUnderAchieversContent.appendChild(await createTable('Forwards', forwards, tableHeaders, columnData, pageDataHeading, columnDataFormatting));
  overAndUnderAchieversContent.appendChild(await createTable('Midfielders', midfielders, tableHeaders, columnData, pageDataHeading, columnDataFormatting));
  overAndUnderAchieversContent.appendChild(await createTable('Defenders', defenders, tableHeaders, columnData, pageDataHeading, columnDataFormatting));
  overAndUnderAchieversContent.appendChild(await createTable('Goalkeepers', goalkeepers, tableHeaders, columnData, pageDataHeading, columnDataFormatting));
}

window.displayOverAndUnderAchieversContent = displayOverAndUnderAchieversContent;

});
