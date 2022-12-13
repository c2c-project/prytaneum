import * as React from 'react';
import { useRouter } from 'next/router';

import { useUser } from '@local/features/accounts/useUser';
import { Loader } from '@local/components';
import { UsersDashboard } from '@local/features/admin/UsersDashboard';

export default function Admin() {
    const [user, , isLoading] = useUser();
    const router = useRouter();

    React.useEffect(() => {
        if (!isLoading && (!user || !user.isAdmin)) router.push('/');
    }, [isLoading, user, router]);

    if (isLoading || !router.isReady) return <Loader />;
    return <UsersDashboard />;
}
