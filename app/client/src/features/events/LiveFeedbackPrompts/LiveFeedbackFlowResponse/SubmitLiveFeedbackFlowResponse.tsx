// SubmitLiveFeedbackFlowResponse.tsx
import * as React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Button,
    Box,
    Typography,
    CircularProgress,
    Stepper,
    Step,
    StepLabel,
    MobileStepper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMutation, graphql } from 'react-relay';

import {
    LiveFeedbackPromptResponseForm,
    TLiveFeedbackPromptResponseFormState,
} from '../LiveFeedbackPromptResponse/LiveFeedbackPromptResponseForm';
import type { Prompt as SinglePromptType } from '../useLiveFeedbackPrompt';
import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import { useActiveFeedbackFlow, ActiveFlow } from './useActiveFeedbackFlowSubscription';
import { SubmitLiveFeedbackFlowResponseMutation } from '@local/__generated__/SubmitLiveFeedbackFlowResponseMutation.graphql';

export interface FlowPrompt extends SinglePromptType {
    orderInFlow: number;
}

const SUBMIT_FEEDBACK_FLOW_RESPONSES_MUTATION = graphql`
    mutation SubmitLiveFeedbackFlowResponseMutation($input: CreateFeedbackPromptFlowResponseInput!) {
        createFeedbackPromptFlowResponse(input: $input) {
            isError
            message
            body
        }
    }
`;

interface SubmitLiveFeedbackFlowResponseProps {}

export function SubmitLiveFeedbackFlowResponse({}: SubmitLiveFeedbackFlowResponseProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentFlow, setCurrentFlow] = React.useState<ActiveFlow | null>(null);
    const [currentPromptIndex, setCurrentPromptIndex] = React.useState(0);
    const [collectedResponses, setCollectedResponses] = React.useState<TLiveFeedbackPromptResponseFormState[]>([]);
    const [isPromptFormValid, setIsPromptFormValid] = React.useState<boolean>(false); // Track form validity

    const [commitFlowResponses, isSubmittingFlow] = useMutation<SubmitLiveFeedbackFlowResponseMutation>(
        SUBMIT_FEEDBACK_FLOW_RESPONSES_MUTATION
    );

    const handlePresentFlow = React.useCallback((flow: ActiveFlow) => {
        setCurrentFlow(flow);
        setCurrentPromptIndex(0);
        setCollectedResponses(new Array(flow.prompts.length).fill(null)); // Initialize responses array
        setIsOpen(true);
    }, []);

    useActiveFeedbackFlow({ onFlowPrompted: handlePresentFlow });

    const activePrompt = currentFlow?.prompts[currentPromptIndex];
    const currentPromptRef = React.useRef<SinglePromptType | null>(null);
    React.useEffect(() => {
        if (activePrompt) {
            currentPromptRef.current = activePrompt;
        }
    }, [activePrompt]);

    const handleCloseDialog = () => {
        setIsOpen(false);
        setCurrentFlow(null);
        setCurrentPromptIndex(0);
        setCollectedResponses([]);
    };

    const handleFormUpdate = React.useCallback(
        (formState: TLiveFeedbackPromptResponseFormState, promptIndex: number) => {
            setCollectedResponses((prevResponses) => {
                const newResponses = [...prevResponses];
                newResponses[promptIndex] = formState;
                return newResponses;
            });
        },
        []
    );

    const handleIndividualPromptSubmit = React.useCallback(() => {
        if (currentFlow && currentPromptIndex < currentFlow.prompts.length - 1) {
            setCurrentPromptIndex(currentPromptIndex + 1);
        } else {
            displaySnack('All prompts answered. Ready to submit flow.', { variant: 'info' });
        }
    }, [currentFlow, currentPromptIndex, displaySnack]);

    const handleNext = React.useCallback(() => {
        if (currentFlow && currentPromptIndex < currentFlow.prompts.length - 1) {
            if (!collectedResponses[currentPromptIndex]) {
                displaySnack('Please respond to the current prompt before moving to the next.', { variant: 'warning' });
                return;
            }
            setCurrentPromptIndex((prevActiveStep) => prevActiveStep + 1);
        }
    }, [currentFlow, currentPromptIndex, collectedResponses, displaySnack]);

    const handleBack = React.useCallback(() => {
        if (currentPromptIndex > 0) {
            setCurrentPromptIndex((prevActiveStep) => prevActiveStep - 1);
        } else {
            displaySnack('You are already at the first prompt.', { variant: 'info' });
        }
    }, [currentPromptIndex, displaySnack]);

    const handleSubmitEntireFlow = () => {
        if (!currentFlow || collectedResponses.some((r) => r === null)) {
            displaySnack('Please answer all prompts before submitting the flow.', { variant: 'error' });
            return;
        }

        const validResponses = collectedResponses.filter(Boolean) as TLiveFeedbackPromptResponseFormState[];

        if (validResponses.length !== currentFlow.prompts.length) {
            displaySnack('Not all prompts have been answered.', { variant: 'error' });
            return;
        }

        commitFlowResponses({
            variables: {
                input: {
                    eventId,
                    flowId: currentFlow.id,
                    responses: validResponses.map((response) => ({
                        eventId,
                        multipleChoiceResponse: response.multipleChoiceResponse,
                        promptId: response.promptId,
                        response: response.response,
                        vote: response.vote,
                    })),
                },
            },
            onCompleted: (response, errors) => {
                if (errors) {
                    displaySnack(`Error submitting flow responses: ${errors[0].message}`, { variant: 'error' });
                    return;
                }
                const hasErrors = response.createFeedbackPromptFlowResponse.isError;
                const errorMessage = response.createFeedbackPromptFlowResponse.message;
                if (hasErrors) {
                    displaySnack(errorMessage, { variant: 'error' });
                } else {
                    displaySnack('Feedback flow responses submitted successfully!', { variant: 'success' });
                }
                handleCloseDialog();
            },
            onError: (err) => {
                displaySnack(`Network error: ${err.message}`, { variant: 'error' });
            },
        });
    };

    if (!isOpen || !currentFlow || !activePrompt || !currentPromptRef.current) {
        return null;
    }

    const isLastPrompt = currentPromptIndex === currentFlow.prompts.length - 1;

    return (
        <Dialog
            open={isOpen}
            onClose={handleCloseDialog}
            fullScreen={isMobile}
            maxWidth='md'
            fullWidth
            PaperProps={{ sx: { height: '100%' } }}
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {currentFlow.flowName || 'Feedback Flow'}
                <IconButton aria-label='close' onClick={handleCloseDialog} sx={{ color: theme.palette.grey[500] }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box>
                    <Typography variant='caption' color='textSecondary'>
                        {currentFlow.flowDescription || 'No description provided for this flow.'}
                    </Typography>
                </Box>
                <Stepper activeStep={currentPromptIndex} alternativeLabel={!isMobile} sx={{ mb: 3 }}>
                    {currentFlow.prompts.map((prompt, index) => (
                        <Step key={prompt.id}>
                            <StepLabel>
                                {isMobile ? `Prompt ${index + 1}` : prompt.prompt.substring(0, 20) + '...'}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ minHeight: '300px' }}>
                    {currentFlow.prompts.map((prompt, index) => (
                        <Box
                            key={prompt.id} // Key for the wrapper div
                            style={{ display: index === currentPromptIndex ? 'block' : 'none' }}
                        >
                            <LiveFeedbackPromptResponseForm
                                prompt={prompt}
                                onSubmit={handleIndividualPromptSubmit}
                                isFlow={true}
                                isLastFlowPrompt={index === currentFlow.prompts.length - 1}
                                initialState={collectedResponses[currentPromptIndex] || undefined}
                                promptIndex={currentPromptIndex}
                                onFormUpdate={handleFormUpdate}
                                onValidityChange={(isValid) => {
                                    setIsPromptFormValid(isValid);
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </DialogContent>
            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                {isMobile ? (
                    <MobileStepper
                        variant='progress'
                        steps={currentFlow.prompts.length}
                        position='static'
                        activeStep={currentPromptIndex}
                        sx={{ flexGrow: 1 }}
                        nextButton={
                            isLastPrompt ? (
                                <Button
                                    size='small'
                                    onClick={handleSubmitEntireFlow}
                                    disabled={isSubmittingFlow || !collectedResponses[currentPromptIndex]}
                                >
                                    Submit Flow
                                    {isSubmittingFlow && <CircularProgress size={18} sx={{ ml: 1 }} />}
                                </Button>
                            ) : (
                                <Button
                                    size='small'
                                    onClick={handleNext}
                                    disabled={!collectedResponses[currentPromptIndex]}
                                >
                                    Next
                                    <KeyboardArrowRight />
                                </Button>
                            )
                        }
                        backButton={
                            <Button size='small' onClick={handleBack} disabled={currentPromptIndex === 0}>
                                <KeyboardArrowLeft />
                                Back
                            </Button>
                        }
                    />
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleBack} disabled={currentPromptIndex === 0 || isSubmittingFlow}>
                            Previous Prompt
                        </Button>
                        <Button
                            variant='contained'
                            onClick={handleSubmitEntireFlow}
                            disabled={isSubmittingFlow || !isPromptFormValid || !isLastPrompt}
                        >
                            Submit All Responses
                            {isSubmittingFlow && <CircularProgress size={24} sx={{ ml: 1 }} />}
                        </Button>
                    </Box>
                )}
            </Box>
        </Dialog>
    );
}
