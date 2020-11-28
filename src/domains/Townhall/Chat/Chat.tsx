import React from 'react';
import { Paper, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import type { ChatMessage } from 'prytaneum-typings';

import TextField from 'components/TextField';
import MessageList from 'components/MessageList';
import MessageListItem from 'components/MessageListItem';
import Message from 'components/Message';
import ScrollTo from 'components/ScrollTo';
import useSocketio from 'hooks/useSocketio';
import { chatReducer, Actions } from './utils';
// TODO:
// import { PaneContext } from '../Contexts/Pane';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        height: '100%',
        display: 'flex',
        flex: 1,
    },
}));

interface ChatContentProps {
    messages: ChatMessage[];
}

function ChatContent({ messages }: ChatContentProps) {
    // TODO: use to calculate how many new messages there are
    // and update the pane context so it can display in the menu
    // const [, dispatch] = React.useContext(PaneContext);
    // const ref = React.useRef(0);
    const emptyMessage = (
        <Grid container item xs={12} justify='center' direction='column'>
            <Typography variant='h5' paragraph align='center'>
                Nothing to display here :(
            </Typography>
            <Typography variant='body1' align='center'>
                Start sending mesages by using the textbox below
            </Typography>
        </Grid>
    );

    return (
        <Grid
            item
            xs='auto'
            style={{ flex: 1, overflowY: 'auto', position: 'relative' }}
            container
        >
            {messages.length === 0 && emptyMessage}
            <ScrollTo direction='bottom'>
                <MessageList>
                    {messages.map(({ meta, message }, idx) => (
                        <MessageListItem
                            button={false}
                            onClick={() => {}}
                            hidden={false}
                            key={idx}
                        >
                            <Message
                                name={meta.createdBy.name.first}
                                timestamp={meta.createdAt}
                                message={message}
                            />
                        </MessageListItem>
                    ))}
                </MessageList>
            </ScrollTo>
        </Grid>
    );
}

interface MessageInputProps {
    onSubmit: (m: string) => void;
}

function MessageInput({ onSubmit }: MessageInputProps) {
    const [message, setMessage] = React.useState('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit(message);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const { value } = e.target;
        setMessage(value);
    }
    return (
        <Grid component='form' onSubmit={handleSubmit} container item xs='auto'>
            <Grid item xs='auto' style={{ flex: 1 }}>
                <TextField
                    label='Message'
                    value={message}
                    onChange={handleChange}
                />
            </Grid>
            <Grid
                item
                xs='auto'
                style={{ paddingLeft: '8px', display: 'flex' }}
            >
                <Button
                    variant='contained'
                    color='primary'
                    endIcon={<SendIcon />}
                    style={{ flexGrow: 1 }}
                    type='submit'
                >
                    Send
                </Button>
            </Grid>
        </Grid>
    );
}

export default function Chat() {
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
        <Paper className={classes.root} elevation={10}>
            <Grid container direction='column'>
                <ChatContent messages={messages} />
                <MessageInput onSubmit={handleSubmit} />
            </Grid>
        </Paper>
    );
}
