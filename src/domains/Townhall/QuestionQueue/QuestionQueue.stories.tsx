import React from 'react';
import faker from 'faker';
import { EventEmitter } from 'events';

import FixtureSocket from 'mock/Fixture.socket';
import Component from '.';

export default { title: 'Domains/Townhall' };

const emitter = new EventEmitter();
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

export function QuestionQueue() {
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
