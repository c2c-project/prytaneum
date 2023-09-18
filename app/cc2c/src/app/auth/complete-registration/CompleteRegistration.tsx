'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Button, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { updatePasswordWithToken } from './actions';

export function CompleteRegistration({ token }: { token: string }) {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [isPassVisible, setIsPassVisible] = React.useState(false);
    const router = useRouter();

    const handleCompleteRegistration = async (formData: FormData) => {
        setLoading(true);
        setError('');

        const { isError, message } = await updatePasswordWithToken(formData);

        if (isError) setError(message);
        else router.replace('/auth/signin');
        setLoading(false);
    };

    return (
        <Grid container direction='column' alignItems='center' paddingTop='10rem'>
            <Typography variant='h3'>Welcome to the Connecting Classrooms to Congress project website!</Typography>
            <Typography variant='h5'>
                Please set your password here to finish creating your account. Your teacher will tell you when to use
                the cc2c website, so once you set your password you can close your browser.
            </Typography>
            <form action={handleCompleteRegistration}>
                <Grid container direction='column' alignItems='center' paddingTop='2rem'>
                    <input type='hidden' name='token' value={token} />
                    <TextField
                        name='password'
                        label='Password'
                        type={isPassVisible ? 'text' : 'password'}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setIsPassVisible(!isPassVisible)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge='end'
                                        size='large'
                                    >
                                        {isPassVisible ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Grid item paddingTop='1rem' />
                    <TextField
                        name='confirmPassword'
                        label='Confirm Password'
                        type={isPassVisible ? 'text' : 'password'}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setIsPassVisible(!isPassVisible)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge='end'
                                        size='large'
                                    >
                                        {isPassVisible ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Grid item paddingTop='1rem' />
                    <Button disabled={loading} type='submit'>
                        Set Password
                    </Button>
                </Grid>
            </form>
            {error !== '' && <Typography color='error'>{error}</Typography>}
        </Grid>
    );
}
