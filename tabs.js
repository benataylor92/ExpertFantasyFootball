// tabs.js
function openPage(evt, pageName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(pageName).style.display = "block";
  evt.currentTarget.className += " active";

  
  if (pageName === 'ExpectedPoints') {
    displayCombinedData();
  }
  if (pageName === 'BestCaptains') {
    displayBestCaptains();
  }
  if (pageName === 'OverAndUnderAchievers') {
    displayOverAndUnderAchieversContent();
  }
  if(pageName === 'PriceEstimate') {
    displayPriceEstimate();
  }
  if(pageName === 'Differentials') {
    displayDifferentialsContent();
  }
  if(pageName === 'Suspension') {
    displaySuspensionTightrope();
  }
  if(pageName === 'NewsAndInjuries') {
    displayNewsAndInjuries();
  }
  if(pageName === 'TopPlayersInTheWorld') {
    displayTopPlayersInTheWorld();
  }
  if(pageName === 'MyTeam') {
    displayMyTeam();
  }
}

// Dynamically create the tab buttons and content areas
document.addEventListener('DOMContentLoaded', (event) => {
  const tabContainer = document.createElement('div');
  tabContainer.className = 'tab';

  const expectedPointsButton = document.createElement('button');
  expectedPointsButton.className = 'tablinks';
  expectedPointsButton.textContent = 'Expected Points';
  expectedPointsButton.onclick = (event) => openPage(event, 'ExpectedPoints');
  tabContainer.appendChild(expectedPointsButton);

  const BestCaptainsButton = document.createElement('button');
  BestCaptainsButton.className = 'tablinks';
  BestCaptainsButton.textContent = 'Best Captains';
  BestCaptainsButton.onclick = (event) => openPage(event, 'BestCaptains');
  tabContainer.appendChild(BestCaptainsButton);

  const OverAndUnderAchieversbutton = document.createElement('button');
  OverAndUnderAchieversbutton.className = 'Over And Under Achievers';
  OverAndUnderAchieversbutton.textContent = 'Over And Under Achievers';
  OverAndUnderAchieversbutton.onclick = (event) => openPage(event, 'OverAndUnderAchievers');
  tabContainer.appendChild(OverAndUnderAchieversbutton);

  const PriceEstimatebutton = document.createElement('button');
  PriceEstimatebutton.className = 'Price Estimate';
  PriceEstimatebutton.textContent = 'Price Estimate';
  PriceEstimatebutton.onclick = (event) => openPage(event, 'PriceEstimate');
  tabContainer.appendChild(PriceEstimatebutton);

  const differentialsButton = document.createElement('button');
  differentialsButton.className = 'tablinks';
  differentialsButton.textContent = 'Differentials';
  differentialsButton.onclick = (event) => openPage(event, 'Differentials');
  tabContainer.appendChild(differentialsButton);

  const suspensionButton = document.createElement('button');
  suspensionButton.className = 'tablinks';
  suspensionButton.textContent = 'Suspension';
  suspensionButton.onclick = (event) => openPage(event, 'Suspension');
  tabContainer.appendChild(suspensionButton);

  const newsAndInjuriesButton = document.createElement('button');
  newsAndInjuriesButton.className = 'tablinks';
  newsAndInjuriesButton.textContent = 'News And Injuries';
  newsAndInjuriesButton.onclick = (event) => openPage(event, 'NewsAndInjuries');
  tabContainer.appendChild(newsAndInjuriesButton);

  const topPlayersInTheWorldButton = document.createElement('button');
  topPlayersInTheWorldButton.className = 'tablinks';
  topPlayersInTheWorldButton.textContent = 'Top Players In The World';
  topPlayersInTheWorldButton.onclick = (event) => openPage(event, 'TopPlayersInTheWorld');
  tabContainer.appendChild(topPlayersInTheWorldButton);

  const myTeamButton = document.createElement('button');
  myTeamButton.className = 'tablinks';
  myTeamButton.textContent = 'My Team';
  myTeamButton.onclick = (event) => openPage(event, 'MyTeam');
  tabContainer.appendChild(myTeamButton);

  //New section
  document.body.insertBefore(tabContainer, document.body.firstChild);

  const expectedPointsContent = document.createElement('div');
  expectedPointsContent.id = 'ExpectedPoints';
  expectedPointsContent.className = 'tabcontent';
  expectedPointsContent.innerHTML = '<h2>Expected Points</h2><div id="expected-points-content"></div>';
  document.body.appendChild(expectedPointsContent);

  const testContent = document.createElement('div');
  testContent.id = 'rankContainer';
  testContent.className = 'tabcontent';
  testContent.innerHTML = '<div id="player-rank-content"></div>';
  document.body.appendChild(testContent);

  const BestCaptainsContent = document.createElement('div');
  BestCaptainsContent.id = 'BestCaptains';
  BestCaptainsContent.className = 'tabcontent';
  BestCaptainsContent.innerHTML = '<h2>Best Captains</h2><div id="best-captains-content"></div>';
  document.body.appendChild(BestCaptainsContent);

  const OverAndUnderAchieversContent = document.createElement('div');
  OverAndUnderAchieversContent.id = 'OverAndUnderAchievers';
  OverAndUnderAchieversContent.className = 'tabcontent';
  OverAndUnderAchieversContent.innerHTML = '<h2>Over And Under Achievers</h2><div id="over-and-under-achievers-content"></div>';
  document.body.appendChild(OverAndUnderAchieversContent);

  const PriceEstimateContent = document.createElement('div');
  PriceEstimateContent.id = 'PriceEstimate';
  PriceEstimateContent.className = 'tabcontent';
  PriceEstimateContent.innerHTML = '<h2>Price Estimate</h2><div id="price-estimate-content"></div>';
  document.body.appendChild(PriceEstimateContent);

  const differentialsContent = document.createElement('div');
  differentialsContent.id = 'Differentials';
  differentialsContent.className = 'tabcontent';
  differentialsContent.innerHTML = '<h2>Differentials</h2><div id="differentials-content"></div>';
  document.body.appendChild(differentialsContent);

  const suspensionContent = document.createElement('div');
  suspensionContent.id = 'Suspension';
  suspensionContent.className = 'tabcontent';
  suspensionContent.innerHTML = '<h2>Suspension</h2><div id="suspension-tightrope-content"></div>';
  document.body.appendChild(suspensionContent);

  const newsAndInjuriesContent = document.createElement('div');
  newsAndInjuriesContent.id = 'NewsAndInjuries';
  newsAndInjuriesContent.className = 'tabcontent';
  newsAndInjuriesContent.innerHTML = '<h2>News And Injuries</h2><div id="news-and-injuries-content"></div>';
  document.body.appendChild(newsAndInjuriesContent);
  
  const topPlayersInTheWorldContent = document.createElement('div');
  topPlayersInTheWorldContent.id = 'TopPlayersInTheWorld';
  topPlayersInTheWorldContent.className = 'tabcontent';
  topPlayersInTheWorldContent.innerHTML = '<h2>Top players In The World</h2><div id="top-players-in-the-world-content"></div>';
  document.body.appendChild(topPlayersInTheWorldContent);

  const myTeamContent = document.createElement('div');
  myTeamContent.id = 'MyTeam';
  myTeamContent.className = 'tabcontent';
  myTeamContent.innerHTML = '<h2>My Team</h2><div id="my-team-content"></div>';
  document.body.appendChild(myTeamContent);

  // Set the default tab to be open
  BestCaptainsButton.click();
});

// Ensure openPage is available globally
window.openPage = openPage;