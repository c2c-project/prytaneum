import React from 'react';
import faker from 'faker';
import { EventEmitter } from 'events';

import FixtureSocket from 'mock/Fixture.socket';
import QuestionFeed from '.';
import { Question as QuestionType, QuestionState } from '../types';

export default { title: 'Domains/Townhall/Question Feed' };

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

function makeQuestion(): QuestionType {
    return {
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
        likes: [],
        aiml: {
            labels: Array.from(new Set(faker.random.words(10).split(' '))),
        },
    };
}

function sendMessage(num?: number) {
    const iterations = num || 1;
    for (let i = 0; i < iterations; i += 1) {
        emitter.emit('townhall-question-state', {
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
