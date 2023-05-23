import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useViewerOnlyQuestionUpdatedSubscription } from '@local/__generated__/useViewerOnlyQuestionUpdatedSubscription.graphql';
import { useEvent } from '../../useEvent';

export const USE_VIEWER_ONLY_QUESTION_UPDATED_SUBSCRIPTION = graphql`
    subscription useViewerOnlyQuestionUpdatedSubscription($eventId: ID!, $viewerOnly: Boolean) {
        questionUpdated(eventId: $eventId, viewerOnly: $viewerOnly) {
            edge {
                cursor
                node {
                    id
                    position
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

export function useViewerOnlyQuestionUpdated() {
    const { eventId } = useEvent();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useViewerOnlyQuestionUpdatedSubscription>>(
        () => ({
            variables: {
                eventId,
                viewerOnly: true,
            },
            subscription: USE_VIEWER_ONLY_QUESTION_UPDATED_SUBSCRIPTION,
        }),
        [eventId]
    );

    useSubscription<useViewerOnlyQuestionUpdatedSubscription>(createdConfig);
}
