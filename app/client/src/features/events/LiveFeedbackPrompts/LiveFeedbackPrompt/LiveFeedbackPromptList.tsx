import * as React from 'react';
import {
    List,
    Card,
    CardContent,
    Typography,
    Grid,
    IconButton,
    Tabs,
    Tab,
    CardActions,
    CardHeader,
    Stack,
    Tooltip,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';
import { ShareFeedbackPromptDraft } from './ShareFeedbackPromptDraft';
import { SubmitLiveFeedbackPrompt } from './SubmitLiveFeedbackPrompt';
import { useLiveFeedbackPrompts } from './useLiveFeedbackPrompts';
import { useLiveFeedbackPromptsFragment$key } from '@local/__generated__/useLiveFeedbackPromptsFragment.graphql';
import FeedbackResponsesDialog from './FeedbackResponsesDialog';
import { useLiveFeedbackPrompted } from '../useLiveFeedbackPrompted';
import { ShareFeedbackPrompt } from './ShareFeedbackPrompt';

export type FeedbackDashboardTab = 'open-ended' | 'vote' | 'multiple-choice';

export type Prompt = {
    readonly id: string;
    readonly prompt: string;
    readonly isVote: boolean | null;
    readonly isOpenEnded: boolean | null;
    readonly isMultipleChoice: boolean | null;
    readonly multipleChoiceOptions: ReadonlyArray<string> | null;
    readonly isDraft: boolean | null;
    readonly createdAt: Date | null;
    readonly viewpoints: ReadonlyArray<string> | null;
    readonly voteViewpoints: Record<string, string[]> | null;
};

interface PromptItemProps {
    prompt: Prompt;
    handleClick: (prompt: Prompt) => void;
}

function PromptItem({ prompt, handleClick }: PromptItemProps) {
    return (
        <Card sx={{ margin: '0.25rem' }}>
            {prompt.isDraft ? (
                <CardHeader
                    title={
                        <IconButton disabled={true}>
                            <DescriptionIcon />
                            <Typography>Draft</Typography>
                        </IconButton>
                    }
                />
            ) : null}
            <CardContent>
                <Grid container direction='row' alignItems='center' justifyContent='space-around'>
                    <Grid item>
                        <Typography variant='inherit' sx={{ wordBreak: 'break-word' }}>
                            {prompt.prompt}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                {prompt.isDraft ? (
                    <ShareFeedbackPromptDraft prompt={prompt} />
                ) : (
                    <Stack direction='row' spacing={1}>
                        <Tooltip title='View Responses' placement='top'>
                            <IconButton onClick={() => handleClick(prompt)}>
                                <OpenInNewIcon />
                                <Typography variant='subtitle1'>View Responses</Typography>
                            </IconButton>
                        </Tooltip>
                        <ShareFeedbackPrompt prompt={prompt} />
                    </Stack>
                )}
            </CardActions>
        </Card>
    );
}

interface PromptListProps {
    prompts: readonly Prompt[];
    handleClick: (prompt: Prompt) => void;
    selectedTab: FeedbackDashboardTab;
    setSelectedTab: React.Dispatch<React.SetStateAction<FeedbackDashboardTab>>;
}

/**
 * This component is responsible for rendering the live feedback prompts using the provided fragment Ref
 */
function PromptList({ prompts: readonlyPrompts, handleClick, selectedTab, setSelectedTab }: PromptListProps) {
    const theme = useTheme();
    // Reverse the prompts so that the most recent are at the top
    const prompts = React.useMemo(() => [...readonlyPrompts].reverse(), [readonlyPrompts]);
    const MAX_LIST_LENGTH = 100;

    const handleChange = (e: React.SyntheticEvent, newValue: 'open-ended' | 'vote') => {
        e.preventDefault();
        setSelectedTab(newValue);
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
                value={selectedTab}
                onChange={handleChange}
                centered
                aria-label='secondary tabs example'
            >
                <Tab label='Open Ended' value='open-ended' />
                <Tab label='Vote' value='vote' />
                <Tab label='Multiple Choice' value='multiple-choice' />
            </Tabs>
            {selectedTab === 'open-ended' && (
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
            {selectedTab === 'vote' && (
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
            {selectedTab === 'multiple-choice' && (
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

interface LiveFeedbackPromptsListProps {
    fragmentRef: useLiveFeedbackPromptsFragment$key;
}

/**
 * This component is responsible for loading the query and passing the fragment ref to the PromptList component
 */
export function LiveFeedbackPromptsList({ fragmentRef }: LiveFeedbackPromptsListProps) {
    const [open, setOpen] = React.useState(false);
    const { prompts, connections, refresh } = useLiveFeedbackPrompts({
        fragmentRef,
    });
    useLiveFeedbackPrompted({ connections });
    const [selectedTab, setSelectedTab] = React.useState<FeedbackDashboardTab>('open-ended');
    const [selectedPrompt, setSelectedPrompt] = React.useState<Prompt | null>(null);
    const selectedPromptRef = React.useRef<Prompt | null>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlePromptClick = (prompt: Prompt) => {
        // Update the selected prompt ref
        setSelectedPrompt(prompt);
        selectedPromptRef.current = prompt;
        // Open the modal
        handleOpen();
    };

    React.useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <SubmitLiveFeedbackPrompt connections={connections} selectedTab={selectedTab} />
            <Typography variant='h6'>Select view on a prompt to see its responses</Typography>
            <PromptList
                prompts={prompts}
                handleClick={handlePromptClick}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            <FeedbackResponsesDialog
                open={open}
                handleClose={handleClose}
                promptRef={selectedPromptRef}
                selectedPrompt={selectedPrompt}
                setSelectedPrompt={setSelectedPrompt}
            />
        </React.Fragment>
    );
}
