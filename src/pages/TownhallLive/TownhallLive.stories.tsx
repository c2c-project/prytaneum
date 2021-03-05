/* eslint-disable react/prop-types */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import faker from 'faker/locale/en';
import { EventEmitter } from 'events';
import { makeQuestion, makeChatMessage, makeUser, makeTownhall, Townhall, User } from 'prytaneum-typings';

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

const baseTownhall = makeTownhall();
baseTownhall.settings.chat.enabled = true;
baseTownhall.settings.questionQueue.transparent = true;
baseTownhall.settings.video.url = 'https://www.youtube.com/watch?v=5qap5aO4i9A';
baseTownhall.form.title = 'Townhall Title';
baseTownhall.form.topic = 'Townhall Topic';
baseTownhall.form.description = 'Townhall Description';
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
                    <FixtureSocket.Provider value={emitter}>
                        <MyStory />
                    </FixtureSocket.Provider>
                </Main>
            </Page>
        ),
    ],
} as Meta;

interface Props {
    townhall: Townhall;
    user: User;
}

const Template: Story<Props> = ({ townhall, user }) => (
    <TownhallProvider value={townhall} townhallId='123'>
        <UserProvider value={user} forceNoLogin>
            <Component />
        </UserProvider>
    </TownhallProvider>
);

export const RegularUser = Template.bind({});
RegularUser.args = {
    townhall: baseTownhall,
    user: makeUser(),
};

export const AsMod = Template.bind({});
function asModerator(): Props {
    const id = faker.random.alphaNumeric(5);
    const user = makeUser();
    const copy = { ...baseTownhall };
    copy.settings.moderators.list.push({
        email: user.email.address,
        permissions: [],
    });
    user._id = id;
    return { user, townhall: copy };
}
AsMod.args = {
    ...asModerator(),
};
