import * as React from 'react';
import { NextPage } from 'next';
import { PreloadedDashboard } from '@local/features/dashboard/Dashboard';
import { Loader } from '@local/components/Loader';
import { useUser } from '@local/features/accounts';
import { useRouter } from 'next/router';

const DashboardPage: NextPage = () => {
    const router = useRouter();
    const { user, isLoading } = useUser();
    const [checkComplete, setCheckComplete] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (user && !isLoading) setCheckComplete(true);
        if (!user && !isLoading) router.push('/');
    }, [user, router, isLoading]);

    return checkComplete ? <PreloadedDashboard /> : <Loader />;
};

export default DashboardPage;
