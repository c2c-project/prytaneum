import React from 'react';
import { Meta, Story } from '@storybook/react';
import { EventEmitter } from 'events';
import { makeChatMessage, makeTownhall, makeUser } from 'prytaneum-typings';

import UserProvider from 'contexts/User';
import TownhallProvider from 'contexts/Townhall';
import FixtureSocket from 'mock/Fixture.socket';
import Component from './TownhallChat';

const emitter = (new EventEmitter() as unknown) as SocketIOClient.Socket;

function sendMessages(num: number) {
    const iterations = num || 1;
    for (let i = 0; i < iterations; i += 1) {
        emitter.emit('chat-message-state', {
            type: 'create-chat-message',
            payload: makeChatMessage(),
        });
    }
}

const Template: Story<{}> = (props) => <Component {...props} />;

export default {
    title: 'Domains/Townhall/Townhall Chat',
    decorators: [
        (MyStory) => (
            <UserProvider forceNoLogin value={makeUser()}>
                <FixtureSocket.Provider value={emitter}>
                    <TownhallProvider value={makeTownhall()} townhallId='123'>
                        <div style={{ flex: 1, padding: 60 }}>
                            <button type='button' onClick={() => sendMessages(5)}>
                                Add Messages
                            </button>
                            <MyStory />
                        </div>
                    </TownhallProvider>
                </FixtureSocket.Provider>
            </UserProvider>
        ),
    ],
    component: Component,
} as Meta;

export const Basic = Template.bind({});
