import React from 'react';
import { Grid, Button } from '@material-ui/core';

import SendIcon from '@material-ui/icons/Send';

import TextField from 'components/TextField';

export interface Props {
    onSubmit: (m: string) => void;
}

export default function Chatbar({ onSubmit }: Props) {
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
