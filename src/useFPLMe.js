import { useEffect, useState } from 'react';

/**
 * Custom React hook to fetch the current user's data from the
 * Fantasy Premier League API. The response is cached in
 * localStorage for 24 hours to avoid unnecessary network requests.
 */
export default function useFPLMe() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const cacheKey = 'fplMeCache';
    const timestampKey = 'fplMeCacheTimestamp';
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(timestampKey);
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in 24 hours

    if (cachedData && cachedTimestamp && now - parseInt(cachedTimestamp, 10) < oneDay) {
      // Use cached data if it's less than 24 hours old
      try {
        setData(JSON.parse(cachedData));
        return;
      } catch (e) {
        // Fall through to fetch if parsing fails
      }
    }

    // Fetch from API if no valid cache exists
    fetch('https://fantasy.premierleague.com/api/me/', { credentials: 'include' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        // Store response and timestamp in localStorage
        localStorage.setItem(cacheKey, JSON.stringify(json));
        localStorage.setItem(timestampKey, String(Date.now()));
        setData(json);
      })
      .catch((error) => {
        console.error('Failed to fetch FPL data:', error);
      });
  }, []);

  return data;
}
