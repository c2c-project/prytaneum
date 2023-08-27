import { Fragment } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@local/app/api/auth/[...nextauth]/route';

import { AppBar } from '@local/components';
import type { User } from '@local/lib';
import { AdminDashboard } from './AdminDashboard';
import { StudentDashboard } from './StudentDashboard';
import { TeacherDashboard } from './TeacherDashboard';

export default async function DashboardPage() {
    // Ensure user is authenticated
    const session = await getServerSession(authOptions);
    if (!session || !session.user) redirect('/');
    const user = session.user as User | undefined;

    const displayDashboard = async () => {
        /* @ts-ignore - Server Component */
        if (user?.role === 'ADMIN') return <AdminDashboard />;
        /* @ts-ignore - Server Component */
        if (user?.role === 'TEACHER') return <TeacherDashboard />;
        /* @ts-ignore - Server Component */
        return <StudentDashboard />;
    };

    return (
        <Fragment>
            <AppBar />
            {/* @ts-ignore - Server Component */}
            {await displayDashboard()}
        </Fragment>
    );
}
