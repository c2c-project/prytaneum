import React from 'react';
import { EventEmitter } from 'events';
import { makeQuestion, makeGenFn } from 'prytaneum-typings';

import SocketFixture from 'mock/Fixture.socket';
import Main from 'layout/Main';
import QuestionQueue from './QuestionQueue';
import QueueComponent from './Queue';

export default { title: 'Domains/Questions/Question Queue' };

const emitter = (new EventEmitter() as unknown) as SocketIOClient.Socket;

function sendMessage(num?: number) {
    const iterations = num || 1;
    for (let i = 0; i < iterations; i += 1) {
        emitter.emit('playlist-state', {
            type: 'playlist-add',
            payload: makeQuestion(),
        });
    }
}

export function Basic() {
    return (
        <SocketFixture.Provider value={emitter}>
            <Main>
                <div style={{ paddingBottom: '8px' }}>
                    <button onClick={() => sendMessage(5)} type='button'>
                        Add questions to suggested
                    </button>
                    <button type='button'>Add questions to queue</button>
                </div>
                <QuestionQueue />
            </Main>
        </SocketFixture.Provider>
    );
}

const questions = makeGenFn(makeQuestion)(15);
questions[1]._id = '1';

export function Queue() {
    return (
        <Main>
            <QueueComponent
                bufferLength={0}
                // eslint-disable-next-line no-console
                onFlushBuffer={console.log}
                questions={questions}
            />
        </Main>
    );
}
