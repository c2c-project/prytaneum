import React from 'react';
import { CompleteRegistration } from './CompleteRegistration';

interface CompleteRegistrationPageProps {
    params: { token: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default function CompleteRegistrationPage({ params, searchParams }: CompleteRegistrationPageProps) {
    const { token } = searchParams as { token: string };

    return <CompleteRegistration token={token} />;
}
