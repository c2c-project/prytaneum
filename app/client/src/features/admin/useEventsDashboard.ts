import { useMemo, useCallback, useState } from 'react';
import { graphql, usePaginationFragment } from 'react-relay';

import type { useEventsDashboardFragment$key } from '@local/__generated__/useEventsDashboardFragment.graphql';
import type { EventsDashboardSearchFilter } from './EventsTable';

const USE_EVENTS_DASHBOARD_FRAGMENT = graphql`
    fragment useEventsDashboardFragment on User
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 200 }
        after: { type: "String", defaultValue: "" }
        filter: { type: "EventsSearchFilters", defaultValue: { eventName: "", orgName: "" } }
    )
    @refetchable(queryName: "EventsDashboardPaginationQuery") {
        allEvents(first: $first, after: $after, filter: $filter) @connection(key: "EventsDashboard_allEvents") {
            edges {
                node {
                    id
                    title
                    organization {
                        id
                        name
                    }
                    startDateTime
                    endDateTime
                }
            }
        }
    }
`;

interface UseEventsDashboardProps {
    fragmentRef: useEventsDashboardFragment$key;
}

export function useEventsDashboard({ fragmentRef }: UseEventsDashboardProps) {
    const { data, loadNext, loadPrevious, hasNext, isLoadingNext, refetch } = usePaginationFragment(
        USE_EVENTS_DASHBOARD_FRAGMENT,
        fragmentRef
    );
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refresh = useCallback(
        (filter: EventsDashboardSearchFilter) => {
            if (isRefreshing) return;
            setIsRefreshing(true);
            refetch({ filter });
            setIsRefreshing(false);
        },
        [isRefreshing, refetch]
    );

    const events = useMemo(() => {
        return data.allEvents?.edges?.map((edge) => edge?.node) ?? [];
    }, [data.allEvents?.edges]);

    return { events, loadNext, loadPrevious, hasNext, isLoadingNext, refresh };
}
