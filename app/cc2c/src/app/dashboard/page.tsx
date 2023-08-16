import { Fragment } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@local/app/api/auth/[...nextauth]/route';

import { AppBar } from '@local/components';
import { Dashboard } from './dashboard';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    // Ensure user is authenticated
    const session = await getServerSession(authOptions);
    if (!session || !session.user) redirect('/');

    return (
        <Fragment>
            <AppBar />
            <Dashboard />
        </Fragment>
    );
}
