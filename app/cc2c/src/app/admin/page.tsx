import { Fragment } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@local/app/api/auth/[...nextauth]/route';

import { AppBar } from '@local/components';
import { Admin } from './admin';
import type { User } from '@local/lib';

export default async function AdminPage() {
    // Ensure user is authenticated & admin
    const session = await getServerSession(authOptions);
    const user = session?.user as User | undefined;
    if (!user || !user.isAdmin) redirect('/');

    return (
        <Fragment>
            <AppBar />
            <Admin />
        </Fragment>
    );
}
