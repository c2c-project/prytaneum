import React from 'react';
import { redirect } from 'next/navigation';
import { getCsrfToken } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@local/app/api/auth/[...nextauth]/route';

import { TeacherSignUp } from './TeacherSignUp';
import { AppBar } from '@local/components';

export default async function TeacherSignUpPage() {
    // Ensure user is not already authenticated
    const session = await getServerSession(authOptions);
    if (session?.user !== undefined) redirect('/dashboard');

    const csrfToken = await getCsrfToken();

    return (
        <React.Fragment>
            <AppBar />
            <TeacherSignUp csfrToken={csrfToken} />
        </React.Fragment>
    );
}
