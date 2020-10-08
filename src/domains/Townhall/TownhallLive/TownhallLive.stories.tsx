import React from 'react';
import faker from 'faker';
import { EventEmitter } from 'events';

import FixtureSocket from 'mock/Fixture.socket';
import AppBar from 'layout/AppBar';
import Page from 'layout/Page';
import Component from './TownhallLive';
import { Question as QuestionType, QuestionState } from '../types';
import TownhallProvider from '../Contexts/Townhall';

export default { title: 'Domains/Townhall/Townhall Live' };

const emitter = (new EventEmitter() as unknown) as SocketIOClient.Socket;

function makeState(): QuestionState {
    const number = Math.random();
    if (number < 0.25) {
        return 'ASKED';
    }
    if (number < 0.5) {
        return 'CURRENT';
    }
    if (number < 0.75) {
        return 'IN_QUEUE';
    }
    return '';
}
function sendMessage(num?: number) {
    const iterations = num || 1;
    for (let i = 0; i < iterations; i += 1) {
        emitter.emit('townhall-question-state', {
            type: 'new-question',
            payload: {
                _id: faker.random.alphaNumeric(12),
                meta: {
                    user: {
                        _id: faker.random.alphaNumeric(12),
                        name: faker.internet.userName(),
                    },
                    timestamp: new Date().toISOString(),
                    townhallId: faker.random.alphaNumeric(12),
                },
                question: faker.lorem.sentences(5),
                state: makeState(),
            } as QuestionType,
        });
    }
}

export function Basic() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <AppBar>
                <button type='button' onClick={() => sendMessage(20)}>
                    Add Message
                </button>
            </AppBar>
            <Page maxWidth='xl'>
                <div style={{ height: '100%' }}>
                    {/* <div style={{ position: 'sticky', top: 0 }}>asdf</div> */}
                    <TownhallProvider townhallId='1234'>
                        <FixtureSocket.Provider value={emitter}>
                            <Component />
                        </FixtureSocket.Provider>
                    </TownhallProvider>
                </div>
            </Page>
        </div>
    );
}
