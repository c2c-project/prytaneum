import * as React from 'react';
import { graphql, useSubscription } from 'react-relay';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useEnqueuedRemoveSubscription } from '@local/__generated__/useEnqueuedRemoveSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';

export const USE_ENQUEUED_REMOVE_SUBSCRIPTION = graphql`
    subscription useEnqueuedRemoveSubscription($eventId: ID!, $connections: [ID!]!) {
        enqueuedRemoveQuestion(eventId: $eventId) {
            edge {
                node {
                    id @deleteEdge(connections: $connections)
                }
            }
        }
    }
`;

export function useEnqueuedRemove({ connection }: { connection: string }) {
    const { eventId } = useEvent();
    const enqueuedRemoveConfig = React.useMemo<GraphQLSubscriptionConfig<useEnqueuedRemoveSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: [connection],
            },
            subscription: USE_ENQUEUED_REMOVE_SUBSCRIPTION,
        }),
        [eventId, connection]
    );

    useSubscription(enqueuedRemoveConfig);
}
