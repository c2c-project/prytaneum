import * as React from 'react';
import { useRouter } from 'next/router';
import UserSettings from '@local/features/accounts/UserSettings';
import { useUser } from '@local/features/accounts';
import { Loader } from '@local/components/Loader';

export default function Login() {
    const router = useRouter();

    const { user, isLoading } = useUser();

    React.useEffect(() => {
        if (!isLoading && !user) router.push('/');
    }, [user, isLoading, router]);

    if (isLoading || !user) return <Loader />;

    return <UserSettings />;
}
