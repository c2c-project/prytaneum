import React from 'react';

import Component, { TownHallHistoryEntry } from './TownHallHistory';

export default { title: 'Domains/Townhall' };

const historyEntries: TownHallHistoryEntry[] = [
    {
        action: 'Event 1',
        link: 'https://i.imgur.com/3beQH5s.jpeg',
        date: 'Jan 9, 2014',
    },
    {
        action: 'Event 2',
        link: 'https://i.imgur.com/3beQH5s.jpeg',
        date: 'Jan 10, 2015',
    },
    {
        action: 'Event 3',
        link: 'https://i.imgur.com/3beQH5s.jpeg',
        date: 'Jan 11, 2016',
    },
    {
        action: 'Event 4',
        link: 'https://i.imgur.com/3beQH5s.jpeg',
        date: 'Jan 12, 2017',
    },
];

export function TownhallHistory() {
    return <Component history={historyEntries} />;
}
