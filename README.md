# Expert Fantasy Football

This repository provides a brief introduction to fantasy football, a popular game where participants assemble virtual teams of real-life professional athletes. The performance of these athletes in actual games determines the success of each fantasy team.

## What Is Fantasy Football?

Fantasy football is a competition in which players draft, manage, and compete with teams of NFL athletes. Each participant selects players at various positions (such as quarterback, running back, and wide receiver) with the goal of scoring more points than their opponents throughout the football season. Points are earned based on the real-world statistics those players accumulate in NFL games, such as yards gained or touchdowns scored.

Fantasy football often involves a league of friends or coworkers who schedule a draft before the season starts. Once the season is underway, team owners set lineups each week, manage their rosters through trades or free agency, and track scores in hopes of reaching the playoffs and winning their league's championship.

## Getting Started

While this repository does not include source code, it is meant as a simple starting place. To join or create a fantasy league, you can use popular platforms like ESPN, Yahoo, or NFL.com. The basic steps are:

1. Join or create a league.
2. Draft players to form your roster.
3. Set your lineup each week.
4. Follow player performances and adjust your roster as needed.
5. Compete for the best record and the league title!

Fantasy football brings fans closer to the action by making every game meaningful and engaging. If you're new to the game, take time to understand player rankings, scoring rules, and strategies for building a winning roster.

## Chrome Extension - Expert Fantasy Football V2

This repository also contains a simple Chrome extension named **Expert Fantasy Football V2**. The extension uses the code in `src/useFPLMe.js` to fetch your Fantasy Premier League data and display it in a popup.

### Installation

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** in the top-right corner.
3. Click **Load unpacked** and select the `extension` folder from this repository.
4. The extension icon will appear in your browser toolbar. Click it to view your FPL data.

## Player Data Example

The project includes a reusable table component in `src/Table.js`.
`src/mockApi.js` generates mock player names and random point totals.
`src/PlayerData.js` combines these pieces and is rendered by the Chrome
extension so you can see sample data without accessing a real API.
