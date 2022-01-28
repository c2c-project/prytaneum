import * as React from 'react';
import { graphql, useSubscription } from 'react-relay';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useEnqueuedPushSubscription } from '@local/__generated__/useEnqueuedPushSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';

export const USE_ENQUEUED_PUSH_SUBSCRIPTION = graphql`
    subscription useEnqueuedPushSubscription($eventId: ID!, $connections: [ID!]!) {
        enqueuedPushQuestion(eventId: $eventId) {
            edge @appendEdge(connections: $connections) {
                node {
                    id
                    ...QuestionAuthorFragment
                    ...QuestionStatsFragment
                    ...QuestionContentFragment
                    position
                }
                cursor
            }
        }
    }
`;

export function useEnqueuedPush({ connection }: { connection: string }) {
    const { eventId } = useEvent();
    const enqueuedPushConfig = React.useMemo<GraphQLSubscriptionConfig<useEnqueuedPushSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: [connection],
            },
            subscription: USE_ENQUEUED_PUSH_SUBSCRIPTION,
        }),
        [eventId, connection]
    );

    useSubscription(enqueuedPushConfig);
}
