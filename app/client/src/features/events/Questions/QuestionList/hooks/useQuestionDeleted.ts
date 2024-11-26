import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useQuestionDeletedSubscription } from '@local/__generated__/useQuestionDeletedSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';

export const USE_QUESTION_DELETED_SUBSCRIPTION = graphql`
    subscription useQuestionDeletedSubscription($eventId: ID!, $connections: [ID!]!) {
        questionDeleted(eventId: $eventId) {
            edge {
                cursor
                node {
                    id @deleteEdge(connections: $connections)
                }
            }
        }
    }
`;

export function useQuestionDeleted({ connections }: { connections: string[] }) {
    const { eventId } = useEvent();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useQuestionDeletedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
            },
            subscription: USE_QUESTION_DELETED_SUBSCRIPTION,
        }),
        [eventId, connections]
    );

    useSubscription<useQuestionDeletedSubscription>(createdConfig);
}
