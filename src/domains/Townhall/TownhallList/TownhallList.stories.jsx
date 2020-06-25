import React from 'react';

import FixtureContext, { makeSuccessFixture } from 'contexts/Fixtures';
import Page from '.';

export default { title: 'Domains/Townhall' };

const dummyList = [
    {
        _id: '123',
        speaker: 'Darth Vader',
        moderator: 'Luke Skywalker',
        topic: 'Death Star Design & Imperial Unions',
        picture: 'https://i.imgur.com/3beQH5s.jpeg',
        date: new Date(),
        url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
    },
    {
        _id: '321',
        speaker: 'Leia Organa',
        moderator: 'Emperor Palpatine',
        topic: 'The Future of the Republic',
        picture: 'https://i.imgur.com/V4pda.jpg',
        date: new Date(),
        url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
    },
];

export function TownhallList() {
    return (
        <FixtureContext.Provider
            value={makeSuccessFixture({ list: dummyList })}
        >
            <Page />
        </FixtureContext.Provider>
    );
}
