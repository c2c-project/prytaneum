import * as React from 'react';
import { graphql, useSubscription } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

import { useEvent } from '@local/features/events/useEvent';
import { useLiveFeedbackPromptResultsSnack } from './useLiveFeedbackPromptResultsSnack';
import { useLiveFeedbackPromptResultsSharedSubscription } from '@local/__generated__/useLiveFeedbackPromptResultsSharedSubscription.graphql';

export const USE_LIVE_FEEDBACK_PROMPT_RESULTS_SHARED_SUBSCRIPTION = graphql`
    subscription useLiveFeedbackPromptResultsSharedSubscription($eventId: ID!) {
        feedbackPromptResultsShared(eventId: $eventId) {
            id
            prompt
        }
    }
`;

export interface Prompt {
    id: string;
    prompt: string;
}

export function useLiveFeedbackPromptResultsShared() {
    const { isModerator, eventId } = useEvent();

    const promptRef = React.useRef<Prompt>({ id: '', prompt: '' });

    const updateCurrentPrompt = ({ id, prompt }: Prompt) => {
        promptRef.current = { ...promptRef.current, id: id, prompt: prompt };
    };
    const { displaySnack } = useLiveFeedbackPromptResultsSnack(promptRef);

    const config = React.useMemo<GraphQLSubscriptionConfig<useLiveFeedbackPromptResultsSharedSubscription>>(
        () => ({
            variables: {
                eventId: eventId,
            },
            subscription: USE_LIVE_FEEDBACK_PROMPT_RESULTS_SHARED_SUBSCRIPTION,
            onNext: (data) => {
                if (!data) return;
                const { feedbackPromptResultsShared } = data;
                updateCurrentPrompt(feedbackPromptResultsShared);
                if (isModerator) console.log('Moderator received prompt');

                // TODO: add moderator check
                displaySnack('Feedback Prompt Results', { variant: 'info' });
            },
        }),
        [displaySnack, eventId, isModerator]
    );

    useSubscription<useLiveFeedbackPromptResultsSharedSubscription>(config);
}
