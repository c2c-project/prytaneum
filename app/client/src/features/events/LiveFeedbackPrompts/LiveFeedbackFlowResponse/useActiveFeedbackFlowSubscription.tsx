// useActiveFeedbackFlowSubscription.tsx (Conceptual)
import * as React from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { graphql, useSubscription } from 'react-relay';
import { useSnackbar, OptionsObject, SnackbarKey } from 'notistack';
import { Box, Button, IconButton } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CloseIcon from '@mui/icons-material/Close';

import { useEvent } from '@local/features/events';
import type { Prompt as SinglePromptType } from '../useLiveFeedbackPrompt';
import type { useActiveFeedbackFlowSubscription } from '@local/__generated__/useActiveFeedbackFlowSubscription.graphql';

const ACTIVE_FEEDBACK_FLOW_SUBSCRIPTION = graphql`
    subscription useActiveFeedbackFlowSubscription($eventId: ID!) {
        feedbackFlowPrompted(eventId: $eventId) {
            node {
                id # FeedbackFlow ID
                flowName
                flowDescription
                prompts {
                    id # FeedbackFlowPrompt ID
                    order
                    prompt {
                        id # Prompt ID
                        prompt
                        isVote
                        isOpenEnded
                        isMultipleChoice
                        multipleChoiceOptions
                        isDraft
                        reasoningType
                    }
                }
            }
        }
    }
`;

type FeedbackFlowPrompt = SinglePromptType & { orderInFlow: number };

export interface ActiveFlow {
    readonly id: string;
    readonly flowName: string | null;
    readonly flowDescription: string | null;
    readonly prompts: ReadonlyArray<FeedbackFlowPrompt>;
}

interface UseActiveFeedbackFlowProps {
    onFlowPrompted: (flow: ActiveFlow) => void;
}

export function useActiveFeedbackFlow({ onFlowPrompted }: UseActiveFeedbackFlowProps) {
    const { eventId } = useEvent();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const activeFlowQueue = React.useRef<ActiveFlow[]>([]);

    const showNextFlowInQueue = React.useCallback(() => {
        if (activeFlowQueue.current.length > 0) {
            const nextFlow = activeFlowQueue.current.shift();
            if (nextFlow) {
                onFlowPrompted(nextFlow);
            }
        }
    }, [onFlowPrompted]);

    const flowAction = React.useCallback(
        (key: SnackbarKey) => (
            <Box>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        showNextFlowInQueue();
                        closeSnackbar(key);
                    }}
                    startIcon={<QuestionAnswerIcon />}
                    size='small'
                >
                    Respond to Survey
                </Button>
                <IconButton
                    onClick={() => {
                        activeFlowQueue.current.shift();
                        closeSnackbar(key);
                    }}
                    size='small'
                    sx={{ ml: 1 }}
                >
                    <CloseIcon fontSize='small' />
                </IconButton>
            </Box>
        ),
        [closeSnackbar, showNextFlowInQueue]
    );

    const displayFlowSnack = React.useCallback(
        (flowName: string | null, options?: OptionsObject) => {
            enqueueSnackbar(`New Survey available: ${flowName || 'Untitled Survey'}`, {
                variant: options?.variant || 'info',
                action: (key) => options?.action || flowAction(key),
                persist: true, // Keep it until user interacts
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                ...options,
            });
        },
        [enqueueSnackbar, flowAction]
    );

    const config = React.useMemo<GraphQLSubscriptionConfig<useActiveFeedbackFlowSubscription>>(
        () => ({
            variables: { eventId },
            subscription: ACTIVE_FEEDBACK_FLOW_SUBSCRIPTION,
            onNext: (data) => {
                if (!data || !data.feedbackFlowPrompted) return;

                const flowPayload = data.feedbackFlowPrompted.node;

                // Transform payload prompts to ensure they have orderInFlow
                const transformedPrompts = (flowPayload.prompts || [])
                    .map((_prompt, index) => ({
                        id: _prompt.id,
                        prompt: _prompt.prompt.prompt,
                        isVote: !!_prompt.prompt.isVote,
                        isOpenEnded: !!_prompt.prompt.isOpenEnded,
                        isMultipleChoice: !!_prompt.prompt.isMultipleChoice,
                        multipleChoiceOptions: (_prompt.prompt.multipleChoiceOptions as Array<string>) || [],
                        reasoningType: _prompt.prompt.reasoningType || 'optional',
                        orderInFlow: _prompt.order ?? index,
                    }))
                    .sort((a, b) => a.orderInFlow - b.orderInFlow); // Sort by order

                const newFlow: ActiveFlow = {
                    id: flowPayload.id,
                    flowName: flowPayload.flowName,
                    flowDescription: flowPayload.flowDescription,
                    prompts: transformedPrompts,
                };

                activeFlowQueue.current.push(newFlow);
                displayFlowSnack(newFlow.flowName);
            },
            onError: (error: Error) => {
                console.error('Error in survey subscription:', error);
            },
        }),
        [eventId, displayFlowSnack]
    );

    useSubscription<useActiveFeedbackFlowSubscription>(config);

    return {};
}
