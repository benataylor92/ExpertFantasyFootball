/**
 * Returns a promise that resolves to an array of player objects with a
 * random points value between 1 and 50. This simulates a network API call.
 */
export function fetchPlayerData(count = 10) {
  return new Promise((resolve) => {
    const players = Array.from({ length: count }, (_, i) => ({
      name: `Player ${i + 1}`,
      points: Math.floor(Math.random() * 50) + 1,
    }));
    // Simulate asynchronous call
    setTimeout(() => resolve(players), 300);
  });
}
