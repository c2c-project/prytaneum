import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useViewerOnlyQuestionCreatedSubscription } from '@local/__generated__/useViewerOnlyQuestionCreatedSubscription.graphql';
import { useEvent } from '../../useEvent';

export const USE_VIEWER_ONLY_CREATED_SUBSCRIPTION = graphql`
    subscription useViewerOnlyQuestionCreatedSubscription($eventId: ID!, $connections: [ID!]!, $viewerOnly: Boolean) {
        questionCreated(eventId: $eventId, viewerOnly: $viewerOnly) {
            edge @prependEdge(connections: $connections) {
                cursor
                node {
                    id
                    position
                    isVisible
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment
                    ...QuestionStatsFragment
                    refQuestion {
                        ...QuestionQuoteFragment
                    }
                }
            }
        }
    }
`;

export function useViewerOnlyQuestionCreated({ connections }: { connections: string[] }) {
    const { eventId } = useEvent();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useViewerOnlyQuestionCreatedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
                viewerOnly: true,
            },
            subscription: USE_VIEWER_ONLY_CREATED_SUBSCRIPTION,
        }),
        [eventId, connections]
    );

    useSubscription<useViewerOnlyQuestionCreatedSubscription>(createdConfig);
}
