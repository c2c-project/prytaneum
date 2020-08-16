import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import FixtureContext, { makeSuccessFixture } from 'mock/Fixtures';
import Component from './TownhallLive';
import TownhallProvider from '../Contexts/Townhall';

export default { title: 'Domains/Townhall' };

const dummyTownhall = {
    _id: '321',
    speaker: 'Leia Organa',
    moderator: 'Emperor Palpatine',
    topic: 'The Future of the Republic',
    picture: 'https://i.imgur.com/V4pda.jpg',
    date: new Date(),
    url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
};

export function TownhallLive() {
    return (
        <MemoryRouter initialEntries={['/123']}>
            <Route path='/:townhallId'>
                <FixtureContext.Provider
                    value={makeSuccessFixture({ townhall: dummyTownhall })}
                >
                    <TownhallProvider>
                        <Component />
                    </TownhallProvider>
                </FixtureContext.Provider>
            </Route>
        </MemoryRouter>
    );
}
