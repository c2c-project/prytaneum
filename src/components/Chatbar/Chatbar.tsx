import React from 'react';
import type { ChatMessageForm } from 'prytaneum-typings';
import { Grid, Button } from '@material-ui/core';

import SendIcon from '@material-ui/icons/Send';

import TextField from 'components/TextField';

export interface Props {
    onSubmit: (m: ChatMessageForm) => void;
    disabled?: boolean;
}

export default function Chatbar({ onSubmit, disabled }: Props) {
    const [message, setMessage] = React.useState('');
    const ref = React.useRef<HTMLInputElement | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const copy = message;
        setMessage('');
        ref.current?.focus();
        onSubmit({ message: copy });
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const { value } = e.target;
        setMessage(value);
    }
    return (
        <Grid
            component='form'
            onSubmit={handleSubmit}
            container
            item
            xs='auto'
            wrap='nowrap'
        >
            <Grid item style={{ flex: '1 1 100%' }}>
                <TextField
                    ref={ref}
                    label='Message'
                    value={message}
                    onChange={handleChange}
                />
            </Grid>
            <Grid
                item
                xs='auto'
                style={{ paddingLeft: '8px', display: 'flex', flex: 1 }}
            >
                <Button
                    disabled={disabled || message.length === 0}
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
