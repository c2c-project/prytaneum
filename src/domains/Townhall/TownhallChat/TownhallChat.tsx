import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { ChatMessage } from 'prytaneum-typings';

import useSocketio from 'hooks/useSocketio';
import Chatbar from 'components/Chatbar';
import ChatContent from 'components/ChatContent';
import Chat from 'components/Chat';
import { chatReducer, Actions } from './utils';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        height: '100%',
        display: 'flex',
        flex: 1,
    },
}));

export default function TownhallChat() {
    const classes = useStyles();
    // full question feed from socketio
    const [messages, , socket] = useSocketio<ChatMessage[], Actions>({
        url: '/chat-messages', // FIXME: update the url when I know what it should it should be
        event: 'chat-message-state',
        reducer: chatReducer,
        initialState: [],
    });

    function handleSubmit(message: string) {
        socket.emit('new-chat-message', { message }); // FIXME: when I work on socketio more on server
    }
    return (
        <Paper className={classes.root}>
            <Chat>
                <ChatContent messages={messages} />
                <Chatbar onSubmit={handleSubmit} />
            </Chat>
        </Paper>
    );
}
