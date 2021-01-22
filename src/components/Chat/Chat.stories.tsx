import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ChatMessage as ChatMessageType, makeChatMessage } from 'prytaneum-typings';
import { motion } from 'framer-motion';

import ChatMessage from 'components/ChatMessage';
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
    subcomponents: { ChatMessage },
} as Meta;

const makeChatMessages = (num: number) => {
    const ret: ChatMessageType[] = [];
    for (let i = 0; i < num; i += 1) {
        ret.push(makeChatMessage());
    }
    return ret;
};

interface Props {
    onSubmit: () => void;
    messages: ChatMessageType[];
}

const Template: Story<Props> = ({ onSubmit, messages }: Props) => (
    <Chat onSubmit={onSubmit}>
        {messages.map(({ _id, meta, message }) => (
            <li key={_id}>
                <ChatMessage name={meta.createdBy.name.first} timestamp={meta.createdAt} message={message} />
            </li>
        ))}
    </Chat>
);

export const Empty = Template.bind({});
Empty.args = {
    messages: [],
};

export const FewMessages = Template.bind({});
FewMessages.args = {
    messages: makeChatMessages(3),
};

export const ManyMessages = Template.bind({});
ManyMessages.args = {
    messages: makeChatMessages(20),
};

const MAX = 50;
export const DynamicMessages = ({ messages, onSubmit }: Props) => {
    const [newMessages, setNewMessages] = React.useState<ChatMessageType[]>([]);
    React.useEffect(() => {
        const handle = setInterval(
            () => newMessages.length < MAX && setNewMessages((prev) => [...prev, makeChatMessage()]),
            300
        );
        return () => clearInterval(handle);
    }, [messages, setNewMessages, newMessages.length]);
    return <Template messages={[...messages, ...newMessages]} onSubmit={onSubmit} />;
};
DynamicMessages.args = {
    messages: [],
};

export const AnimatedDynamicMessages = ({ messages, onSubmit }: Props) => {
    const [newMessages, setNewMessages] = React.useState<ChatMessageType[]>([]);
    React.useEffect(() => {
        const handle = setInterval(
            () => newMessages.length < MAX && setNewMessages((prev) => [...prev, makeChatMessage()]),
            300
        );
        return () => clearInterval(handle);
    }, [messages, setNewMessages, newMessages.length]);
    return (
        <Chat onSubmit={onSubmit}>
            {[...messages, ...newMessages].map(({ _id, meta, message }) => (
                <motion.li
                    key={_id}
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'keyframes' }}
                >
                    <ChatMessage name={meta.createdBy.name.first} timestamp={meta.createdAt} message={message} />
                </motion.li>
            ))}
        </Chat>
    );
};
AnimatedDynamicMessages.args = {
    messages: [],
};
