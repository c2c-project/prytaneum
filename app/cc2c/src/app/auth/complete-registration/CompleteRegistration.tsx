'use client';

import React from 'react';
import { Grid, Button, TextField, Typography } from '@mui/material';

import { updatePasswordWithToken } from './actions';

export function CompleteRegistration({ token }: { token: string }) {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleCompleteRegistration = async (formData: FormData) => {
        setLoading(true);
        setError('');

        const { isError, message } = await updatePasswordWithToken(formData);

        if (isError) setError(message);
        setLoading(false);
    };

    return (
        <Grid container direction='column' alignItems='center' paddingTop='10rem'>
            <form action={handleCompleteRegistration}>
                <input type='hidden' name='token' value={token} />
                <TextField name='password' label='Password' type='password' required />
                <TextField name='confirmPassword' label='Confirm Password' type='password' required />
                <Button disabled={loading} type='submit'>
                    Set Password
                </Button>
            </form>
            {error !== '' && <Typography color='error'>{error}</Typography>}
        </Grid>
    );
}
