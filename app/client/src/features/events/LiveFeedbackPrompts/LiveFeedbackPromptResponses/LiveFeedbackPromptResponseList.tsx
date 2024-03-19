import * as React from 'react';
import { graphql, useQueryLoader, PreloadedQuery, usePreloadedQuery, fetchQuery } from 'react-relay';
import { List, ListItem, Card, CardContent, Typography, Grid, Button } from '@mui/material';

import { Loader } from '@local/components';
import { LiveFeedbackPromptResponseListQuery } from '@local/__generated__/LiveFeedbackPromptResponseListQuery.graphql';
import { useEnvironment } from '@local/core';
import { Prompt } from '../LiveFeedbackPrompt/LiveFeedbackPromptList';
import { PromptResponseAuthorCardHeader } from './PromptResponseAuthorCardHeader';
import { VoteResponseChart } from '../LiveFeedbackPromptResponse/VoteResponseChart';
import { MultipleChoiceResponseChart } from '../LiveFeedbackPromptResponse';

export const LIVE_FEEDBACK_PROMPT_RESPONSE_LIST_QUERY = graphql`
    query LiveFeedbackPromptResponseListQuery($promptId: ID!) {
        promptResponses(promptId: $promptId) {
            id
            response
            vote
            multipleChoiceResponse
            createdAt
            createdBy {
                id
                firstName
                lastName
                avatar
            }
        }
    }
`;

export type PromptResponse = {
    readonly id: string;
    readonly response: string | null;
    readonly vote: string | null;
    readonly multipleChoiceResponse: string | null;
    readonly createdAt: Date | null;
    readonly createdBy: {
        readonly id: string;
        readonly firstName: string | null;
        readonly lastName: string | null;
        readonly avatar: string | null;
    } | null;
};

export type PromptData = {
    promptId: string;
    prompt: string;
    isVote: boolean;
    isOpenEnded: boolean;
    isMultipleChoice: boolean;
    multipleChoiceOptions: string[];
};

interface PromptListProps {
    promptResponses: readonly PromptResponse[];
    promptData: PromptData;
}

/**
 * This component is responsible for rendering the live feedback prompt responses list
 * TODO: Convert prompt responses to fragment rather than directly from query (Required for pagination)
 * TODO: Pagination support for prompt responses (Number of responses will be greater than number of prompts)
 * TODO: Infinite Scrolling support for prompt responses
 * TODO: Update pi chart to chart selection (Different ways to visualize data)
 * TODO: Add option to share prompt vote data with audience
 */
function PromptResponseList({ promptResponses, promptData }: PromptListProps) {
    const [chartVisiblity, setChartVisiblity] = React.useState<boolean>(false);
    const MAX_VISIBLE_RESPONSES = 50;

    const toggleChartVisiblity = () => {
        const updatedChartVisiblity = !chartVisiblity;
        setChartVisiblity(updatedChartVisiblity);
        localStorage.setItem('chartVisiblity', JSON.stringify(updatedChartVisiblity));
    };

    React.useEffect(() => {
        const result = localStorage.getItem('chartVisiblity');
        if (result !== null) {
            setChartVisiblity(JSON.parse(result));
        }
    }, []);

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

    const responses = React.useMemo(() => promptResponses.slice(0, MAX_VISIBLE_RESPONSES), [promptResponses]);

    const multipleChoiceResponses = React.useMemo(() => {
        return promptResponses.map((response) =>
            response.multipleChoiceResponse !== null ? response.multipleChoiceResponse : ''
        );
    }, [promptResponses]);

    const DisplayChart = () => {
        if (promptData.isVote)
            return zeroVotes ? (
                <Typography>No Votes To Display</Typography>
            ) : (
                <VoteResponseChart
                    votes={{ for: voteCount.for, against: voteCount.against, conflicted: voteCount.conflicted }}
                />
            );

        if (promptData.isMultipleChoice)
            return (
                <MultipleChoiceResponseChart
                    multipleChoiceOptions={promptData.multipleChoiceOptions}
                    responses={multipleChoiceResponses}
                />
            );
        return <React.Fragment />;
    };

    return (
        <React.Fragment>
            <Grid container justifyContent='center' paddingBottom='1rem'>
                {promptData.isVote || promptData.isMultipleChoice ? (
                    <Button onClick={toggleChartVisiblity}>{chartVisiblity ? 'Hide Chart' : 'Show Chart'}</Button>
                ) : (
                    <React.Fragment />
                )}
            </Grid>
            {chartVisiblity && <DisplayChart />}
            <List id='live-feedback-prompt-response-list'>
                {responses.map(({ id, response, vote, multipleChoiceResponse, createdAt, createdBy }) => (
                    <ListItem key={id} style={{ paddingBottom: '.5rem', paddingTop: '.5rem' }}>
                        <Grid
                            container
                            display='flex'
                            direction='column'
                            alignContent='center'
                            alignItems='stretch'
                            spacing={1}
                        >
                            <Card>
                                <PromptResponseAuthorCardHeader
                                    createdBy={createdBy}
                                    createdAt={createdAt}
                                    vote={vote}
                                    isVote={promptData.isVote}
                                />
                                <CardContent sx={{ margin: (theme) => theme.spacing(-2, 0, -1, 0) }}>
                                    {promptData.isMultipleChoice ? (
                                        <React.Fragment>
                                            <Typography variant='inherit' sx={{ wordBreak: 'break-word' }}>
                                                Choice: {multipleChoiceResponse}
                                            </Typography>
                                            <Typography variant='inherit' sx={{ wordBreak: 'break-word' }}>
                                                Reasoning: {response}
                                            </Typography>
                                        </React.Fragment>
                                    ) : (
                                        <Typography variant='inherit' sx={{ wordBreak: 'break-word' }}>
                                            {response}
                                        </Typography>
                                    )}
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
    prompt: Prompt;
}

export function PreloadedLiveFeedbackPromptResponseList({ prompt }: PreloadedLiveFeedbackPromptResponseListProps) {
    const [queryRef, loadQuery, disposeQuery] = useQueryLoader<LiveFeedbackPromptResponseListQuery>(
        LIVE_FEEDBACK_PROMPT_RESPONSE_LIST_QUERY
    );
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const { env } = useEnvironment();
    // const REFRESH_INTERVAL = 30000; // 30 seconds
    const promptData = {
        promptId: prompt.id,
        prompt: prompt.prompt,
        isVote: !!prompt.isVote,
        isOpenEnded: !!prompt.isOpenEnded,
        isMultipleChoice: !!prompt.isMultipleChoice,
        multipleChoiceOptions: prompt.multipleChoiceOptions ? [...prompt.multipleChoiceOptions] : [],
    };
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

    // TODO: Update to manual refresh button
    React.useEffect(() => {
        // Fetch data from store and network on initial load
        // This Ensures any cached data is displayed right away but will still be kept up to date
        if (!queryRef) loadQuery({ promptId }, { fetchPolicy: 'store-and-network' });
        // const interval = setInterval(refresh, REFRESH_INTERVAL);
        // return () => clearInterval(interval);
    }, [loadQuery, promptId, queryRef, refresh]);

    React.useEffect(() => {
        // Cleanup query on component unmount
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!queryRef) return <Loader />;
    return <LiveFeedbackPromptResponseList queryRef={queryRef} promptData={promptData} />;
}
