document.addEventListener('DOMContentLoaded', () => {

async function displaySuspensionTightrope() {
    const suspensionTightropeContent = document.getElementById('suspension-tightrope-content');
    suspensionTightropeContent.innerHTML = ''; // Clear any existing content

    const combinedData = await combineData();
    const currentGW = await getCurrentGW();

    suspensionTightropeContent.innerHTML = `
    <p>In the Premier League, 5 yellow cards in the first 19 games result in a one-match ban, 
    10 in the first 32 games lead to a two-match ban, and 15 in 38 games result in a three-match ban.</p>
    <p>Current Game Week: ${currentGW}</p>
`;

    const pageDataHeading = "suspensionTightrope";

    const tableHeaders = [
        'Web Name',
        'Team',
        'Price',
        'Yellow Cards'
      ];
    
      const columnData = [
        'web_name',
        'teamCode',
        'price',
        'yellowCards'
      ];

      const columnDataFormatting = [
        'string',
        'string',
        1,
        'number'
      ]


      const sortedByYellowCards = combinedData
      .filter(player => player.yellowCards !== undefined) // Ensure yellowCards exists
      .map(player => {
          let cardsNeeded = Infinity;
  
          // Calculate cards needed for each threshold
          const cardsTo5 = currentGW <= 19 && player.yellowCards < 5 ? Math.max(0, 5 - player.yellowCards) : Infinity;
          const cardsTo10 = currentGW <= 32 && player.yellowCards < 10 ? Math.max(0, 10 - player.yellowCards) : Infinity;
          const cardsTo15 = currentGW <= 38 && player.yellowCards < 15 ? Math.max(0, 15 - player.yellowCards) : Infinity;
  
          // Take the smallest value of cardsNeeded
          cardsNeeded = Math.min(cardsTo5, cardsTo10, cardsTo15);
  
          // Determine the next suspension threshold
          let nextThreshold = Infinity;
          if (currentGW <= 19) {
              nextThreshold = 5;
          } else if (currentGW <= 32) {
              nextThreshold = 10;
          } else if (currentGW <= 38) {
              nextThreshold = 15;
          }
  
          // Calculate how far the player is from the next threshold
          const distanceToNextThreshold = Math.max(0, nextThreshold - player.yellowCards);
  
          // If the player has already reached a threshold, reset their distance to the next threshold
          if (player.yellowCards >= nextThreshold) {
              const remainingCardsForNextThreshold = nextThreshold === 5
                  ? Math.max(0, 10 - player.yellowCards)
                  : nextThreshold === 10
                  ? Math.max(0, 15 - player.yellowCards)
                  : Infinity;
  
              return { ...player, cardsNeeded: remainingCardsForNextThreshold, distanceToNextThreshold: remainingCardsForNextThreshold };
          }
  
          return { ...player, cardsNeeded, distanceToNextThreshold };
      })
      .sort((a, b) => {
          // Sort by distance to the next threshold first, then by cardsNeeded
          if (a.distanceToNextThreshold !== b.distanceToNextThreshold) {
              return a.distanceToNextThreshold - b.distanceToNextThreshold;
          }
          return a.cardsNeeded - b.cardsNeeded;
      });
  
  console.log('Players sorted by yellow cards:', sortedByYellowCards);
  
  suspensionTightropeContent.appendChild(await createTable('Yellow Cards', sortedByYellowCards, tableHeaders, columnData, pageDataHeading, columnDataFormatting));
} 

window.displaySuspensionTightrope = displaySuspensionTightrope;
});