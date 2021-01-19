import React from 'react';
import { Story, Meta } from '@storybook/react';
import faker from 'faker/locale/en';
import { EventEmitter } from 'events';
import { makeQuestion, makeChatMessage, makeUser, makeTownhall } from 'prytaneum-typings';

import FixtureSocket from 'mock/Fixture.socket';
import Page from 'layout/Page';
import AppBar from 'layout/AppBar';
import Main from 'layout/Main';
import UserProvider from 'contexts/User';
import TownhallProvider from 'contexts/Townhall';
import Component from './TownhallLive';

function sendQuestions(num: number, emitter: SocketIOClient.Socket) {
    const iterations = num || 1;
    for (let i = 0; i < iterations; i += 1) {
        emitter.emit('question-state', {
            type: 'create-question',
            payload: makeQuestion(),
        });
    }
}

function sendMessages(num: number, emitter: SocketIOClient.Socket) {
    const iterations = num || 1;
    for (let i = 0; i < iterations; i += 1) {
        emitter.emit('chat-message-state', {
            type: 'create-chat-message',
            payload: makeChatMessage(),
        });
    }
}

const townhall = makeTownhall();
townhall.settings.chat.enabled = true;
townhall.settings.questionQueue.transparent = true;
const emitter = (new EventEmitter() as unknown) as SocketIOClient.Socket;

export default {
    title: 'Pages/Townhall Live',
    component: Component,
    argTypes: {},
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (MyStory) => (
            <Page>
                <AppBar>
                    <button type='button' onClick={() => sendQuestions(20, emitter)}>
                        Add Questions
                    </button>
                    <button type='button' onClick={() => sendMessages(20, emitter)}>
                        Add Messages
                    </button>
                </AppBar>
                <Main maxWidth='xl'>
                    <UserProvider>
                        <TownhallProvider value={townhall} townhallId='123'>
                            <FixtureSocket.Provider value={emitter}>
                                <MyStory />
                            </FixtureSocket.Provider>
                        </TownhallProvider>
                    </UserProvider>
                </Main>
            </Page>
        ),
    ],
} as Meta;

const Template: Story<{}> = () => <Component />;

export const RegularUser = Template.bind({});

export function AsMod() {
    const id = faker.random.alphaNumeric(5);
    const user = makeUser();
    const copy = { ...townhall };
    copy.settings.moderators.list.push({
        email: user.email.address,
        permissions: [],
    });
    user._id = id;

    return <Component />;
}
