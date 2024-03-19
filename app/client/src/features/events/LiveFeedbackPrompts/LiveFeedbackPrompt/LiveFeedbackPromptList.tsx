import * as React from 'react';
import { graphql, PreloadedQuery, useQueryLoader, usePreloadedQuery, fetchQuery } from 'react-relay';
import {
    List,
    ListItem,
    Card,
    CardContent,
    Typography,
    Grid,
    IconButton,
    DialogContent,
    Tabs,
    Tab,
} from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { LiveFeedbackPromptListQuery } from '@local/__generated__/LiveFeedbackPromptListQuery.graphql';
import { PreloadedLiveFeedbackPromptResponseList } from '../LiveFeedbackPromptResponses/LiveFeedbackPromptResponseList';
import { ShareFeedbackPromptResults } from '../LiveFeedbackPromptResponses';
import { useEnvironment } from '@local/core';
import { useEvent } from '@local/features/events/useEvent';
import { StyledDialogTitle, Loader, StyledDialog, ConditionalRender } from '@local/components';

export const LIVE_FEEDBACK_PROMPT_LIST_QUERY = graphql`
    query LiveFeedbackPromptListQuery($eventId: ID!) {
        prompts(eventId: $eventId) {
            id
            prompt
            isVote
            isOpenEnded
            isMultipleChoice
            multipleChoiceOptions
            createdAt
        }
    }
`;

export type Prompt = {
    readonly id: string;
    readonly prompt: string;
    readonly isVote: boolean | null;
    readonly isOpenEnded: boolean | null;
    readonly isMultipleChoice: boolean | null;
    readonly multipleChoiceOptions: ReadonlyArray<string> | null;
    readonly createdAt: Date | null;
};

interface PromptItemProps {
    prompt: Prompt;
    handleClick: (prompt: Prompt) => void;
}

function PromptItem({ prompt, handleClick }: PromptItemProps) {
    return (
        <ListItem style={{ paddingBottom: '.5rem', paddingTop: '.5rem' }}>
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
                                    <Typography variant='subtitle1'>View</Typography>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </ListItem>
    );
}

interface PromptListProps {
    prompts: readonly Prompt[];
    handleClick: (prompt: Prompt) => void;
}

/**
 * This component is responsible for rendering the live feedback prompts using the provided fragment Ref
 */
function PromptList({ prompts: readonlyPrompts, handleClick }: PromptListProps) {
    const theme = useTheme();
    // Reverse the prompts so that the most recent are at the top
    const prompts = React.useMemo(() => [...readonlyPrompts].reverse(), [readonlyPrompts]);
    const [value, setValue] = React.useState<'open-ended' | 'vote' | 'multiple-choice'>('open-ended');
    const MAX_LIST_LENGTH = 100;

    const handleChange = (e: React.SyntheticEvent, newValue: 'open-ended' | 'vote') => {
        e.preventDefault();
        setValue(newValue);
    };

    const openEndedPrompts = React.useMemo(() => prompts.filter((prompt) => prompt.isOpenEnded), [prompts]);
    const votePrompts = React.useMemo(() => prompts.filter((prompt) => prompt.isVote), [prompts]);
    const multipleChoicePrompts = React.useMemo(() => prompts.filter((prompt) => prompt.isMultipleChoice), [prompts]);

    return (
        <React.Fragment>
            <Tabs
                sx={{
                    '& .MuiTabs-indicator': { backgroundColor: 'custom.creamCan' },
                    '& .MuiTab-root': {
                        color: 'white',
                        backgroundColor: alpha(theme.palette.custom.darkCreamCan, 0.25),
                        borderRadius: '20px 20px 0 0',
                    },
                    '& .Mui-selected': { backgroundColor: 'custom.creamCan' },
                }}
                value={value}
                onChange={handleChange}
                centered
                aria-label='secondary tabs example'
            >
                <Tab label='Open Ended' value='open-ended' />
                <Tab label='Vote' value='vote' />
                <Tab label='Multiple Choice' value='multiple-choice' />
            </Tabs>
            {value === 'open-ended' && (
                <React.Fragment>
                    {openEndedPrompts.length > 0 ? (
                        <List
                            id='live-feedback-open-ended-prompt-list'
                            sx={{
                                border: 5,
                                borderImage: `linear-gradient(${theme.palette.custom.creamCan},white) 10`,
                                width: '100%',
                            }}
                        >
                            {openEndedPrompts.slice(0, MAX_LIST_LENGTH).map((prompt) => (
                                <PromptItem key={prompt.id} prompt={prompt} handleClick={handleClick} />
                            ))}
                        </List>
                    ) : (
                        <Typography>No Open Ended Prompts To Display Yet</Typography>
                    )}
                </React.Fragment>
            )}
            {value === 'vote' && (
                <React.Fragment>
                    {votePrompts.length > 0 ? (
                        <List
                            id='live-feedback-vote-prompt-list'
                            sx={{
                                border: 5,
                                borderImage: `linear-gradient(${theme.palette.custom.creamCan},white) 10`,
                                width: '100%',
                            }}
                        >
                            {votePrompts.map((prompt) => (
                                <PromptItem key={prompt.id} prompt={prompt} handleClick={handleClick} />
                            ))}
                        </List>
                    ) : (
                        <Typography>No Vote Prompts To Display Yet</Typography>
                    )}
                </React.Fragment>
            )}
            {value === 'multiple-choice' && (
                <React.Fragment>
                    {multipleChoicePrompts.length > 0 ? (
                        <List
                            id='live-feedback-multiple-choice-prompt-list'
                            sx={{
                                border: 5,
                                borderImage: `linear-gradient(${theme.palette.custom.creamCan},white) 10`,
                                width: '100%',
                            }}
                        >
                            {multipleChoicePrompts.map((prompt) => (
                                <PromptItem key={prompt.id} prompt={prompt} handleClick={handleClick} />
                            ))}
                        </List>
                    ) : (
                        <Typography>No Multiple Choice Prompts To Display Yet</Typography>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
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
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
    const { prompts } = usePreloadedQuery(LIVE_FEEDBACK_PROMPT_LIST_QUERY, queryRef);
    const [open, setOpen] = React.useState(false);
    const selectedPromptRef = React.useRef<Prompt | null>(null);
    const { pauseParentRefreshing, resumeParentRefreshing } = useEvent();

    const handleOpen = () => {
        setOpen(true);
        pauseParentRefreshing();
        responsesModalStatusRef.current = true;
    };
    const handleClose = () => {
        setOpen(false);
        resumeParentRefreshing();
        responsesModalStatusRef.current = false;
    };

    const handlePromptClick = (prompt: Prompt) => {
        // Update the selected prompt ref
        selectedPromptRef.current = prompt;
        // Open the modal
        handleOpen();
    };

    const PromptResponseList = () => {
        if (selectedPromptRef.current)
            return (
                <ConditionalRender client>
                    <React.Suspense fallback={<Loader />}>
                        <PreloadedLiveFeedbackPromptResponseList prompt={selectedPromptRef.current} />
                    </React.Suspense>
                </ConditionalRender>
            );
        return <React.Fragment />;
    };

    const PromptText = React.useCallback(() => {
        if (selectedPromptRef.current)
            return (
                <Grid container padding='1rem'>
                    <Grid item xs>
                        <Typography variant='h5' style={{ overflowWrap: 'break-word' }}>
                            Prompt: {selectedPromptRef.current.prompt}
                        </Typography>
                    </Grid>
                </Grid>
            );
        return <React.Fragment />;
    }, []);

    const ShareFeedbackResultsButton = () => {
        if (
            selectedPromptRef.current &&
            (selectedPromptRef.current.isVote || selectedPromptRef.current.isMultipleChoice)
        )
            return (
                <Grid item paddingBottom='1rem'>
                    <ShareFeedbackPromptResults prompt={selectedPromptRef.current} />
                </Grid>
            );
        return <React.Fragment />;
    };

    return (
        <React.Fragment>
            {!prompts ? <Loader /> : <PromptList prompts={prompts} handleClick={handlePromptClick} />}
            <StyledDialog
                fullScreen={fullscreen}
                maxWidth='lg'
                fullWidth={true}
                scroll='paper'
                open={open}
                onClose={handleClose}
                aria-labelledby='feedback-responses-dialog'
            >
                <StyledDialogTitle id='feedback-responses-dialog-title' onClose={handleClose}>
                    Feedback Responses
                </StyledDialogTitle>
                <DialogContent dividers>
                    <Grid container direction='column' alignItems='center' alignContent='center'>
                        <PromptText />
                        <ShareFeedbackResultsButton />
                        <PromptResponseList />
                    </Grid>
                </DialogContent>
            </StyledDialog>
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
    const REFETCH_INTERVAL = 60000; // 60 seconds

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
