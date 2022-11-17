import * as React from 'react';
import { graphql, useSubscription } from 'react-relay';
import { useLiveFeedbackPromptSubscription } from '@local/__generated__/useLiveFeedbackPromptSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useLiveFeedbackPromptResponseSnack } from './LiveFeedbackPromptResponse/useLiveFeedbackPromptResponseSnack';

export const USE_LIVE_FEEDBACK_PROMPT_SUBSCRIPTION = graphql`
    subscription useLiveFeedbackPromptSubscription($eventId: ID!) {
        feedbackPrompted(eventId: $eventId) {
            id
            prompt
            isVote
            isOpenEnded
        }
    }
`;

export function useLiveFeedbackPrompt() {
    // const [user] = useUser();
    const { isModerator, eventId } = useEvent();

    // TODO: Open prompt response dialog
    const onClick = React.useCallback(() => {
        console.log('Clicked');
    }, []);

    const { displaySnack } = useLiveFeedbackPromptResponseSnack(onClick);

    const config = React.useMemo<GraphQLSubscriptionConfig<useLiveFeedbackPromptSubscription>>(
        () => ({
            variables: {
                eventId: eventId,
            },
            subscription: USE_LIVE_FEEDBACK_PROMPT_SUBSCRIPTION,
            onNext: (data) => {
                console.log(data?.feedbackPrompted);
                if (isModerator) console.log('Moderator received prompt');
                else console.log('Attendee received prompt');
                displaySnack('New Feedback Prompt', { variant: 'info' });
            },
        }),
        [displaySnack, eventId, isModerator]
    );

    useSubscription<useLiveFeedbackPromptSubscription>(config);
}
