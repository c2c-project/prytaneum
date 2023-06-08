import * as React from 'react';
import { fetchQuery, graphql, useQueryLoader } from 'react-relay';

import type { DashboardQuery } from '@local/__generated__/DashboardQuery.graphql';
import { useEnvironment } from '@local/core';
import { ConditionalRender } from '@local/components/ConditionalRender';
import { Loader } from '@local/components/Loader';
import { DashboardEventList } from './DashboardEventList';

export const DASHBOARD_QUERY = graphql`
    query DashboardQuery {
        me {
            events {
                __id
                edges {
                    node {
                        id
                        title
                        description
                        startDateTime
                        endDateTime
                        isViewerModerator
                        organization {
                            name
                        }
                    }
                }
            }
        }
    }
`;

export function Dashboard() {
    const [queryRef, loadQuery] = useQueryLoader<DashboardQuery>(DASHBOARD_QUERY);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const { env } = useEnvironment();
    const REFRESH_INTERVAL = 20000; // 20 seconds

    const refresh = React.useCallback(() => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        fetchQuery(env, DASHBOARD_QUERY, {}).subscribe({
            complete: () => {
                setIsRefreshing(false);
                loadQuery({}, { fetchPolicy: 'store-or-network' });
            },
            error: () => {
                setIsRefreshing(false);
            },
        });
    }, [env, isRefreshing, loadQuery]);

    React.useEffect(() => {
        // Load the query on initial render
        if (!queryRef) loadQuery({}, { fetchPolicy: 'network-only' });
        // Refresh the query every interval
        const interval = setInterval(() => {
            refresh();
        }, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [loadQuery, queryRef, refresh]);

    if (!queryRef) return <Loader />;
    return (
        <ConditionalRender client>
            <React.Suspense fallback={<Loader />}>
                <DashboardEventList queryRef={queryRef} />
            </React.Suspense>
        </ConditionalRender>
    );
}
