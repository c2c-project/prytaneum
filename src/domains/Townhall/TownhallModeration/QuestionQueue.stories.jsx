import React from 'react';

import FixtureSocket from 'contexts/Fixture.socket';
import Component from '.';

export default { title: 'Domains/Townhall' };

export function QuestionQueue() {
    return (
        <FixtureSocket.Provider>
            <Component />
        </FixtureSocket.Provider>
    );
}
