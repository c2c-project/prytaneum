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

export interface Prompt {
    id: string;
    prompt: string;
    isVote: boolean;
    isOpenEnded: boolean;
}

export function useLiveFeedbackPrompt() {
    const { isModerator, eventId } = useEvent();

    const promptRef = React.useRef<Prompt>({ id: '', prompt: '', isVote: false, isOpenEnded: false });

    const updateCurrentPrompt = ({ id, prompt, isVote, isOpenEnded }: Prompt) => {
        promptRef.current = { ...promptRef.current, id: id, prompt: prompt, isVote: isVote, isOpenEnded: isOpenEnded };
    };
    const { displaySnack } = useLiveFeedbackPromptResponseSnack(promptRef, eventId);

    const config = React.useMemo<GraphQLSubscriptionConfig<useLiveFeedbackPromptSubscription>>(
        () => ({
            variables: {
                eventId: eventId,
            },
            subscription: USE_LIVE_FEEDBACK_PROMPT_SUBSCRIPTION,
            onNext: (data) => {
                if (!data) return;
                const { feedbackPrompted } = data;
                const { id, prompt, isVote, isOpenEnded } = feedbackPrompted;
                updateCurrentPrompt({ id, prompt, isVote: !!isVote, isOpenEnded: !!isOpenEnded });
                if (isModerator) console.log('Moderator received prompt');

                // TODO: add moderator check
                displaySnack('New Feedback Prompt', { variant: 'info' });
            },
        }),
        [displaySnack, eventId, isModerator]
    );

    useSubscription<useLiveFeedbackPromptSubscription>(config);
}
