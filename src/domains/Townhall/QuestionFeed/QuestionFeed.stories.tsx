import React from 'react';
import faker from 'faker';
import { EventEmitter } from 'events';
import { Container } from '@material-ui/core';

import FixtureSocket from 'mock/Fixture.socket';
import Component from '.';
import { Question as QuestionType, QuestionState } from '../types';
import { Question, UserBar, ModBar, CurrentQuestion } from './components';

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
        <div>
            <button type='button' onClick={() => sendMessage(20)}>
                Add Message
            </button>
            <FixtureSocket.Provider value={emitter}>
                <Component />
            </FixtureSocket.Provider>
        </div>
    );
}

export function UserQuestion() {
    return (
        <Container maxWidth='sm'>
            <Question
                user={faker.internet.userName()}
                timestamp={new Date().toISOString()}
                actionBar={<UserBar />}
            >
                {faker.lorem.sentences(4)}
            </Question>
        </Container>
    );
}

export function ModQuestion() {
    return (
        <Container maxWidth='sm'>
            <Question
                user={faker.internet.userName()}
                timestamp={new Date().toISOString()}
                actionBar={<ModBar />}
            >
                {faker.lorem.sentences(4)}
            </Question>
        </Container>
    );
}

export function Current() {
    return (
        <Container maxWidth='sm'>
            <CurrentQuestion>
                <Question
                    user={faker.internet.userName()}
                    timestamp={new Date().toISOString()}
                    actionBar={<ModBar />}
                >
                    {faker.lorem.sentences(4)}
                </Question>
            </CurrentQuestion>
        </Container>
    );
}
