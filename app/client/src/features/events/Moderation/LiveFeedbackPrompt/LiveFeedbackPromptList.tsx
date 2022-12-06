import * as React from 'react';
import { graphql, PreloadedQuery, useQueryLoader, usePreloadedQuery, fetchQuery } from 'react-relay';
import { List, ListItem, Card, CardContent, Typography, Grid, IconButton, Modal, Box } from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';

import { LiveFeedbackPromptListQuery } from '@local/__generated__/LiveFeedbackPromptListQuery.graphql';
import { useEvent } from '@local/features/events/useEvent';
import { ConditionalRender } from '@local/components';
import { Loader } from '@local/components/Loader';
import { PreloadedLiveFeedbackPromptResponseList } from '../LiveFeedbackPromptResponses/LiveFeedbackPromptResponseList';
import { useEnvironment } from '@local/core';

export const LIVE_FEEDBACK_PROMPT_LIST_QUERY = graphql`
    query LiveFeedbackPromptListQuery($eventId: ID!) {
        prompts(eventId: $eventId) {
            id
            prompt
            isVote
            isOpenEnded
            createdAt
        }
    }
`;

export type Prompt = {
    readonly id: string;
    readonly prompt: string;
    readonly isVote: boolean | null;
    readonly isOpenEnded: boolean | null;
    readonly createdAt: Date | null;
};

interface PromptListProps {
    prompts: readonly Prompt[];
    handleClick: (prompt: Prompt) => void;
}

/**
 * This component is responsible for rendering the live feedback prompts using the provided fragment Ref
 */
function PromptList({ prompts, handleClick }: PromptListProps) {
    return (
        <List id='live-feedback-prompt-list'>
            {prompts.map((prompt) => (
                <ListItem key={prompt.id} style={{ paddingBottom: '.5rem', paddingTop: '.5rem' }}>
                    <Grid container direction='column' alignContent='center' spacing={1}>
                        <Card>
                            <CardContent>
                                <Grid container direction='row' alignItems='center' justifyContent='space-around'>
                                    <Grid item>
                                        <Typography variant='inherit' sx={{ wordBreak: 'break-word' }}>
                                            {prompt.prompt}
                                        </Typography>
                                    </Grid>
                                    <Grid item paddingRight={0.5}>
                                        <IconButton onClick={() => handleClick(prompt)}>
                                            <OpenInNewIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </ListItem>
            ))}
        </List>
    );
}

interface LiveFeedbackPromptListProps {
    queryRef: PreloadedQuery<LiveFeedbackPromptListQuery>;
    responsesModalStatusRef: React.MutableRefObject<boolean>;
}

/**
 * This component is responsible for loading the query and passing the fragment ref to the PromptList component
 */
function LiveFeedbackPromptList({ queryRef, responsesModalStatusRef }: LiveFeedbackPromptListProps) {
    const { prompts } = usePreloadedQuery(LIVE_FEEDBACK_PROMPT_LIST_QUERY, queryRef);
    const [open, setOpen] = React.useState(false);
    const selectedPromptRef = React.useRef<Prompt | null>(null);

    const handleOpen = () => {
        setOpen(true);
        responsesModalStatusRef.current = true;
    };
    const handleClose = () => {
        setOpen(false);
        responsesModalStatusRef.current = false;
    };

    const handlePromptClick = (prompt: Prompt) => {
        // Update the selected prompt ref
        selectedPromptRef.current = prompt;
        // Open the modal
        handleOpen();
    };

    const PromptResponseList = () => {
        if (selectedPromptRef.current) {
            return (
                <ConditionalRender client>
                    <React.Suspense fallback={<Loader />}>
                        <PreloadedLiveFeedbackPromptResponseList prompt={selectedPromptRef.current} />
                    </React.Suspense>
                </ConditionalRender>
            );
        }
        return <></>;
    };

    return (
        <React.Fragment>
            {!prompts ? <Loader /> : <PromptList prompts={prompts} handleClick={handlePromptClick} />}
            <Modal
                open={open}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClose={handleClose}
                aria-labelledby='feedback-responses-modal'
            >
                <Box
                    id='feedback-responses-modal-box'
                    sx={{
                        width: '85vw',
                        height: '85vh',
                        maxWidth: '1120px',
                        maxHeight: '630px',
                        bgcolor: 'background.paper',
                        overflow: 'scroll',
                    }}
                >
                    <Grid container direction='column' alignItems='center' alignContent='center'>
                        <Typography className='modal-title' variant='h5' paddingTop='1.5rem'>
                            Feedback Responses
                        </Typography>
                        <PromptResponseList />
                    </Grid>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

/**
 * This component is used to create the query for the LiveFeedbackPromptList
 */
export function PreloadedLiveFeedbackPromptList() {
    const [queryRef, loadQuery, disposeQuery] = useQueryLoader<LiveFeedbackPromptListQuery>(
        LIVE_FEEDBACK_PROMPT_LIST_QUERY
    );
    const { eventId } = useEvent();
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const responsesModalStatusRef = React.useRef<boolean>(false);
    const { env } = useEnvironment();
    const REFETCH_INTERVAL = 20000; // 20 seconds

    const refresh = React.useCallback(() => {
        if (isRefreshing || responsesModalStatusRef.current) return;
        setIsRefreshing(true);
        fetchQuery(env, LIVE_FEEDBACK_PROMPT_LIST_QUERY, { eventId }).subscribe({
            complete: () => {
                setIsRefreshing(false);
                loadQuery({ eventId }, { fetchPolicy: 'store-or-network' });
            },
            error: () => {
                setIsRefreshing(false);
            },
        });
    }, [env, eventId, isRefreshing, loadQuery]);

    React.useEffect(() => {
        // Fetch data from store and network on initial load
        // This Ensures any cached data is displayed right away but will still be kept up to date
        if (!queryRef) loadQuery({ eventId }, { fetchPolicy: 'store-and-network' });
        const interval = setInterval(refresh, REFETCH_INTERVAL);
        return () => clearInterval(interval);
    }, [eventId, loadQuery, queryRef, refresh]);

    React.useEffect(() => {
        // Cleanup query on component unmount
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!queryRef) return <Loader />;
    return <LiveFeedbackPromptList queryRef={queryRef} responsesModalStatusRef={responsesModalStatusRef} />;
}
