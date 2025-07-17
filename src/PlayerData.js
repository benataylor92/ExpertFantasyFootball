import React, { useEffect, useState } from 'react';
import Table from './Table.js';
import { fetchPlayerData } from './mockApi.js';

/**
 * Component that fetches player data from the mocked API and displays it
 * using the reusable Table component.
 */
export default function PlayerData() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayerData().then(setPlayers);
  }, []);

  const columns = [
    { key: 'name', title: 'Player Name' },
    { key: 'points', title: 'Points' },
  ];

  if (players.length === 0) {
    return React.createElement('div', null, 'Loading...');
  }

  return React.createElement(Table, { columns, data: players });
}
