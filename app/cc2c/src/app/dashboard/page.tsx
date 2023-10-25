import { Fragment } from 'react';
import { getServerSession } from 'next-auth';

import { AppBar } from '@local/components';
import { StudentDashboard } from './StudentDashboard';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { UserWithoutPass } from '../api/auth/types';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const user = session?.user as UserWithoutPass | undefined;
    if (!user) redirect('/');
    if (user.role === 'TEACHER') redirect(`/teacher/dashboard`);
    if (user.role === 'ADMIN') redirect(`/admin/dashboard`);

    return (
        <Fragment>
            <AppBar />
            {/* @ts-ignore - Server Component */}
            <StudentDashboard />
        </Fragment>
    );
}
