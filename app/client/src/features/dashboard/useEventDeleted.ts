import { useMemo } from 'react';
import { useSubscription, graphql } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useEventDeletedSubscription } from '@local/__generated__/useEventDeletedSubscription.graphql';

const USE_EVENT_DELETED_SUBSCRIPTION = graphql`
    subscription useEventDeletedSubscription($eventIds: [ID!]!, $connections: [ID!]!) {
        eventDeleted(eventIds: $eventIds) {
            edge {
                node {
                    id @deleteEdge(connections: $connections)
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

export function useEventDeleted(eventIds: string[], connections: string[]) {
    const createdConfig = useMemo<GraphQLSubscriptionConfig<useEventDeletedSubscription>>(
        () => ({
            variables: {
                eventIds,
                connections,
            },
            subscription: USE_EVENT_DELETED_SUBSCRIPTION,
        }),
        [eventIds, connections]
    );

    useSubscription<useEventDeletedSubscription>(createdConfig);
}
