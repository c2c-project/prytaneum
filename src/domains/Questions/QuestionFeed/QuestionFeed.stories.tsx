import React from 'react';
import { EventEmitter } from 'events';
import { makeQuestion } from 'prytaneum-typings';
import Page from 'layout/Page';

import FixtureSocket from 'mock/Fixture.socket';
import TownhallProvider from '../../Townhall/Contexts/Townhall';
import QuestionFeed from '.';

export default { title: 'Domains/Questions/Question Feed' };

const emitter = (new EventEmitter() as unknown) as SocketIOClient.Socket;

function sendMessage(num?: number) {
    const iterations = num || 1;
    for (let i = 0; i < iterations; i += 1) {
        emitter.emit('question-state', {
            type: 'create-question',
            payload: makeQuestion(),
        });
    }
}

export function Basic() {
    return (
        <div style={{ maxHeight: '100%' }}>
            <button type='button' onClick={() => sendMessage(20)}>
                Add Question
            </button>
            <TownhallProvider townhallId='12345'>
                <FixtureSocket.Provider value={emitter}>
                    <main>
                        <Page>
                            <QuestionFeed />
                        </Page>
                    </main>
                </FixtureSocket.Provider>
            </TownhallProvider>
        </div>
    );
}
