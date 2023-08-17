'use client';

import React from 'react';
import type { ChangeEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Grid, Typography, TextField, Button, List, ListItem } from '@mui/material';

import { signUp } from '@local/lib';

interface Props {
    csfrToken?: string;
}

export function SignUp({ csfrToken }: Props) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [formValues, setFormValues] = React.useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = React.useState('');

    const searchParams = useSearchParams();
    const callbackUrl =
        searchParams.get('callbackUrl') || (process.env.ORIGIN_URL || 'http://localhost:3000') + '/dashboard';

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);

            if (formValues.password !== formValues.confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const { isError, errorMessage } = await signUp({
                name: formValues.name,
                email: formValues.email,
                password: formValues.password,
            });

            if (isError) {
                console.error(errorMessage);
                setError(errorMessage);
                setLoading(false);
                return;
            }

            // After successful registration, sign in user and redirect to dashboard
            const res = await signIn('credentials', {
                email: formValues.email,
                password: formValues.password,
                callbackUrl,
            });

            setLoading(false);
            if (res?.error) {
                console.error(res.error);
                setError(res.error);
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            setLoading(false);
            if (error instanceof Error) {
                console.error(error.message);
                setError(error?.message || 'An error occurred');
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
                    <Typography variant='h3'>Registration</Typography>
                </Grid>
                <input type='hidden' name='csrfToken' defaultValue={csfrToken} />
                <List>
                    <ListItem>
                        <TextField
                            required
                            autoComplete='off'
                            type='text'
                            id='name'
                            name='name'
                            value={formValues.name}
                            onChange={handleChange}
                            label='Name'
                        />
                    </ListItem>
                    <ListItem>
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
                    </ListItem>
                    <ListItem>
                        <TextField
                            required
                            autoComplete='off'
                            type='password'
                            id='password'
                            name='password'
                            value={formValues.password}
                            onChange={handleChange}
                            label='Password'
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            required
                            autoComplete='off'
                            type='password'
                            id='password-confirmation'
                            name='confirmPassword'
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                            label='Confirm Password'
                        />
                    </ListItem>
                </List>
                <Grid item paddingTop={3}>
                    <Button type='submit' variant='contained' color='primary' disabled={loading}>
                        Register
                    </Button>
                </Grid>
                <Grid item paddingTop={3}>
                    {error !== '' && (
                        <Typography variant='body1' color='error'>
                            {error}
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
}
