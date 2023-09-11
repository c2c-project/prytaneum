'use client';

import React from 'react';
import type { ChangeEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Grid, Typography, TextField, Button } from '@mui/material';

interface Props {
    csfrToken?: string;
}

export function SignIn({ csfrToken }: Props) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [formValues, setFormValues] = React.useState({ email: '', password: '' });
    const [error, setError] = React.useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);

            const res = await signIn('credentials', {
                email: formValues.email,
                password: formValues.password,
                redirect: false,
            });

            setLoading(false);
            if (res?.error) {
                setError('Invalid credentials');
            } else {
                router.replace('/dashboard');
            }
        } catch (error) {
            setLoading(false);
            if (error instanceof Error) {
                console.error(error.message);
                setError(error?.message || 'An unexpected error occurred');
            }
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <Grid container component='form' onSubmit={onSubmit} justifyContent='center' height='80vh'>
            <Grid container direction='column' justifyContent='center' alignItems='center'>
                <Grid item paddingY={3}>
                    <Typography variant='h3'>Sign In</Typography>
                </Grid>
                <input type='hidden' name='csrfToken' defaultValue={csfrToken} />
                <Grid item>
                    <TextField
                        required
                        autoComplete='email'
                        type='email'
                        id='email'
                        name='email'
                        value={formValues.email}
                        onChange={handleChange}
                        label='Email'
                    />
                    <TextField
                        // required
                        autoComplete='off'
                        type='password'
                        id='password'
                        name='password'
                        value={formValues.password}
                        onChange={handleChange}
                        label='Password'
                    />
                </Grid>
                <Grid item paddingTop={3}>
                    <Button type='submit' variant='contained' color='primary' disabled={loading}>
                        Sign In
                    </Button>
                </Grid>
                <Grid item paddingTop={3}>
                    {error !== '' && (
                        <Typography variant='body1' color='error'>
                            {error}
                        </Typography>
                    )}
                </Grid>
                <Grid item paddingTop={3}>
                    <Link href='/auth/forgot-password'>Forgot Password</Link>
                </Grid>
            </Grid>
        </Grid>
    );
}
