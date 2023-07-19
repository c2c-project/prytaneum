'use client';

import React from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';
import { Button } from '@mui/material';

export const SignInButton = () => {
    const { data: session } = useSession();

    console.log('session', session);

    if (session && session.user) {
        return (
            <Button variant='contained' color='primary' onClick={() => signOut()}>
                Sign Out
            </Button>
        );
    }
    return (
        <Button variant='contained' color='primary' onClick={() => signIn()}>
            Sign In
        </Button>
    );
};
