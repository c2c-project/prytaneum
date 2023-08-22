import { Fragment } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@local/app/api/auth/[...nextauth]/route';

import { AppBar } from '@local/components';
import type { User } from '@local/lib';
import { Dashboard } from './dashboard';
import { redirect } from 'next/navigation';
import { AdminDashboard } from './AdminDashboard';

export default async function DashboardPage() {
    // Ensure user is authenticated
    const session = await getServerSession(authOptions);
    if (!session || !session.user) redirect('/');
    const user = session.user as User | undefined;

    return (
        <Fragment>
            <AppBar />
            {/* @ts-ignore - Server Component */}
            {user?.role === 'ADMIN' ? <AdminDashboard /> : <Dashboard />}
        </Fragment>
    );
}
