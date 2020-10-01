import React from 'react';
import faker from 'faker';
import { EventEmitter } from 'events';

import FixtureSocket from 'mock/Fixture.socket';
import Component from '.';
import { Question } from '../types';

export default { title: 'Domains/Townhall/Question Queue' };

const emitter = (new EventEmitter() as unknown) as SocketIOClient.Socket;
function sendMessage() {
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
            question: faker.lorem.sentences(),
            asked: Math.random() > 0.5,
        } as Question,
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
