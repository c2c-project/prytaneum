import * as React from 'react';
import {
    graphql,
    PreloadedQuery,
    usePreloadedQuery,
    useQueryLoader,
} from 'react-relay';

import type { DashboardQuery } from '@local/__generated__/DashboardQuery.graphql';
import { ConditionalRender } from '@local/components/ConditionalRender';
import { Loader } from '@local/components/Loader';
import { DashboardEvents } from './DashboardEvents';

export const DASHBOARD_QUERY = graphql`
    query DashboardQuery {
        dashboardEvents {
            id
            startDateTime
            endDateTime
            title
            topic
            description
            isActive
            isViewerModerator
            organization {
                name
            }
        }
    }
`;

interface DashboardContainerProps {
    queryRef: PreloadedQuery<DashboardQuery>;
}

export function DashboardContainer({ queryRef }: DashboardContainerProps) {
    const { dashboardEvents } = usePreloadedQuery(DASHBOARD_QUERY, queryRef);

    if (!dashboardEvents) return <Loader />;
    return <DashboardEvents dashboardEvents={dashboardEvents} />;
}

export function PreloadedDashboard() {
    const [queryRef, loadQuery, dispose] = useQueryLoader<DashboardQuery>(DASHBOARD_QUERY);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const REFRESH_INTERVAL = 60000; // 60 seconds

    const refresh = React.useCallback(() => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        loadQuery({}, { fetchPolicy: 'network-only' });
        setIsRefreshing(false);
    }, [isRefreshing, loadQuery]);

    React.useEffect(() => {
        // Load the query on initial render
        if (!queryRef) loadQuery({}, { fetchPolicy: 'network-only' });
        // Refresh the query every 60 seconds
        const interval = setInterval(refresh, REFRESH_INTERVAL);
        return () => {
            clearInterval(interval);
            dispose();
        };
    }, [dispose, loadQuery, queryRef, refresh]);

    if (!queryRef) return <Loader />;
    return (
        <ConditionalRender client>
            <React.Suspense fallback={<Loader />}>
                <DashboardContainer queryRef={queryRef} />
            </React.Suspense>
        </ConditionalRender>
    );
}
