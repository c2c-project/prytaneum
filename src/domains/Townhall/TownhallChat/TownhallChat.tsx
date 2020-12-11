import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { ChatMessage, ChatMessageForm } from 'prytaneum-typings';

import useSocketio from 'hooks/useSocketio';
import Chatbar from 'components/Chatbar';
import ChatContent from 'components/ChatContent';
import Chat from 'components/Chat';
import useEndpoint from 'hooks/useEndpoint';
import { createChatMessage } from '../api';
import { chatReducer, Actions } from './utils';
import { TownhallContext } from '../Contexts/Townhall';

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
    const townhall = React.useContext(TownhallContext);
    const messageRef = React.useRef<ChatMessageForm>();
    // full question feed from socketio
    const [messages] = useSocketio<ChatMessage[], Actions>({
        url: '/chat-messages',
        event: 'chat-message-state',
        reducer: chatReducer,
        initialState: [],
        query: { townhallId: townhall._id },
    });

    const create = React.useCallback(
        () =>
            createChatMessage(
                townhall._id,
                messageRef.current as ChatMessageForm
            ),
        [townhall._id]
    ); // gross

    const [postMesssage, isLoading] = useEndpoint(create);

    return (
        <Paper className={classes.root}>
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
    );
}
