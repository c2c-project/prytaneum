import * as React from 'react';
import { graphql, usePaginationFragment } from 'react-relay';

import type { useDashboardEventsFragment$key } from '@local/__generated__/useDashboardEventsFragment.graphql';

export const USE_DASHBOARD_EVENTS_FRAGMENT = graphql`
    fragment useDashboardEventsFragment on User
    @refetchable(queryName: "dashboardEventsPagination")
    @argumentDefinitions(first: { type: "Int", defaultValue: 50 }, after: { type: "String", defaultValue: "" }) {
        events(first: $first, after: $after) @connection(key: "useDashboardEventsFragment_events") {
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
    const { data, refetch } = usePaginationFragment(USE_DASHBOARD_EVENTS_FRAGMENT, fragmentRef);
    const { events } = data;
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
        refetch,
    };
}
