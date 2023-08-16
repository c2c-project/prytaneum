import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';

import { AppBar } from '@local/components';
import Landing from './landing';

export default async function LandingPage() {
    // Redirect to dashboard if user is already authenticated
    const session = await getServerSession(authOptions);
    if (session?.user !== undefined) redirect('/dashboard');

    return (
        <React.Fragment>
            <AppBar />
            <Landing />
        </React.Fragment>
    );
}
