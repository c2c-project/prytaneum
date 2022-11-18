import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useBroadcastMessageCreatedSubscription } from '@local/__generated__/useBroadcastMessageCreatedSubscription.graphql';
import { useEvent } from '../../useEvent';

export const USE_BROADCAST_MESSAGE_CREATED_SUBSCRIPTION = graphql`
    subscription useBroadcastMessageCreatedSubscription($eventId: ID!, $connections: [ID!]!) {
        broadcastMessageCreated(eventId: $eventId) {
            edge @prependEdge(connections: $connections) {
                cursor
                node {
                    id
                    position
                    isVisible
                    ...BroadcastMessageAuthorFragment
                    ...BroadcastMessageContentFragment
                }
            }
        }
    }
`;

export function useBroadcastMessageCreated({ connections }: { connections: string[] }) {
    const { eventId } = useEvent();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useBroadcastMessageCreatedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
            },
            subscription: USE_BROADCAST_MESSAGE_CREATED_SUBSCRIPTION,
        }),
        [eventId, connections]
    );

    useSubscription<useBroadcastMessageCreatedSubscription>(createdConfig);
}
