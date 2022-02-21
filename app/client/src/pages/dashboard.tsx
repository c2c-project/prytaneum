import * as React from 'react';
import { NextPage } from 'next';
import { useQueryLoader } from 'react-relay';

import { DashboardQuery } from '@local/__generated__/DashboardQuery.graphql';
import { Dashboard, DASHBOARD_QUERY } from '@local/features/dashboard/Dashboard';
import { Loader } from '@local/components/Loader';

const DashboardPage: NextPage = () => {
    const [queryRef, loadQuery] = useQueryLoader<DashboardQuery>(DASHBOARD_QUERY);

    React.useEffect(() => {
        if (!queryRef) loadQuery({});
    }, [queryRef, loadQuery]);

    if (!queryRef) return <Loader />;

    return (
        <React.Suspense fallback='loading...'>
            <Dashboard queryRef={queryRef} />
        </React.Suspense>
    );
}

export default DashboardPage;
