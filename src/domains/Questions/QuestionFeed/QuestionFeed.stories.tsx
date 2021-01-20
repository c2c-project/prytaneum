import React from 'react';
import { Meta } from '@storybook/react';
import { EventEmitter } from 'events';
import { makeQuestion } from 'prytaneum-typings';
import { Grid } from '@material-ui/core';

import UserProvider from 'contexts/User';
import FixtureSocket from 'mock/Fixture.socket';
import TownhallProvider from 'contexts/Townhall';
import QuestionFeed from '.';
import QuestionCard from '../QuestionCard';
import { CurrentQuestion as CurrentQuestionWrapper } from './components';

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

export default {
    title: 'Domains/Questions/Question Feed',
    decorators: [
        (MyStory) => (
            <div style={{ flex: 1, padding: 60 }}>
                <UserProvider>
                    <TownhallProvider townhallId='123'>
                        <FixtureSocket.Provider value={emitter}>
                            <MyStory />
                        </FixtureSocket.Provider>
                    </TownhallProvider>
                </UserProvider>
            </div>
        ),
    ],
} as Meta;

export function Basic() {
    return (
        <Grid container direction='column' wrap='nowrap'>
            <div style={{ flex: 1 }}>
                <button type='button' onClick={() => sendMessage(20)}>
                    Add Questions
                </button>
            </div>
            <div style={{ flex: '1 1 100%' }}>
                <QuestionFeed />
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
