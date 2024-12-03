import { useMemo } from 'react';
import { useSubscription, graphql } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useEventUpdatesSubscription } from '@local/__generated__/useEventUpdatesSubscription.graphql';

const USE_EVENT_UPDATES_SUBSCRIPTION = graphql`
    subscription useEventUpdatesSubscription($userId: ID!) {
        eventUpdates(userId: $userId) {
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
`;

export function useEventUpdates(userId: string) {
    const createdConfig = useMemo<GraphQLSubscriptionConfig<useEventUpdatesSubscription>>(
        () => ({
            variables: {
                userId,
            },
            subscription: USE_EVENT_UPDATES_SUBSCRIPTION,
        }),
        [userId]
    );

    useSubscription<useEventUpdatesSubscription>(createdConfig);
}
