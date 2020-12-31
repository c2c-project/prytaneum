import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { ChatMessageForm } from 'prytaneum-typings';

import useSocketio from 'hooks/useSocketio';
import Chatbar from 'components/Chatbar';
import ChatContent from 'components/ChatContent';
import Chat from 'components/Chat';
import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import { createChatMessage, getChatmessages } from '../api';
import { chatReducer } from './utils';
import { TownhallContext } from '../Contexts/Townhall';

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
    const townhall = React.useContext(TownhallContext);
    const messageRef = React.useRef<ChatMessageForm>();
    const [messages, dispatchMessage] = React.useReducer(chatReducer, []);
    const [get, areMessagesLoading] = useEndpoint(
        () => getChatmessages(townhall._id),
        {
            onSuccess: ({ data }) =>
                dispatchMessage({ type: 'initial-state', payload: data }),
        }
    );

    useSocketio(
        '/chat-messages',
        { query: { townhallId: townhall._id } },
        (socket) => {
            socket.on('chat-message-state', dispatchMessage);
        },
        [dispatchMessage]
    );

    React.useEffect(get, []);

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
                        disabled={isLoading}
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
