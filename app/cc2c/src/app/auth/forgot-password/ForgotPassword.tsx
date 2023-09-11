'use client';

import React from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';

import { sendForgotPasswordEmail } from './actions';
import { useSnack } from '@local/lib';

export function ForgotPassword() {
    const [loading, setLoading] = React.useState(false);

    const { displaySnack } = useSnack();

    const handleForgotPassword = async (formData: FormData) => {
        setLoading(true);
        const { isError, message } = await sendForgotPasswordEmail(formData);
        if (isError) displaySnack(message, { variant: 'error' });
        else displaySnack('Email sent!', { variant: 'success' });
        setLoading(false);
    };

    return (
        <Grid container direction='column' alignItems='center' paddingTop='10rem'>
            <Typography variant='h3'>Forgot Password</Typography>
            <Grid item paddingTop='1rem' />
            <Typography variant='body1'>
                Please enter your email address and use the link sent to it to reset your password.
            </Typography>
            <Grid item paddingTop='1rem' />
            <form action={handleForgotPassword}>
                <Grid container direction='column' alignItems='center'>
                    <TextField name='email' label='Email' type='email' required />
                    <Grid item paddingTop='1rem' />
                    <Button disabled={loading} type='submit'>
                        Send Reset Link
                    </Button>
                </Grid>
            </form>
        </Grid>
    );
}
