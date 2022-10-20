import * as React from 'react';
import { fetchQuery, graphql, useRefetchableFragment } from 'react-relay';

import type { useDashboardEventsFragment$key } from '@local/__generated__/useDashboardEventsFragment.graphql';
import { useEnvironment } from '@local/core';
import type { DashboardEventsRefreshQuery } from '@local/__generated__/DashboardEventsRefreshQuery.graphql';

export const USE_DASHBOARD_EVENTS_FRAGMENT = graphql`
    fragment useDashboardEventsFragment on User
    @refetchable(queryName: "DashboardEventsRefreshQuery")
    @argumentDefinitions(count: { type: "Int", defaultValue: 50 }, cursor: { type: "String", defaultValue: "" }) {
        id
        events(first: $count, after: $cursor) @connection(key: "useDashboardEventsFragment_events") {
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
`;

interface TArgs {
    fragmentRef: useDashboardEventsFragment$key;
}

export function useDashboardEvents({ fragmentRef }: TArgs) {
    const [data, refetch] = useRefetchableFragment<DashboardEventsRefreshQuery, useDashboardEventsFragment$key>(
        USE_DASHBOARD_EVENTS_FRAGMENT,
        fragmentRef
    );
    const { events } = data;
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const { env } = useEnvironment();

    const refresh = React.useCallback(() => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        fetchQuery(env, USE_DASHBOARD_EVENTS_FRAGMENT, {}).subscribe({
            complete: () => {
                setIsRefreshing(false);
                refetch({}, { fetchPolicy: 'network-only' });
            },
            error: () => {
                setIsRefreshing(false);
            },
        });
    }, [env, isRefreshing, refetch]);

    const eventList = React.useMemo(
        () =>
            events?.edges
                ? events.edges.map(({ node }) => {
                      return { node };
                  })
                : [],
        [events]
    );

    return {
        events: eventList,
        connections: events?.__id ? [events.__id] : [],
        refresh,
    };
}
