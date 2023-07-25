import * as React from 'react';
import { graphql, useRefetchableFragment } from 'react-relay';
import { isAfter, isBefore } from 'date-fns';

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
                    isActive
                    organization {
                        name
                    }
                }
            }
            pageInfo {
                startCursor
                endCursor
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
        refetch({ cursor: events?.pageInfo.endCursor }, { fetchPolicy: 'store-and-network' });
    }, [events?.pageInfo.endCursor, refetch]);
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

    const [now, setNow] = React.useState(new Date());
    useRefresh({ refreshInterval: 5000 /* 5 seconds */, callback: () => setNow(new Date()) });

    const currentEvents = React.useMemo(() => {
        return eventList.filter(({ node: event }) => {
            if (!event.startDateTime || !event.endDateTime) return Boolean(event.isActive);
            return (
                Boolean(event.isActive) ||
                (isBefore(new Date(event.startDateTime), now) && isAfter(new Date(event.endDateTime), now))
            );
        });
    }, [eventList, now]);

    const upcomingEvents = React.useMemo(() => {
        return eventList.filter(({ node: event }) => {
            if (!event.startDateTime) return false;
            return isAfter(new Date(event.startDateTime), now);
        });
    }, [eventList, now]);

    const eventIds = React.useMemo(() => {
        return eventList.map(({ node: event }) => event.id);
    }, [eventList]);

    return {
        events: eventList,
        currentEvents,
        upcomingEvents,
        eventIds,
        connections: events?.__id ? [events.__id] : [],
    };
}
