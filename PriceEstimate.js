document.addEventListener('DOMContentLoaded', () => {
    displayPriceEstimate();
  });
  
  async function displayPriceEstimate() {
    console.log('displayPriceEstimate called'); // Debugging log
  
    const priceEstimateContent = document.getElementById('price-estimate-content');
    if (!priceEstimateContent) {
      console.error('Element with ID "price-estimate-content" not found');
      return;
    }
  
    priceEstimateContent.innerHTML = ''; // Clear any existing content
    priceEstimateContent.innerHTML = '<p>Loading data...</p>'; // Show a loading message
  
    try {
      const playersGwData = await callPlayersDetailedData();
      console.log('Data fetched:', playersGwData); // Debugging log
  
      // Extract player IDs and their transfers_balance for round 29
      const playerTransferBalances = playersGwData.map(playerData => {
        const round29Data = playerData.history.find(player => player.round === 29);
        return round29Data ? { id: playerData.id, transfers_balance: round29Data.transfers_balance } : null;
      }).filter(player => player !== null);
  
      console.log('Player transfer balances:', playerTransferBalances); // Debugging log
  
      // Create a div to display the values
      const valueDiv = document.createElement('div');
      valueDiv.style.whiteSpace = 'pre-wrap'; // Ensure the text wraps properly
  
      // Add the values to the div
      playerTransferBalances.forEach(player => {
        valueDiv.textContent += `Player ID: ${player.id}, Round 29 Transfers Balance: ${player.transfers_balance}\n`;
      });
  
      // Replace the content with the new data
      priceEstimateContent.innerHTML = ''; // Clear the loading message
      priceEstimateContent.appendChild(valueDiv);
    } catch (error) {
      priceEstimateContent.innerHTML = '<p>Error loading data. Please try again.</p>';
      console.error('Error in displayPriceEstimate:', error);
    }
  }
  
  // Ensure displayPriceEstimate is available globally
  window.displayPriceEstimate = displayPriceEstimate;