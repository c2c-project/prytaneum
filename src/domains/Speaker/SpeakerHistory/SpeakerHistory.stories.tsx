import React from 'react';

import Component, { TownHallHistoryEntry } from './SpeakerHistory';

export default { title: 'Domains/Speaker/Speaker Townhall History' };

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

export function Basic() {
    return <Component history={historyEntries} />;
}
