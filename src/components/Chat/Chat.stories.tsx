import React from 'react';
import { Story } from '@storybook/react';
import { ChatMessage, makeChatMessage } from 'prytaneum-typings';

import Chat from './Chat';
import ChatContent from '../ChatContent';
import ChatBar from '../Chatbar';

export default {
    title: 'components/Chat',
    argTypes: {
        onSubmit: { action: 'submitted' },
    },
};

const makeChatMessages = (num: number) => {
    const ret: ChatMessage[] = [];
    for (let i = 0; i < num; i += 1) {
        ret.push(makeChatMessage());
    }
    return ret;
};

interface Props {
    onSubmit: () => void;
    messages: ChatMessage[];
}

const Template: Story<Props> = ({ onSubmit, messages }: Props) => (
    <Chat>
        <ChatContent messages={messages} />
        <ChatBar onSubmit={onSubmit} />
    </Chat>
);

export const Empty = Template.bind({});
Empty.args = {
    messages: [],
};

export const Few = Template.bind({});
Few.args = {
    messages: makeChatMessages(3),
};

export const Full = Template.bind({});
Full.args = {
    messages: makeChatMessages(20),
};
