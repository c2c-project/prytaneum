import * as React from 'react';
import { graphql, useSubscription } from 'react-relay';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useEnqueuedUnshiftSubscription } from '@local/__generated__/useEnqueuedUnshiftSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';

export const USE_ENQUEUED_UNSHIFT_SUBSCRIPTION = graphql`
    subscription useEnqueuedUnshiftSubscription($eventId: ID!, $connections: [ID!]!) {
        enqueuedUnshiftQuestion(eventId: $eventId) {
            edge @prependEdge(connections: $connections) {
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

export function useEnqueuedUnshift({ connection }: { connection: string }) {
    const { eventId } = useEvent();

    const enqueuedUnshiftConfig = React.useMemo<GraphQLSubscriptionConfig<useEnqueuedUnshiftSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: [connection],
            },
            subscription: USE_ENQUEUED_UNSHIFT_SUBSCRIPTION,
        }),
        [connection, eventId]
    );
    useSubscription(enqueuedUnshiftConfig);
}
