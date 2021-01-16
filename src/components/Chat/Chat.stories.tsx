/* eslint-disable no-console */
import React from 'react';
import { ChatMessage, makeChatMessage } from 'prytaneum-typings';

import Chat from './Chat';
import ChatContent from '../ChatContent';
import ChatBar from '../Chatbar';

export default { title: 'components/Chat' };

const makeChatMessages = (num: number) => {
    const ret: ChatMessage[] = [];
    for (let i = 0; i < num; i += 1) {
        ret.push(makeChatMessage());
    }
    return ret;
};

export function Basic() {
    return (
        <Chat>
            <ChatContent messages={makeChatMessages(20)} />
            <ChatBar onSubmit={console.log} />
        </Chat>
    );
}
