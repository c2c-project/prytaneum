import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { AppBar } from '@local/components';
import { TeacherDashboard } from './TeacherDashboard';
import { getClassByTeacherId } from './actions';
import type { UserWithoutPass } from '@local/app/api/auth/types';
import { authOptions } from '@local/app/api/auth/[...nextauth]/route';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    console.log(session);
    const user = session?.user as UserWithoutPass | undefined;
    if (!user) redirect('/');
    const classId = await getClassByTeacherId(user.id);

    return (
        <React.Fragment>
            <AppBar />
            {/* @ts-ignore - Server Component */}
            <TeacherDashboard classId={classId} />
        </React.Fragment>
    );
}
