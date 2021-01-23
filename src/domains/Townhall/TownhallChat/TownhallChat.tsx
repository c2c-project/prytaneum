import React from 'react';
import type { ChatMessageForm } from 'prytaneum-typings';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

import { ChatActions } from 'reducers';
import useSocketio, { SocketFn } from 'hooks/useSocketio';
import useEndpoint from 'hooks/useEndpoint';
import useTownhall from 'hooks/useTownhall';
import useUser from 'hooks/useUser';
import Chat from 'components/Chat';
import Loader from 'components/Loader';
import ChatMessage from 'components/ChatMessage';
import { createChatMessage, getChatmessages } from '../api';

interface Props {
    onDataChange?: (length: number) => void;
}

export default function TownhallChat({ onDataChange }: Props) {
    const [townhall] = useTownhall();
    const messageRef = React.useRef<ChatMessageForm>();
    const [user] = useUser();
    const countRef = React.useRef<number>(0);
    const dispatch = useDispatch<Dispatch<ChatActions>>();
    const messages = useSelector((store) => store.chat);

    // load initial messages
    const [, areMessagesLoading] = useEndpoint(() => getChatmessages(townhall._id), {
        onSuccess: ({ data }) => dispatch({ type: 'chat-initial-state', payload: data }),
        runOnFirstRender: true,
    });

    const socketFn: SocketFn = React.useCallback((socket) => socket.on('chat-message-state', dispatch), [dispatch]);
    useSocketio('/chat-messages', { query: { townhallId: townhall._id } }, socketFn);

    const create = React.useCallback(() => {
        // verify message exists
        if (!messageRef.current) throw new Error('No message set');

        // copy the current message
        const copy = messageRef.current;

        // clear the ref
        messageRef.current = undefined;

        // send
        return createChatMessage(townhall._id, copy);
    }, [townhall._id]);

    const [postMesssage, isLoading] = useEndpoint(create, { minWaitTime: 0 });

    React.useEffect(() => {
        if (onDataChange && messages.length - countRef.current > 0) {
            onDataChange(messages.length - countRef.current);
            countRef.current = messages.length;
        }
    }, [messages.length, onDataChange]);

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

TownhallChat.defaultProps = {
    onDataChange: undefined,
};
