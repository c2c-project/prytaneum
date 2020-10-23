import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TextField from 'components/TextField';
import MessageList from 'components/MessageList';
import MessageListItem from 'components/MessageListItem';
import MessageItemAuthor from 'components/MessageItemAuthor';
import useSocketio from 'hooks/useSocketio';
import { ChatMessage } from '../types';
import { chatReducer, Actions } from './utils';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        height: '100%',
        display: 'flex',
        flex: 1,
    },
}));

function ChatContent() {
    // full question feed from socketio
    const [messages] = useSocketio<ChatMessage[], Actions>({
        url: '/moderator/questions', // FIXME: update the url when I know what it should it should be
        event: 'townhall-chat-state',
        reducer: chatReducer,
        initialState: [],
    });
    const ref = React.useRef<HTMLDivElement | null>(null);
    React.useLayoutEffect(() => {
        // TODO: use intersection observer to see if I should keep scrolling bot etc.
    }, []);
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
        <Grid item xs='auto' style={{ flex: 1, overflowY: 'auto' }} container>
            {messages.length === 0 && emptyMessage}
            <MessageList>
                {messages.map(({ meta, message }, idx) => (
                    <MessageListItem
                        button={false}
                        onClick={() => {}}
                        hidden={false}
                        key={idx}
                    >
                        <MessageItemAuthor
                            name={meta.user.name.first}
                            timestamp={meta.timestamp}
                            message={message}
                        />
                        {/* <MessageItemText text='asdf' /> */}
                    </MessageListItem>
                ))}
            </MessageList>
            <div ref={ref} />
        </Grid>
    );
}

function MessageInput() {
    return (
        <Grid item xs='auto'>
            <TextField label='Message' />
        </Grid>
    );
}

export default function Chat() {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Grid container direction='column'>
                <ChatContent />
                <MessageInput />
            </Grid>
        </Paper>
    );
}
