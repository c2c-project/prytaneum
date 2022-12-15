import * as React from 'react';
import { graphql } from 'relay-runtime';
import { useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Button, DialogContent, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';

import { Prompt } from './useLiveFeedbackPromptResultsShared';
import { ConditionalRender, Loader, StyledDialog, StyledDialogTitle } from '@local/components';
import { ViewLiveFeedbackPromptResultsQuery } from '@local/__generated__/ViewLiveFeedbackPromptResultsQuery.graphql';
import { VoteResponseChart } from '../LiveFeedbackPromptResponse/VoteResponseChart';

const VIEW_LIVE_FEEDBACK_PROMPT_RESULTS = graphql`
    query ViewLiveFeedbackPromptResultsQuery($promptId: ID!) {
        promptResponseVotes(promptId: $promptId) {
            for
            against
            conflicted
        }
    }
`;

interface ResultsProps {
    promptResponseVotes: {
        readonly for: number;
        readonly against: number;
        readonly conflicted: number;
    };
}

function Results({ promptResponseVotes }: ResultsProps) {
    const { for: forVotes, against: againstVotes, conflicted: conflictedVotes } = promptResponseVotes;

    const zeroVotes = React.useMemo(() => {
        return forVotes === 0 && againstVotes === 0 && conflictedVotes === 0;
    }, [againstVotes, conflictedVotes, forVotes]);

    return (
        <React.Fragment>
            {zeroVotes ? (
                <div>No Votes To Display</div>
            ) : (
                <VoteResponseChart votes={{ for: forVotes, against: againstVotes, conflicted: conflictedVotes }} />
            )}
        </React.Fragment>
    );
}

interface LiveFeedbackPromptResultsProps {
    queryRef: PreloadedQuery<ViewLiveFeedbackPromptResultsQuery>;
}

function LiveFeedbackPromptResults({ queryRef }: LiveFeedbackPromptResultsProps) {
    const { promptResponseVotes } = usePreloadedQuery(VIEW_LIVE_FEEDBACK_PROMPT_RESULTS, queryRef);

    if (!promptResponseVotes) return <Loader />;
    return <Results promptResponseVotes={promptResponseVotes} />;
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
                    Feedback Result
                </StyledDialogTitle>
                <DialogContent dividers>
                    <Grid container direction='column' alignItems='center' alignContent='center'>
                        <Typography className='modal-prompt' variant='h5' paddingTop='1.5rem'>
                            {promptRef.current.prompt}
                        </Typography>
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
