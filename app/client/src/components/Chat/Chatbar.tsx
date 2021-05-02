import * as React from 'react';
import type { ChatMessageForm } from 'prytaneum-typings';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SendIcon from '@material-ui/icons/Send';

import TextField from '@local/components/TextField';

const useStyles = makeStyles((theme) => ({
    btn: {
        paddingLeft: theme.spacing(1),
        display: 'flex',
        flex: 1,
    },
}));
export interface Props {
    onSubmit: (m: ChatMessageForm) => void;
    disabled?: boolean;
}

export default function Chatbar({ onSubmit, disabled }: Props) {
    const classes = useStyles();
    const [message, setMessage] = React.useState('');
    const ref = React.useRef<HTMLInputElement | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        ref.current?.focus();
        e.preventDefault();
        const copy = message;
        setMessage('');
        onSubmit({ message: copy });
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const { value } = e.target;
        setMessage(value);
    }
    return (
        <Grid component='form' onSubmit={handleSubmit} container item xs='auto' wrap='nowrap'>
            <Grid item xs={12}>
                <TextField ref={ref} label='Message' value={message} onChange={handleChange} />
            </Grid>
            <div className={classes.btn}>
                <Button
                    disabled={disabled || message.trim().length === 0}
                    variant='contained'
                    color='primary'
                    endIcon={<SendIcon />}
                    style={{ flexGrow: 1 }}
                    type='submit'
                >
                    Send
                </Button>
            </div>
        </Grid>
    );
}
