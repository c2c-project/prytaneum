import * as React from 'react';
import { graphql, PreloadedQuery, useQueryLoader, usePreloadedQuery } from 'react-relay';
import type { FragmentRefs } from 'relay-runtime';
import { List, ListItem, Card, CardContent, Typography, Grid, IconButton, Modal, Box } from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';

import type { useLiveFeedbackPromptsFragment$key } from '@local/__generated__/useLiveFeedbackPromptsFragment.graphql';
import { LiveFeedbackPromptListQuery } from '@local/__generated__/LiveFeedbackPromptListQuery.graphql';
import { useLiveFeedbackPrompts } from './useLiveFeedbackPrompts';
import { useEvent } from '@local/features/events/useEvent';
import { ConditionalRender } from '@local/components';
import { Loader } from '@local/components/Loader';
import { PreloadedLiveFeedbackPromptResponseList } from '../LiveFeedbackPromptResponses/LiveFeedbackPromptResponseList';

export const LIVE_FEEDBACK_PROMPT_LIST_QUERY = graphql`
    query LiveFeedbackPromptListQuery($eventId: ID!) {
        event(eventId: $eventId) {
            ...useLiveFeedbackPromptsFragment
        }
    }
`;

export type Prompt = {
    cursor: string;
    id: string;
    prompt: string;
    isVote: boolean | null;
    isOpenEnded: boolean | null;
    createdAt: Date | null;
    ' $fragmentSpreads': FragmentRefs<'useLiveFeedbackPromptResponsesFragment'>;
};

interface PromptListProps {
    fragmentRef: useLiveFeedbackPromptsFragment$key;
    handleClick: (prompt: Prompt) => void;
    modalIsOpen: boolean;
}

/**
 * This component is responsible for rendering the live feedback prompts using the provided fragment Ref
 */
function PromptList({ fragmentRef, handleClick, modalIsOpen }: PromptListProps) {
    const { prompts } = useLiveFeedbackPrompts({ fragmentRef, modalIsOpen });

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
}

/**
 * This component is responsible for loading the query and passing the fragment ref to the PromptList component
 */
function LiveFeedbackPromptList({ queryRef }: LiveFeedbackPromptListProps) {
    const { event } = usePreloadedQuery(LIVE_FEEDBACK_PROMPT_LIST_QUERY, queryRef);
    const [open, setOpen] = React.useState(false);
    const selectedPromptRef = React.useRef<Prompt | null>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlePromptClick = (prompt: Prompt) => {
        // Update the selected prompt ref
        selectedPromptRef.current = prompt;
        // Open the modal
        handleOpen();
    };

    if (!event) return <Loader />;
    return (
        <React.Fragment>
            <PromptList fragmentRef={event} handleClick={handlePromptClick} modalIsOpen={open} />
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
                        {selectedPromptRef.current && (
                            <PreloadedLiveFeedbackPromptResponseList prompt={selectedPromptRef.current} />
                        )}
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
    const [queryRef, loadQuery] = useQueryLoader<LiveFeedbackPromptListQuery>(LIVE_FEEDBACK_PROMPT_LIST_QUERY);
    const { eventId } = useEvent();

    React.useEffect(() => {
        if (!queryRef) loadQuery({ eventId }, { fetchPolicy: 'network-only' });
    }, []);

    if (!queryRef) return <Loader />;
    return (
        <ConditionalRender client>
            {/* Suspense workaround to avoid component flashing during refetch */}
            <React.Suspense fallback={<LiveFeedbackPromptList queryRef={queryRef} />}>
                <LiveFeedbackPromptList queryRef={queryRef} />
            </React.Suspense>
        </ConditionalRender>
    );
}
