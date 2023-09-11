'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Button, TextField, Typography } from '@mui/material';

import { updatePasswordWithToken } from './actions';

export function ResetPassword({ token }: { token: string }) {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const router = useRouter();

    const handleResetPassword = async (formData: FormData) => {
        setLoading(true);
        setError('');

        const { isError, message } = await updatePasswordWithToken(formData);

        if (isError) setError(message);
        else router.replace('/auth/signin');
        setLoading(false);
    };

    return (
        <Grid container direction='column' alignItems='center' paddingTop='10rem'>
            <Typography variant='h3'>Reset your account password</Typography>
            <form action={handleResetPassword}>
                <Grid container direction='column' alignItems='center' paddingTop='2rem'>
                    <input type='hidden' name='token' value={token} />
                    <TextField name='password' label='Password' type='password' required />
                    <Grid item paddingTop='1rem' />
                    <TextField name='confirmPassword' label='Confirm Password' type='password' required />
                    <Grid item paddingTop='1rem' />
                    <Button disabled={loading} type='submit'>
                        Set New Password
                    </Button>
                </Grid>
            </form>
            {error !== '' && <Typography color='error'>{error}</Typography>}
        </Grid>
    );
}
