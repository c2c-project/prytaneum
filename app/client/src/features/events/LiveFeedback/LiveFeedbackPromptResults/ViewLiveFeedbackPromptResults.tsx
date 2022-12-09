import * as React from 'react';
import { graphql } from 'relay-runtime';
import { useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';

import { Prompt } from './useLiveFeedbackPromptResultsShared';
import { ConditionalRender, Loader } from '@local/components';
import { ViewLiveFeedbackPromptResultsQuery } from '@local/__generated__/ViewLiveFeedbackPromptResultsQuery.graphql';
import Chart from 'react-google-charts';

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

    // Color association based on the vote value
    const getVoteColor = (vote: 'FOR' | 'AGAINST' | 'CONFLICTED') => {
        switch (vote) {
            case 'FOR':
                return 'green';
            case 'AGAINST':
                return 'red';
            case 'CONFLICTED':
                return 'orange';
            default:
                return 'black';
        }
    };
    const zeroVotes = React.useMemo(() => {
        return forVotes === 0 && againstVotes === 0 && conflictedVotes === 0;
    }, [againstVotes, conflictedVotes, forVotes]);

    return (
        <React.Fragment>
            {zeroVotes ? (
                <div>No Votes To Display</div>
            ) : (
                <Chart
                    chartType='PieChart'
                    data={[
                        ['Vote', 'Count'],
                        ['For', forVotes],
                        ['Against', againstVotes],
                        ['Conflicted', conflictedVotes],
                    ]}
                    options={{
                        title: 'Votes',
                        slices: {
                            0: { color: getVoteColor('FOR') },
                            1: { color: getVoteColor('AGAINST') },
                            2: { color: getVoteColor('CONFLICTED') },
                        },
                    }}
                    width='100%'
                    height='400px'
                />
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
            <Modal
                open={open}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClose={handleClose}
                aria-labelledby='view-feedback-prompt-results-modal'
            >
                <Box
                    id='view-feedback-prompt-results-box'
                    sx={{
                        width: '85vw',
                        height: '85vh',
                        maxWidth: '1280px',
                        maxHeight: '720px',
                        bgcolor: 'background.paper',
                        overflow: 'scroll',
                    }}
                >
                    <Grid container direction='column' alignItems='center' alignContent='center'>
                        <Typography className='modal-title' variant='h5' paddingTop='1.5rem'>
                            Feedback Result
                        </Typography>
                        <Typography className='modal-prompt' variant='h5' paddingTop='1.5rem'>
                            {promptRef.current.prompt}
                        </Typography>
                        <ConditionalRender client>
                            <React.Suspense fallback={<Loader />}>
                                <PreloadedViewLiveFeedbackPromptResults promptId={promptRef.current.id} />
                            </React.Suspense>
                        </ConditionalRender>
                    </Grid>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
