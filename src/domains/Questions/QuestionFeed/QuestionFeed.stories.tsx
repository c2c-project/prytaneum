import React from 'react';
import { EventEmitter } from 'events';
import { makeQuestion } from 'prytaneum-typings';

import FixtureSocket from 'mock/Fixture.socket';
import QuestionFeed from '.';

export default { title: 'Domains/Townhall/Question Feed' };

const emitter = (new EventEmitter() as unknown) as SocketIOClient.Socket;

function sendMessage(num?: number) {
    const iterations = num || 1;
    for (let i = 0; i < iterations; i += 1) {
        emitter.emit('question-state', {
            type: 'new-question',
            payload: makeQuestion(),
        });
    }
}

export function Basic() {
    return (
        <div style={{ maxHeight: '100%' }}>
            <button type='button' onClick={() => sendMessage(20)}>
                Add Message
            </button>
            <FixtureSocket.Provider value={emitter}>
                {/* <Page> */}
                {/* <div style={{ maxHeight: '100%' }}> */}
                <QuestionFeed />
                {/* </div> */}
                {/* </Page> */}
            </FixtureSocket.Provider>
        </div>
    );
}
