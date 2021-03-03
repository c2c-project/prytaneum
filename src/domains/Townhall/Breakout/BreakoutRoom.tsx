import React from 'react';
import { MenuItem, Grid, IconButton, Menu } from '@material-ui/core';
import type { ChatMessageForm, SocketIOEvents } from 'prytaneum-typings';
import SettingsIcon from '@material-ui/icons/Settings';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {
    initializeChatMessages,
    addChatMessage,
    updateChatMessage,
    deleteChatMessage,
    readChatMessages,
    breakoutEnd,
} from 'reducers';
import useSocketio, { SocketFn } from 'hooks/useSocketio';
import useEndpoint from 'hooks/useEndpoint';
import useTownhall from 'hooks/useTownhall';
import useUser from 'hooks/useUser';
import Chat from 'components/Chat';
import Loader from 'components/Loader';
import ChatMessage from 'components/ChatMessage';
import BreakoutList from './BreakoutList';
import { createChatMessage, getChatmessages, endBreakout } from '../api';

interface Props {
    onDataChange?: (length: number) => void;
    breakoutId: string;
}

const useStyles = makeStyles((theme) => ({
    dropDown: {
        marginBottom: theme.spacing(1),
    },
}));

export default function BreakoutRoom({ onDataChange, breakoutId }: Props) {
    const classes = useStyles();
    const [townhall, isModerator] = useTownhall();
    const messageRef = React.useRef<ChatMessageForm>();
    const [user] = useUser();
    const countRef = React.useRef<number>(0);
    const dispatch = useDispatch();
    const { unread, read } = useSelector((store) => store.chat);
    const messages = React.useMemo(() => [...read, ...unread], [read, unread]);
    const [menuAnchor, setMenuAnchor] = React.useState<HTMLElement | null>(null);
    const endBreakoutEndpoint = React.useCallback(() => endBreakout(townhall._id), [townhall._id]);
    const [runEndBreakout] = useEndpoint(endBreakoutEndpoint, {
        onSuccess: () => {
            dispatch(breakoutEnd());
        },
        minWaitTime: 0,
    });

    // load initial messages
    const [fetchMessages, areMessagesLoading] = useEndpoint(() => getChatmessages(breakoutId, townhall._id), {
        onSuccess: ({ data }) => dispatch(initializeChatMessages(data)),
        runOnFirstRender: true,
    });

    // I only want to fetch messages each time breakoutId changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(fetchMessages, [breakoutId]);

    const socketFn: SocketFn = React.useCallback(
        (socket) =>
            socket.on('chat-message-state', (action: SocketIOEvents['chat-message-state']) => {
                switch (action.type) {
                    case 'create-chat-message':
                        dispatch(addChatMessage(action.payload));
                        break;
                    case 'update-chat-message':
                        dispatch(updateChatMessage(action.payload));
                        break;
                    case 'delete-chat-message':
                        dispatch(deleteChatMessage(action.payload._id));
                        break;
                    case 'moderate-chat-message':
                        dispatch(deleteChatMessage(action.payload._id));
                        break;
                    default:
                    // do nothing
                }
            }),
        [dispatch]
    );
    useSocketio('/chat-messages', { query: { townhallId: townhall._id } }, socketFn);

    const create = React.useCallback(() => {
        // verify message exists
        if (!messageRef.current) throw new Error('No message set');

        // copy the current message
        const copy = messageRef.current;

        // clear the ref
        messageRef.current = undefined;

        // send
        return createChatMessage(breakoutId, townhall._id, copy);
    }, [townhall._id, breakoutId]);

    const [postMesssage, isLoading] = useEndpoint(create, { minWaitTime: 0 });

    React.useEffect(() => {
        if (onDataChange && messages.length - countRef.current > 0) {
            onDataChange(messages.length - countRef.current);
            countRef.current = messages.length;
        }
    }, [messages.length, onDataChange]);

    const readMessages = React.useCallback(() => {
        dispatch(readChatMessages());
    }, [dispatch]);

    if (areMessagesLoading) return <Loader />;

    return (
        <Chat
            disabled={isLoading || !user}
            onSubmit={(form) => {
                messageRef.current = form;
                postMesssage();
            }}
            onScrollToBottom={readMessages}
        >
            {/* {!isModerator && <Typography variant='h4'>Breakout Room</Typography>} */}
            {isModerator && (
                <Grid container item xs={12} wrap='nowrap' alignItems='center' className={classes.dropDown}>
                    <Grid item xs={12}>
                        <BreakoutList townhallId={townhall._id} breakoutId={breakoutId} />
                    </Grid>
                    <Grid item style={{ marginLeft: 8 }}>
                        <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
                            <SettingsIcon />
                        </IconButton>
                        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
                            <MenuItem onClick={runEndBreakout}>End Breakout</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            )}
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

BreakoutRoom.defaultProps = {
    onDataChange: undefined,
};
