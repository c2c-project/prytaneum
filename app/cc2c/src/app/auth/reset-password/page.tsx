import React from 'react';
import { ResetPassword } from './ResetPassword';

interface ResetPasswordPageProps {
    params: { token: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ResetPasswordPage({ params, searchParams }: ResetPasswordPageProps) {
    const { token } = searchParams as { token: string };

    return <ResetPassword token={token} />;
}
