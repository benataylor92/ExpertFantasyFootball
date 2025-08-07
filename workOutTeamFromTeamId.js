function WorkOutTeamFromTeamId(teamId) {
    const teamMap = {
        1: 'ARS',
        2: 'AVL',
        3: 'BOU',
        4: 'BRE',
        5: 'BRI',
        6: 'CHE',
        7: 'CRY',
        8: 'EVE',
        9: 'FUL',
        10: 'IPS',
        11: 'LEC',
        12: 'LIV',
        13: 'MCU',
        14: 'MUN',
        15: 'NEW',
        16: 'NFO',
        17: 'SOU',
        18: 'TOT',
        19: 'WHU',
        20: 'WOL'
    };
    const teamName = teamMap[teamId];
    console.log('Mapped team name:', teamName);
    return teamName || 'Unknown Team';
}

window.WorkOutTeamFromTeamId = WorkOutTeamFromTeamId;