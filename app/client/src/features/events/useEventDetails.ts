import * as React from 'react';
import { graphql, useRefetchableFragment } from 'react-relay';

import { useEventDetailsFragment$key } from '@local/__generated__/useEventDetailsFragment.graphql';
import { useRefresh } from '@local/features/core';

export const USE_EVENT_DETAILS_FRAGMENT = graphql`
    fragment useEventDetailsFragment on Event @refetchable(queryName: "UseEventDetailsRefetchQuery") {
        id
        title
        topic
        description
        startDateTime
        endDateTime
        isActive
        isViewerModerator
    }
`;

interface Props {
    fragmentRef: useEventDetailsFragment$key;
}

export function useEventDetails({ fragmentRef }: Props) {
    const [data, refetch] = useRefetchableFragment(USE_EVENT_DETAILS_FRAGMENT, fragmentRef);
    const [isLive, setIsLive] = React.useState(false);
    const { startDateTime, endDateTime } = data;

    const REFRESH_INTERVAL = 30000; // 30 seconds
    const refresh = React.useCallback(() => {
        refetch({}, { fetchPolicy: 'store-and-network' });
    }, [refetch]);

    useRefresh({ refreshInterval: REFRESH_INTERVAL, callback: refresh });

    React.useEffect(() => {
        if (!startDateTime || !endDateTime) return;
        const now = new Date();
        const start = new Date(startDateTime);
        const end = new Date(endDateTime);

        if (data.isActive) {
            setIsLive(true);
            return;
        }
        if (now >= start && now <= end) {
            setIsLive(true);
        } else {
            setIsLive(false);
        }
    }, [data.isActive, endDateTime, startDateTime]);

    return { eventData: data, isLive, setIsLive };
}
