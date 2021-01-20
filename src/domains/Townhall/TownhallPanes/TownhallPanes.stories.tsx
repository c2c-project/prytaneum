/* eslint-disable react/prop-types */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { EventEmitter } from 'events';
import { makeQuestion, makeTownhall, makeUser, Townhall } from 'prytaneum-typings';

import UserProvider from 'contexts/User';
import FixtureSocket from 'mock/Fixture.socket';
import TownhallProvider from 'contexts/Townhall';
import PaneProvider from '../Contexts/Pane';
import TownhallPanes from './TownhallPanes';

const user = makeUser();
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

const townhall = makeTownhall();
townhall.settings.chat.enabled = true;
townhall.settings.questionQueue.transparent = true;

export default {
    title: 'Domains/Townhall/Townhall Panes',
    decorators: [
        (MyStory) => (
            <UserProvider forceNoLogin value={user}>
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
            </UserProvider>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

const Template: Story<{ townhall: Townhall }> = ({ townhall: _townhall }) => (
    <TownhallProvider value={_townhall} townhallId='123'>
        <TownhallPanes />
    </TownhallProvider>
);

export const User = Template.bind({});
User.args = {
    townhall,
};

const modCopy = { ...townhall };
modCopy.settings.moderators.list.push({
    email: user.email.address,
    permissions: [],
});
export const Moderator = Template.bind({});
Moderator.args = {
    townhall: modCopy,
};
