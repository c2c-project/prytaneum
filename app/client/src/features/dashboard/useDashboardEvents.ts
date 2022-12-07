import * as React from 'react';
import { graphql, useRefetchableFragment } from 'react-relay';

import type { useDashboardEventsFragment$key } from '@local/__generated__/useDashboardEventsFragment.graphql';
import type { DashboardEventsRefreshQuery } from '@local/__generated__/DashboardEventsRefreshQuery.graphql';
import { useRefresh } from '../core';

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
    const REFRESH_INTERVAL = 20000; // 20 seconds
    const refresh = React.useCallback(() => {
        refetch({}, { fetchPolicy: 'store-and-network' });
    }, [refetch]);
    useRefresh({ refreshInterval: REFRESH_INTERVAL, callback: refresh });

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
    };
}
