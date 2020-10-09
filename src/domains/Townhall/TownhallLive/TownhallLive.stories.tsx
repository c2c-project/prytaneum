import React from 'react';
import faker from 'faker';
import { EventEmitter } from 'events';

import FixtureSocket from 'mock/Fixture.socket';
import { makeTownhall } from 'mock/handlers/townhall';
import { makeUser } from 'mock/handlers/auth';
import AppBar from 'layout/AppBar';
import Page from 'layout/Page';
import UserProvider from 'contexts/User';
import Component from './TownhallLive';
import { Question as QuestionType, QuestionState } from '../types';
import TownhallProvider from '../Contexts/Townhall';

export default {
    title: 'Domains/Townhall/Townhall Live',
    component: Component,
    // argTypes: {
    //     userType: {
    //         control: {
    //             type: 'select',
    //             options: ['moderator', 'user'],
    //         },
    //     },
    // },
};

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
    if (number < 1) {
        return '';
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

function sendMessage(num: number, emitter: SocketIOClient.Socket) {
    const iterations = num || 1;
    for (let i = 0; i < iterations; i += 1) {
        emitter.emit('townhall-question-state', {
            type: 'new-question',
            payload: makeQuestion(),
        });
    }
}

// interface Props {
//     userType: 'user' | 'moderator';
// }
export function Basic(/* { userType }: Props */) {
    // const id = faker.random.alphaNumeric(5);
    // const townhall = makeTownhall();
    // const user = makeUser();

    // if (userType === 'moderator') {
    //     townhall.settings.moderators.list.push(id);
    //     user._id = id;
    // }
    const emitter = (new EventEmitter() as unknown) as SocketIOClient.Socket;

    return (
        <>
            <AppBar>
                <button type='button' onClick={() => sendMessage(20, emitter)}>
                    Add Message
                </button>
            </AppBar>
            <Page maxWidth='xl'>
                <UserProvider>
                    <TownhallProvider townhallId='123'>
                        <FixtureSocket.Provider value={emitter}>
                            <Component />
                        </FixtureSocket.Provider>
                    </TownhallProvider>
                </UserProvider>
            </Page>
        </>
    );
}

export function AsMod() {
    const id = faker.random.alphaNumeric(5);
    const townhall = makeTownhall();
    const user = makeUser();

    townhall.settings.moderators.list.push(id);
    user._id = id;
    const emitter = (new EventEmitter() as unknown) as SocketIOClient.Socket;

    return (
        <>
            <AppBar>
                <button type='button' onClick={() => sendMessage(20, emitter)}>
                    Add Message
                </button>
            </AppBar>
            <Page maxWidth='xl'>
                <div style={{ height: '100%' }}>
                    <UserProvider value={user}>
                        <TownhallProvider townhallId='123' value={townhall}>
                            <FixtureSocket.Provider value={emitter}>
                                <Component />
                            </FixtureSocket.Provider>
                        </TownhallProvider>
                    </UserProvider>
                </div>
            </Page>
        </>
    );
}

// Basic.args = {
//     userType: 'user',
// };
