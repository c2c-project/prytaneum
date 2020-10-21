import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TextField from 'components/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        height: '100%',
        display: 'flex',
        flex: 1,
    },
}));

function ChatContent() {
    return (
        <Grid item xs='auto' style={{ flexGrow: 1, overflowY: 'auto' }}>
            asdf
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
