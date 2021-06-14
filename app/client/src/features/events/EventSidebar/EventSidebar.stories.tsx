/* eslint-disable react/prop-types */
import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { EventEmitter } from 'events';
import { makeQuestion, makeTownhall, makeUser, Townhall, User, makeGenFn, makeSpeaker } from 'prytaneum-typings';
import faker from 'faker';

import UserProvider from '@local/contexts/User';
import FixtureSocket from 'mock/Fixture.socket';
import TownhallProvider from '@local/contexts/Townhall';
import PaneProvider from '../Contexts/Pane';
import TownhallPanes from './EventSidebar';

const baseUser = makeUser();
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

const makeQuestions = makeGenFn(makeQuestion);

const baseTownhall = makeTownhall();
baseTownhall.settings.chat.enabled = true;
baseTownhall.settings.questionQueue.transparent = true;
baseTownhall.state.playlist.queue = makeQuestions(10);
baseTownhall.state.playlist.position.current = 0;

export default {
    title: '@local/domains/Townhall/Townhall Panes',
    decorators: [
        (MyStory) => (
            <FixtureSocket.Provider value={emitter}>
                <PaneProvider>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <button type='button' onClick={() => sendMessage(20)}>
                            Add Questions
                        </button>
                        <MyStory />
                    </div>
                </PaneProvider>
            </FixtureSocket.Provider>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

const Template: Story<{ townhall: Townhall; user: User }> = ({ townhall, user }) => (
    <UserProvider forceNoLogin value={user}>
        <TownhallProvider forceNoFetch value={townhall} townhallId='123'>
            <TownhallPanes />
        </TownhallProvider>
    </UserProvider>
);

export const LoggedOut = Template.bind({});
LoggedOut.args = {
    townhall: baseTownhall,
    user: undefined,
};

export const RegularUser = Template.bind({});
RegularUser.args = {
    townhall: baseTownhall,
    user: baseUser,
};

const modCopy = { ...baseTownhall };
modCopy.settings.moderators.list.push({
    email: baseUser.email.address,
    permissions: [],
});
export const Moderator = Template.bind({});
Moderator.args = {
    townhall: modCopy,
    user: baseUser,
};

const makeSpeakers = makeGenFn(makeSpeaker);
export const Packed = Template.bind({});
Packed.args = {
    townhall: {
        ...baseTownhall,
        form: {
            ...baseTownhall.form,
            description: faker.lorem.paragraph(5),
        },
        settings: {
            ...baseTownhall.settings,
            speakers: {
                list: makeSpeakers(10),
            },
        },
    },
    user: baseUser,
};

export const StaticNoTabs = Template.bind({});
StaticNoTabs.args = {
    townhall: {
        ...baseTownhall,
        settings: {
            ...baseTownhall.settings,
            chat: {
                enabled: false,
                automated: false,
            },
            questionQueue: {
                transparent: false,
                automated: false,
            },
        },
    },
};
StaticNoTabs.parameters = {
    chromatic: { disable: false },
};
