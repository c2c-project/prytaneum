import { useSnack } from '@local/core';
import { EventLiveMutation } from '@local/__generated__/EventLiveMutation.graphql';
import { useRouter } from 'next/router';
import React from 'react';
import { graphql, useMutation } from 'react-relay';

import { IconButton, InputAdornment, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CreateIcon from '@mui/icons-material/Create';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const useStyles = makeStyles((theme) => ({
    search: {
        flex: 1,
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1, 1),
    },
    input: {
        '& fieldset': {
            borderRadius: 9999, // rounded text field
        },
    },
}));

export const BROADCAST_MESSAGE_MUTATION = graphql`
    mutation EventLiveMutation($input: CreateBroadcastMessage!) {
        createBroadcastMessage(input: $input) {
            isError
            message
        }
    }
`;

export function BroadcastMessageInput() {
    const classes = useStyles();
    const { displaySnack } = useSnack();
    const router = useRouter();
    const eventId = router.query.id as string;
    const [commit] = useMutation<EventLiveMutation>(BROADCAST_MESSAGE_MUTATION);
    const [broadcastMessage, setBroadcastMessage] = React.useState('');

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            commit({
                variables: { input: { eventId, broadcastMessage } },
                onCompleted(payload) {
                    if (payload.createBroadcastMessage.isError) displaySnack('Something went wrong!');
                    else displaySnack('broadcasted message successfully!');
                },
            });
        } catch (err) {
            displaySnack(err.message);
        }
    };
    return (
        <form onSubmit={handleSubmit} className={classes.search}>
            <TextField
                label='Search'
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className={classes.input}
                InputProps={{
                    // TODO: animation change here
                    startAdornment: (
                        <InputAdornment position='start'>
                            <CreateIcon />
                        </InputAdornment>
                    ),
                    // TODO: add refresh action
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton edge='end' onClick={handleSubmit} size='large'>
                                <ArrowUpwardIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    );
}
