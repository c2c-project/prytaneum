import * as React from 'react';
import { graphql } from 'relay-runtime';
import { useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Button, DialogContent, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';

import { Prompt } from './useLiveFeedbackPromptResultsShared';
import { ConditionalRender, Loader, StyledDialog, StyledDialogTitle } from '@local/components';
import { ViewLiveFeedbackPromptResultsQuery } from '@local/__generated__/ViewLiveFeedbackPromptResultsQuery.graphql';
import { VoteResponseChart } from '../LiveFeedbackPromptResponse/VoteResponseChart';
import { MultipleChoiceResponseChart } from '../LiveFeedbackPromptResponse';

const VIEW_LIVE_FEEDBACK_PROMPT_RESULTS = graphql`
    query ViewLiveFeedbackPromptResultsQuery($promptId: ID!) {
        promptResponseVotes(promptId: $promptId) {
            for
            against
            conflicted
        }
        promptResponses(promptId: $promptId) {
            id
            response
            vote
            multipleChoiceResponse
        }
        prompt(promptId: $promptId) {
            prompt
            isVote
            isOpenEnded
            isMultipleChoice
            multipleChoiceOptions
        }
    }
`;

interface ResultsProps {
    promptResponseVotes: {
        readonly for: number;
        readonly against: number;
        readonly conflicted: number;
    };
    promptResponses: readonly {
        readonly id: string;
        readonly multipleChoiceResponse: string | null;
        readonly response: string | null;
        readonly vote: string | null;
    }[];
    prompt: {
        readonly isOpenEnded: boolean | null;
        readonly isVote: boolean | null;
        readonly isMultipleChoice: boolean | null;
        readonly multipleChoiceOptions: readonly string[] | null;
        readonly prompt: string;
    };
}

function Results({ promptResponseVotes, promptResponses, prompt }: ResultsProps) {
    const { for: forVotes, against: againstVotes, conflicted: conflictedVotes } = promptResponseVotes;

    const zeroVotes = React.useMemo(() => {
        return forVotes === 0 && againstVotes === 0 && conflictedVotes === 0;
    }, [againstVotes, conflictedVotes, forVotes]);

    const multipleChoiceResponses = React.useMemo(() => {
        return promptResponses.map((response) =>
            response.multipleChoiceResponse !== null ? response.multipleChoiceResponse : ''
        );
    }, [promptResponses]);

    const multipleChoiceOptions = React.useMemo(() => {
        return prompt.multipleChoiceOptions ? [...prompt.multipleChoiceOptions] : [];
    }, [prompt.multipleChoiceOptions]);

    const DisplayChart = () => {
        if (prompt.isVote)
            return zeroVotes ? (
                <Typography>No Votes To Display</Typography>
            ) : (
                <VoteResponseChart votes={{ for: forVotes, against: againstVotes, conflicted: conflictedVotes }} />
            );

        if (prompt.isMultipleChoice)
            return (
                <MultipleChoiceResponseChart
                    multipleChoiceOptions={multipleChoiceOptions}
                    responses={multipleChoiceResponses}
                />
            );
        return <React.Fragment />;
    };

    return (
        <React.Fragment>
            <DisplayChart />
        </React.Fragment>
    );
}

interface LiveFeedbackPromptResultsProps {
    queryRef: PreloadedQuery<ViewLiveFeedbackPromptResultsQuery>;
}

function LiveFeedbackPromptResults({ queryRef }: LiveFeedbackPromptResultsProps) {
    const { promptResponseVotes, promptResponses, prompt } = usePreloadedQuery(
        VIEW_LIVE_FEEDBACK_PROMPT_RESULTS,
        queryRef
    );

    if (!promptResponseVotes || !promptResponses || !prompt) return <Loader />;
    return <Results promptResponseVotes={promptResponseVotes} promptResponses={promptResponses} prompt={prompt} />;
}

function PreloadedViewLiveFeedbackPromptResults({ promptId }: { promptId: string }) {
    const [queryRef, loadQuery, disposeQuery] = useQueryLoader<ViewLiveFeedbackPromptResultsQuery>(
        VIEW_LIVE_FEEDBACK_PROMPT_RESULTS
    );

    React.useEffect(() => {
        if (!queryRef) loadQuery({ promptId }, { fetchPolicy: 'network-only' });
    }, [queryRef, loadQuery, promptId]);

    React.useEffect(() => {
        return () => disposeQuery();
    }, [disposeQuery]);

    if (!queryRef) return <Loader />;
    return <LiveFeedbackPromptResults queryRef={queryRef} />;
}

interface ViewLiveFeedbackPromptResultsProps {
    promptRef: React.MutableRefObject<Prompt>;
    closeSnack: () => void;
}

export function ViewLiveFeedbackPromptResults({ promptRef, closeSnack }: ViewLiveFeedbackPromptResultsProps) {
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        closeSnack();
    };

    return (
        <React.Fragment>
            <Button variant='contained' color='primary' onClick={handleOpen}>
                View Results
            </Button>
            <StyledDialog
                fullScreen={fullscreen}
                maxWidth='lg'
                fullWidth={true}
                scroll='paper'
                open={open}
                onClose={handleClose}
                aria-labelledby='feedback-results-dialog'
            >
                <StyledDialogTitle id='feedback-results-dialog-title' onClose={handleClose}>
                    Feedback Results
                </StyledDialogTitle>
                <DialogContent dividers>
                    <Grid container direction='column' alignItems='center' alignContent='center'>
                        <Grid container padding='1rem'>
                            <Grid item xs>
                                <Typography
                                    className='modal-prompt'
                                    variant='h5'
                                    paddingY='1.5rem'
                                    style={{ overflowWrap: 'break-word' }}
                                >
                                    Prompt: {promptRef.current.prompt}
                                </Typography>
                            </Grid>
                        </Grid>
                        <ConditionalRender client>
                            <React.Suspense fallback={<Loader />}>
                                <PreloadedViewLiveFeedbackPromptResults promptId={promptRef.current.id} />
                            </React.Suspense>
                        </ConditionalRender>
                    </Grid>
                </DialogContent>
            </StyledDialog>
        </React.Fragment>
    );
}
