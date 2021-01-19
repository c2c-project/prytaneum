import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ChatMessage, makeChatMessage } from 'prytaneum-typings';

import Chat from './Chat';

export default {
    title: 'components/Chat',
    argTypes: {
        onSubmit: { action: 'submitted' },
    },
    decorators: [
        (MyStory) => (
            <div style={{ padding: 30, flex: 1 }}>
                <MyStory />
            </div>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

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

const Template: Story<Props> = ({ onSubmit, messages }: Props) => <Chat onSubmit={onSubmit} messages={messages} />;

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

const MAX = 50;
export const Active = ({ messages, onSubmit }: Props) => {
    const [newMessages, setNewMessages] = React.useState<ChatMessage[]>([]);
    React.useEffect(() => {
        const handle = setInterval(
            () => newMessages.length < MAX && setNewMessages((prev) => [...prev, makeChatMessage()]),
            300
        );
        return () => clearInterval(handle);
    }, [messages, setNewMessages, newMessages.length]);
    return <Template messages={[...messages, ...newMessages]} onSubmit={onSubmit} />;
};
Active.args = {
    messages: [],
};
