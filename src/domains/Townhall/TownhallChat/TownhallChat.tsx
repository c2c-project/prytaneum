import React from 'react';
import type { ChatMessageForm } from 'prytaneum-typings';
import { motion } from 'framer-motion';

import useSocketio, { SocketFn } from 'hooks/useSocketio';
import useEndpoint from 'hooks/useEndpoint';
import useTownhall from 'hooks/useTownhall';
import useUser from 'hooks/useUser';
import Chat from 'components/Chat';
import Loader from 'components/Loader';
import ChatMessage from 'components/ChatMessage';
import { createChatMessage, getChatmessages } from '../api';
import { chatReducer } from './utils';

export default function TownhallChat() {
    const [townhall] = useTownhall();
    const messageRef = React.useRef<ChatMessageForm>();
    const [messages, dispatchMessage] = React.useReducer(chatReducer, []);
    const [user] = useUser();
    const [, areMessagesLoading] = useEndpoint(() => getChatmessages(townhall._id), {
        onSuccess: ({ data }) => dispatchMessage({ type: 'initial-state', payload: data }),
        runOnFirstRender: true,
    });
    const socketFn: SocketFn = React.useCallback(
        (socket) => {
            socket.on('chat-message-state', dispatchMessage);
        },
        [dispatchMessage]
    );
    useSocketio('/chat-messages', { query: { townhallId: townhall._id } }, socketFn);

    const create = React.useCallback(() => createChatMessage(townhall._id, messageRef.current as ChatMessageForm), [
        townhall._id,
    ]); // gross

    const [postMesssage, isLoading] = useEndpoint(create);

    if (areMessagesLoading) return <Loader />;

    return (
        <Chat
            disabled={isLoading || !user}
            onSubmit={(form) => {
                messageRef.current = form;
                postMesssage();
            }}
        >
            {messages.map(({ _id, meta, message }) => (
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
}
