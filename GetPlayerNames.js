// Function to extract the ID from the href attribute
function extractIdFromHref() {
  // Select the anchor element with the class name 'ism-nav__tab'
  const anchorElements = document.querySelectorAll('.ism-nav__tab');
  
  // Assuming you want to extract the ID from the third anchor element
  const anchorElement = anchorElements[2];
  
  // Get the href attribute value
  const href = anchorElement.getAttribute('href');
  
  // Use a regular expression to extract the ID from the href
  const idMatch = href.match(/\/entry\/(\d+)\/event\/\d+/);
  
  // If a match is found, return the ID, otherwise return null
  return idMatch ? idMatch[1] : null;
}

// Function to display the extracted ID in the side panel
function displayIdInSidePanel() {
  const playerId = extractIdFromHref();
  
  // Create a div element to display the ID
  const idDiv = document.createElement('div');
  idDiv.id = 'player-id';
  idDiv.textContent = `Player ID: ${playerId}`;
  
  // Append the div to the side panel
  const sidePanel = document.getElementById('side-panel');
  if (sidePanel) {
    sidePanel.appendChild(idDiv);
  } else {
    console.error('Side panel not found');
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "displayPlayerId") {
    displayIdInSidePanel();
    sendResponse({ success: true });
  }
});