import React from 'react';
import { EventEmitter } from 'events';
import { makeQuestion } from 'prytaneum-typings';
import { Grid } from '@material-ui/core';

import FixtureSocket from 'mock/Fixture.socket';
import TownhallProvider from '../../Townhall/Contexts/Townhall';
import QuestionFeed from '.';
import QuestionCard from '../QuestionCard';
import { CurrentQuestion as CurrentQuestionWrapper } from './components';

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
        <Grid
            container
            direction='column'
            style={{ height: '100%', overflowY: 'scroll' }}
            wrap='nowrap'
        >
            <div style={{ flex: 1 }}>
                <button type='button' onClick={() => sendMessage(20)}>
                    Add Questions
                </button>
            </div>
            <div style={{ flex: '1 1 100%' }}>
                <TownhallProvider townhallId='12345'>
                    <FixtureSocket.Provider value={emitter}>
                        <QuestionFeed />
                    </FixtureSocket.Provider>
                </TownhallProvider>
            </div>
        </Grid>
    );
}

export function CurrentQuestion() {
    return (
        <CurrentQuestionWrapper>
            <QuestionCard question={makeQuestion()} />
        </CurrentQuestionWrapper>
    );
}
