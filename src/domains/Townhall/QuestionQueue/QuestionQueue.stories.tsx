import React from 'react';
import faker from 'faker';
import { EventEmitter } from 'events';

import FixtureSocket from 'mock/Fixture.socket';
import Component from '.';

export default { title: 'Domains/Townhall/Question Queue' };

const emitter = (new EventEmitter() as unknown) as SocketIOClient.Socket;
function sendMessage() {
    emitter.emit('townhall-question-state', {
        type: 'new-question',
        payload: {
            _id: faker.random.alphaNumeric(12),
            user: {
                _id: faker.random.alphaNumeric(12),
                name: faker.internet.userName(),
            },
            question: faker.lorem.sentences(),
            timestamp: new Date().toISOString(),
        },
    });
}

export function Basic() {
    return (
        <div>
            <button type='button' onClick={sendMessage}>
                Add Message
            </button>
            <FixtureSocket.Provider value={emitter}>
                <Component />
            </FixtureSocket.Provider>
            <button type='button' onClick={sendMessage}>
                Add Message
            </button>
        </div>
    );
}
