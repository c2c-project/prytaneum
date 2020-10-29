import React from 'react';
import faker from 'faker';
import { EventEmitter } from 'events';

import FixtureSocket from 'mock/Fixture.socket';
import Component from './Chat';
import { ChatMessage } from '../types';

export default { title: 'Domains/Townhall/Chat' };

function makeChatMessage(): ChatMessage {
    return {
        _id: faker.random.alphaNumeric(12),
        meta: {
            user: {
                _id: faker.random.alphaNumeric(12),
                name: {
                    first: faker.internet.userName(),
                    last: faker.internet.userName(),
                },
            },
            timestamp: new Date().toISOString(),
            townhallId: faker.random.alphaNumeric(12),
        },
        message: faker.lorem.lines(3),
    };
}

function sendMessages(num: number, emitter: SocketIOClient.Socket) {
    const iterations = num || 1;
    for (let i = 0; i < iterations; i += 1) {
        emitter.emit('townhall-chat-state', {
            type: 'new-message',
            payload: makeChatMessage(),
        });
    }
}

export function Basic() {
    const emitter = (new EventEmitter() as unknown) as SocketIOClient.Socket;

    return (
        <div style={{ overflow: 'auto', height: '100%' }}>
            <button type='button' onClick={() => sendMessages(20, emitter)}>
                Add Messages
            </button>
            <FixtureSocket.Provider value={emitter}>
                <Component />
            </FixtureSocket.Provider>
        </div>
    );
}
