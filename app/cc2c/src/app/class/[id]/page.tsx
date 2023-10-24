import React from 'react';

import { AppBar } from '@local/components';
import { Class } from './Class';
import { getServerSession } from 'next-auth';
import { authOptions } from '@local/app/api/auth/[...nextauth]/route';
import type { UserWithoutPass } from '@local/app/api/auth/types';
import { redirect } from 'next/navigation';

interface ClassPageProps {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function ClassPage({ params }: ClassPageProps) {
    const { id: classId } = params;
    const session = await getServerSession(authOptions);
    const user = session?.user as UserWithoutPass | undefined;
    if (!user) redirect('/');

    return (
        <React.Fragment>
            <AppBar />
            {/* @ts-ignore Server Component */}
            <Class classId={classId} user={user} />
        </React.Fragment>
    );
}
