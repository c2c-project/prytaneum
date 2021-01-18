import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { ChatMessageForm } from 'prytaneum-typings';

import useSocketio, { SocketFn } from 'hooks/useSocketio';
import Chatbar from 'components/Chatbar';
import ChatContent from 'components/ChatContent';
import Chat from 'components/Chat';
import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import useTownhall from 'hooks/useTownhall';
import useUser from 'hooks/useUser';
import { createChatMessage, getChatmessages } from '../api';
import { chatReducer } from './utils';

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: theme.spacing(1.5),
        width: '100%',
        height: '100%',
        minHeight: 500,
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        flex: '1 1 100%',
    },
}));

export default function TownhallChat() {
    const classes = useStyles();
    const [townhall] = useTownhall();
    const messageRef = React.useRef<ChatMessageForm>();
    const [messages, dispatchMessage] = React.useReducer(chatReducer, []);
    const [user] = useUser();
    const [, areMessagesLoading] = useEndpoint(
        () => getChatmessages(townhall._id),
        {
            onSuccess: ({ data }) =>
                dispatchMessage({ type: 'initial-state', payload: data }),
            runOnFirstRender: true,
        }
    );
    const socketFn: SocketFn = React.useCallback(
        (socket) => {
            socket.on('chat-message-state', dispatchMessage);
        },
        [dispatchMessage]
    );
    useSocketio(
        '/chat-messages',
        { query: { townhallId: townhall._id } },
        socketFn
    );

    const create = React.useCallback(
        () =>
            createChatMessage(
                townhall._id,
                messageRef.current as ChatMessageForm
            ),
        [townhall._id]
    ); // gross

    const [postMesssage, isLoading] = useEndpoint(create);

    if (areMessagesLoading) return <Loader />;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Chat>
                    <ChatContent messages={messages} />
                    <Chatbar
                        disabled={isLoading || !user}
                        onSubmit={(form) => {
                            messageRef.current = form;
                            postMesssage();
                        }}
                    />
                </Chat>
            </Paper>
        </div>
    );
}
