import * as React from 'react';
import { graphql, useQueryLoader, PreloadedQuery, usePreloadedQuery, fetchQuery } from 'react-relay';
import { List, ListItem, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { Chart } from 'react-google-charts';

import { ConditionalRender, Loader } from '@local/components';
import { LiveFeedbackPromptResponseListQuery } from '@local/__generated__/LiveFeedbackPromptResponseListQuery.graphql';
import { useEnvironment } from '@local/core';

export const LIVE_FEEDBACK_PROMPT_RESPONSE_LIST_QUERY = graphql`
    query LiveFeedbackPromptResponseListQuery($promptId: ID!) {
        promptResponses(promptId: $promptId) {
            id
            response
            vote
        }
    }
`;

type PromptResponse = {
    readonly id: string;
    readonly response: string | null;
    readonly vote: string | null;
};

export type PromptData = {
    promptId: string;
    prompt: string;
    isVote: boolean;
    isOpenEnded: boolean;
};

interface PromptListProps {
    promptResponses: readonly PromptResponse[];
    promptData: PromptData;
}

// TODO: Convert prompt responses to fragment rather than directly from query (Required for pagination)
// TODO: Pagination support for prompt responses (Number of responses will be greater than number of prompts)
// TODO: Infinite Scrolling support for prompt responses

/**
 * This component is responsible for rendering the live feedback prompt responses list
 */
// TODO: Update cards to include user data and createdAt timestamp
function PromptResponseList({ promptResponses, promptData }: PromptListProps) {
    const [chartVisiblity, setChartVisiblity] = React.useState<boolean>(false);

    const toggleChartVisiblity = () => setChartVisiblity(!chartVisiblity);

    // Color association based on the vote value
    const getVoteColor = (vote: PromptResponse['vote']) => {
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

    // Counts votes for each response categorized by vote type (For, Against, Conflicted)
    const voteCount = React.useMemo(() => {
        const forVotes = promptResponses.filter((response) => response.vote === 'FOR').length;
        const againstVotes = promptResponses.filter((response) => response.vote === 'AGAINST').length;
        const conflictedVotes = promptResponses.filter((response) => response.vote === 'CONFLICTED').length;
        return { for: forVotes, against: againstVotes, conflicted: conflictedVotes };
    }, [promptResponses]);

    const zeroVotes = React.useMemo(() => {
        return voteCount.for === 0 && voteCount.against === 0 && voteCount.conflicted === 0;
    }, [voteCount]);

    return (
        <React.Fragment>
            <Grid container justifyContent='center'>
                <Typography>Prompt: {promptData.prompt}</Typography>
            </Grid>
            <Grid container justifyContent='center'>
                {promptData.isVote ? (
                    <Button onClick={toggleChartVisiblity}>
                        {chartVisiblity ? 'Hide Pie Chart' : 'Show Pie Chart'}
                    </Button>
                ) : (
                    <></>
                )}
            </Grid>
            {chartVisiblity && (
                <>
                    {zeroVotes ? (
                        <div>No Votes Yet</div>
                    ) : (
                        <Chart
                            chartType='PieChart'
                            data={[
                                ['Vote', 'Count'],
                                ['For', voteCount.for],
                                ['Against', voteCount.against],
                                ['Conflicted', voteCount.conflicted],
                            ]}
                            options={{
                                title: 'Votes',
                            }}
                            width='100%'
                            height='400px'
                        />
                    )}
                </>
            )}
            <List id='live-feedback-prompt-response-list'>
                {promptResponses.map(({ id, response, vote }) => (
                    <ListItem key={id} style={{ paddingBottom: '.5rem', paddingTop: '.5rem' }}>
                        <Grid container direction='column' alignContent='center' spacing={1}>
                            <Card>
                                <CardContent>
                                    <Grid container direction='row' alignItems='center' justifyContent='space-around'>
                                        <Grid item>
                                            <Typography
                                                variant='inherit'
                                                sx={{ wordBreak: 'break-word' }}
                                                color={promptData.isVote ? getVoteColor(vote) : 'black'}
                                            >
                                                {response}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
}

interface LiveFeedbackPromptResponseListProps {
    queryRef: PreloadedQuery<LiveFeedbackPromptResponseListQuery>;
    promptData: PromptData;
}

/**
 * This component is responsible for loading the query and passing the fragment ref to the PromptList component
 */
export function LiveFeedbackPromptResponseList({ queryRef, promptData }: LiveFeedbackPromptResponseListProps) {
    const { promptResponses } = usePreloadedQuery(LIVE_FEEDBACK_PROMPT_RESPONSE_LIST_QUERY, queryRef);
    if (!promptResponses) return <Loader />;
    return <PromptResponseList promptResponses={promptResponses} promptData={promptData} />;
}

interface PreloadedLiveFeedbackPromptResponseListProps {
    promptData: PromptData;
}

export function PreloadedLiveFeedbackPromptResponseList({ promptData }: PreloadedLiveFeedbackPromptResponseListProps) {
    const [queryRef, loadQuery] = useQueryLoader<LiveFeedbackPromptResponseListQuery>(
        LIVE_FEEDBACK_PROMPT_RESPONSE_LIST_QUERY
    );
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const { env } = useEnvironment();
    const REFRESH_INTERVAL = 10000; // 10 seconds
    const { promptId } = promptData;

    const refresh = React.useCallback(() => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        fetchQuery(env, LIVE_FEEDBACK_PROMPT_RESPONSE_LIST_QUERY, { promptId }).subscribe({
            complete: () => {
                setIsRefreshing(false);
                loadQuery({ promptId }, { fetchPolicy: 'store-or-network' });
            },
            error: () => {
                setIsRefreshing(false);
            },
        });
    }, [env, isRefreshing, loadQuery, promptId]);

    React.useEffect(() => {
        if (!queryRef) loadQuery({ promptId });
        const interval = setInterval(refresh, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    if (!queryRef) return <Loader />;
    return (
        <ConditionalRender client>
            {/* Suspense workaround to avoid component flashing during refetch */}
            <React.Suspense fallback={<LiveFeedbackPromptResponseList queryRef={queryRef} promptData={promptData} />}>
                <LiveFeedbackPromptResponseList queryRef={queryRef} promptData={promptData} />
            </React.Suspense>
        </ConditionalRender>
    );
}
