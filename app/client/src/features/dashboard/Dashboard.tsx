import * as React from 'react';
import { graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';

import type { DashboardQuery } from '@local/__generated__/DashboardQuery.graphql';
import { ConditionalRender } from '@local/components/ConditionalRender';
import { Loader } from '@local/components/Loader';
import { DashboardEvents } from './DashboardEvents';

export const DASHBOARD_QUERY = graphql`
    query DashboardQuery {
        me {
            ...useDashboardEventsFragment
        }
    }
`;

interface DashboardContainerProps {
    queryRef: PreloadedQuery<DashboardQuery>;
}

export function DashboardContainer({ queryRef }: DashboardContainerProps) {
    const { me: queryResponse } = usePreloadedQuery(DASHBOARD_QUERY, queryRef);

    if (!queryResponse) return <Loader />;
    return (
        <React.Suspense fallback={<Loader />}>
            <DashboardEvents fragmentRef={queryResponse} />
        </React.Suspense>
    );
}

export function PreloadedDashboard() {
    const [queryRef, loadQuery, dispose] = useQueryLoader<DashboardQuery>(DASHBOARD_QUERY);

    React.useEffect(() => {
        // Load the query on initial render
        if (!queryRef) loadQuery({}, { fetchPolicy: 'network-only' });
        return () => dispose();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!queryRef) return <Loader />;
    return (
        <ConditionalRender client>
            <React.Suspense fallback={<Loader />}>
                <DashboardContainer queryRef={queryRef} />
            </React.Suspense>
        </ConditionalRender>
    );
}
