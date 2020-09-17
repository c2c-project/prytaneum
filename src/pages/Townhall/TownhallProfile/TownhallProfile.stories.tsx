import React from 'react';
import Page from '.';

export default { title: 'Pages/Townhall' };

// const townhall = {
//     speaker: {
//         name: 'Darth Vader',
//         party: 'Dark Side',
//         territory: 'CA-41',
//     },
//     moderator: 'Luke Skywalker',
//     topic: 'Death Star Design & Imperial Unions',
//     picture: 'https://i.imgur.com/3beQH5s.jpeg',
//     readingMaterials: '',
//     date: new Date(),
//     alignment: 'Dark Side',
// };

export function TownhallProfile() {
    return <Page townhallId='1' />;
}
