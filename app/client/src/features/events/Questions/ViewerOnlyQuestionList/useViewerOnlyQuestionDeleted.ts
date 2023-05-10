import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useViewerOnlyQuestionDeletedSubscription } from '@local/__generated__/useViewerOnlyQuestionDeletedSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';

export const USE_VIEWER_ONLY_QUESTION_DELETED_SUBSCRIPTION = graphql`
    subscription useViewerOnlyQuestionDeletedSubscription($eventId: ID!, $connections: [ID!]!, $viewerOnly: Boolean) {
        questionDeleted(eventId: $eventId, viewerOnly: $viewerOnly) {
            edge {
                cursor
                node {
                    id @deleteEdge(connections: $connections)
                    position
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

export function useViewerOnlyQuestionDeleted({ connections }: { connections: string[] }) {
    const { eventId } = useEvent();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useViewerOnlyQuestionDeletedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
                viewerOnly: true,
            },
            subscription: USE_VIEWER_ONLY_QUESTION_DELETED_SUBSCRIPTION,
        }),
        [eventId, connections]
    );

    useSubscription<useViewerOnlyQuestionDeletedSubscription>(createdConfig);
}
