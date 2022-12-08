import { useMemo } from 'react';
import { useSubscription, graphql } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useEventCreatedSubscription } from '@local/__generated__/useEventCreatedSubscription.graphql';

const USE_EVENT_CREATED_SUBSCRIPTION = graphql`
    subscription useEventCreatedSubscription($userId: ID!, $connections: [ID!]!) {
        eventCreated(userId: $userId) {
            edge @prependEdge(connections: $connections) {
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

export function useEventCreated(userId: string, connections: string[]) {
    const createdConfig = useMemo<GraphQLSubscriptionConfig<useEventCreatedSubscription>>(
        () => ({
            variables: {
                userId,
                connections,
            },
            subscription: USE_EVENT_CREATED_SUBSCRIPTION,
        }),
        [userId, connections]
    );

    useSubscription<useEventCreatedSubscription>(createdConfig);
}
