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
    Button,
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
import { SubmitLiveFeedbackFlow } from '../LiveFeedbackFlow/SubmitLiveFeedbackFlow';
import { useLiveFeedbackPromptFlows } from '../LiveFeedbackFlow/useLiveFeedbackPromptFlows';
import { useLiveFeedbackPromptFlowsFragment$key } from '@local/__generated__/useLiveFeedbackPromptFlowsFragment.graphql';
import EmptyState from '@local/components/EmptyState';
import FeedbackFlowResponsesDialog from './FeedbackFlowResponsesDialog';
import { ShareFeedbackPromptFlow } from '../LiveFeedbackFlow/ShareFeedbackPromptFlow';

export type FeedbackDashboardTab = 'open-ended' | 'vote' | 'multiple-choice' | 'flows';

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

export type Flow = {
    cursor: string;
    eventId: string;
    flowDescription: string | null;
    flowName: string;
    id: string;
    isDraft: boolean;
    prompts: readonly {
        readonly id: string;
        readonly order: number;
        readonly prompt: Prompt;
    }[];
};

interface PromptItemProps {
    prompt: Prompt;
    handleClick: (prompt: Prompt) => void;
}

function PromptItem({ prompt, handleClick }: PromptItemProps) {
    const ViewResponses = () => {
        return (
            <Tooltip title='View Responses' placement='top'>
                <Button variant='contained' startIcon={<OpenInNewIcon />} onClick={() => handleClick(prompt)}>
                    View Responses
                </Button>
            </Tooltip>
        );
    };

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
                        <ShareFeedbackPrompt prompt={prompt} />
                        <ViewResponses />
                    </Stack>
                )}
            </CardActions>
        </Card>
    );
}

interface FlowItemProps {
    flow: Flow;
    handleClick: (flow: Flow) => void;
}

function FlowItem({ flow, handleClick }: FlowItemProps) {
    const ViewResponses = () => {
        return (
            <Tooltip title='View Responses' placement='top'>
                <Button variant='contained' startIcon={<OpenInNewIcon />} onClick={() => handleClick(flow)}>
                    View Responses
                </Button>
            </Tooltip>
        );
    };

    return (
        <Card sx={{ margin: '0.25rem' }}>
            <CardHeader
                title={
                    <IconButton disabled={true}>
                        <DescriptionIcon />
                        <Typography>{flow.flowName}</Typography>
                    </IconButton>
                }
            />
            <CardContent>
                <Grid container direction='row' alignItems='center' justifyContent='space-around'>
                    <Grid item>
                        <Typography variant='inherit' sx={{ wordBreak: 'break-word' }}>
                            {flow.flowDescription}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Stack direction='row' spacing={1}>
                    <ShareFeedbackPromptFlow flow={flow} />
                    <ViewResponses />
                </Stack>
            </CardActions>
        </Card>
    );
}

interface PromptListProps {
    prompts: readonly Prompt[];
    flows: readonly Flow[];
    handlePromptClick: (prompt: Prompt) => void;
    handleFlowClick: (flow: Flow) => void;
    selectedTab: FeedbackDashboardTab;
    setSelectedTab: React.Dispatch<React.SetStateAction<FeedbackDashboardTab>>;
}

/**
 * This component is responsible for rendering the live feedback prompts using the provided fragment Ref
 */
function PromptList({
    prompts: readonlyPrompts,
    flows: readonlyFlows,
    handlePromptClick,
    handleFlowClick,
    selectedTab,
    setSelectedTab,
}: PromptListProps) {
    const theme = useTheme();
    // Reverse the prompts so that the most recent are at the top
    const prompts = React.useMemo(() => [...readonlyPrompts].reverse(), [readonlyPrompts]);
    const flows = React.useMemo(() => [...readonlyFlows].reverse(), [readonlyFlows]);
    const MAX_LIST_LENGTH = 100;

    const handleChange = (e: React.SyntheticEvent, newValue: 'open-ended' | 'vote') => {
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
                <Tab label='Flows' value='flows' />
            </Tabs>
            {selectedTab === 'open-ended' && (
                <List
                    id='live-feedback-open-ended-prompt-list'
                    sx={{
                        border: 5,
                        borderImage: `linear-gradient(${theme.palette.custom.creamCan},white) 10`,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {openEndedPrompts.length > 0 ? (
                        openEndedPrompts
                            .slice(0, MAX_LIST_LENGTH)
                            .map((prompt) => (
                                <PromptItem key={prompt.id} prompt={prompt} handleClick={handlePromptClick} />
                            ))
                    ) : (
                        <EmptyState message='No Open Ended Prompts To Display Yet.' />
                    )}
                </List>
            )}
            {selectedTab === 'vote' && (
                <React.Fragment>
                    <List
                        id='live-feedback-vote-prompt-list'
                        sx={{
                            border: 5,
                            borderImage: `linear-gradient(${theme.palette.custom.creamCan},white) 10`,
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        {votePrompts.length > 0 ? (
                            votePrompts.map((prompt) => (
                                <PromptItem key={prompt.id} prompt={prompt} handleClick={handlePromptClick} />
                            ))
                        ) : (
                            <EmptyState message='No Vote Prompts To Display Yet.' />
                        )}
                    </List>
                </React.Fragment>
            )}
            {selectedTab === 'multiple-choice' && (
                <List
                    id='live-feedback-multiple-choice-prompt-list'
                    sx={{
                        border: 5,
                        borderImage: `linear-gradient(${theme.palette.custom.creamCan},white) 10`,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {multipleChoicePrompts.length > 0 ? (
                        multipleChoicePrompts.map((prompt) => (
                            <PromptItem key={prompt.id} prompt={prompt} handleClick={handlePromptClick} />
                        ))
                    ) : (
                        <EmptyState message='No Multiple Choice Prompts To Display Yet.' />
                    )}
                </List>
            )}
            {selectedTab === 'flows' && (
                <List
                    id='live-feedback-flows-prompt-list'
                    sx={{
                        border: 5,
                        borderImage: `linear-gradient(${theme.palette.custom.creamCan},white) 10`,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {flows.length > 0 ? (
                        flows.map((flow) => <FlowItem key={flow.id} flow={flow} handleClick={handleFlowClick} />)
                    ) : (
                        <EmptyState message='No Flows To Display Yet.' />
                    )}
                </List>
            )}
        </React.Fragment>
    );
}

interface LiveFeedbackPromptsListProps {
    fragmentRef: useLiveFeedbackPromptsFragment$key;
    flowsFragmentRef: useLiveFeedbackPromptFlowsFragment$key;
}

/**
 * This component is responsible for loading the query and passing the fragment ref to the PromptList component
 */
export function LiveFeedbackPromptsList({ fragmentRef, flowsFragmentRef }: LiveFeedbackPromptsListProps) {
    const [isFeedbackResponsesOpen, setIsFeedbackResponsesOpen] = React.useState(false);
    const [isFlowResponsesOpen, setIsFlowResponsesOpen] = React.useState(false);
    const { prompts, connections, refresh } = useLiveFeedbackPrompts({
        fragmentRef,
    });
    const { flows } = useLiveFeedbackPromptFlows({ fragmentRef: flowsFragmentRef });
    useLiveFeedbackPrompted({ connections });
    const [selectedTab, setSelectedTab] = React.useState<FeedbackDashboardTab>('open-ended');
    const [selectedPrompt, setSelectedPrompt] = React.useState<Prompt | null>(null);
    const selectedPromptRef = React.useRef<Prompt | null>(null);
    const selectedFlowRef = React.useRef<Flow | null>(null);

    const handleOpenFeedbackResponses = () => setIsFeedbackResponsesOpen(true);
    const handleCloseFeedbackResponses = () => setIsFeedbackResponsesOpen(false);

    const handleOpenFlowResponses = () => setIsFlowResponsesOpen(true);
    const handleCloseFlowResponses = () => setIsFlowResponsesOpen(false);

    const handlePromptClick = (prompt: Prompt) => {
        // Update the selected prompt ref
        setSelectedPrompt(prompt);
        selectedPromptRef.current = prompt;
        // Open the modal
        handleOpenFeedbackResponses();
    };

    const handleFlowClick = (flow: Flow) => {
        // Update the selected prompt ref
        setSelectedPrompt(null);
        selectedPromptRef.current = null;
        selectedFlowRef.current = flow;
        // Open the modal
        handleOpenFlowResponses();
    };

    React.useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container direction='column' alignItems='center'>
            <SubmitLiveFeedbackPrompt connections={connections} selectedTab={selectedTab} />
            <SubmitLiveFeedbackFlow />
            <Typography variant='h6'>Select view on a prompt to see its responses</Typography>
            <PromptList
                prompts={prompts}
                flows={flows}
                handlePromptClick={handlePromptClick}
                handleFlowClick={handleFlowClick}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            <FeedbackResponsesDialog
                open={isFeedbackResponsesOpen}
                handleClose={handleCloseFeedbackResponses}
                promptRef={selectedPromptRef}
                selectedPrompt={selectedPrompt}
                setSelectedPrompt={setSelectedPrompt}
            />
            <FeedbackFlowResponsesDialog
                open={isFlowResponsesOpen}
                handleClose={handleCloseFlowResponses}
                selectedFlow={selectedFlowRef.current}
            />
        </Grid>
    );
}
