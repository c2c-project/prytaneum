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
    Divider,
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
import { ShareFeedbackPromptFlowDraft } from '../LiveFeedbackFlow/ShareFeedbackPromptFlowDraft';
import { RunRound1Simulation, SimulationConfiguration } from './RunRound1Simulation';
import {
    getRunnableSurveyPrompt,
    getSurveyCardActionVisibility,
    hasRound1SimulationResponses,
} from './simulationEligibility';

export type FeedbackDashboardTab = 'open-ended' | 'vote' | 'multiple-choice' | 'surveys';

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
    readonly simulationResponses?: { readonly edges: readonly unknown[] | null } | null;
    readonly hasSimulationResponses?: boolean;
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
    simulationConfiguration: SimulationConfiguration;
    refresh: () => void;
}

function PromptItem({ prompt, handleClick, simulationConfiguration, refresh }: PromptItemProps) {
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
                    <Stack direction='row' spacing={1}>
                        <ShareFeedbackPromptDraft prompt={prompt} />
                        <RunRound1Simulation
                            prompt={prompt}
                            isSurveyDraft={Boolean(prompt.isDraft)}
                            hasResponses={hasRound1SimulationResponses(prompt)}
                            configuration={simulationConfiguration}
                            onSuccess={refresh}
                        />
                    </Stack>
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
    simulationConfiguration: SimulationConfiguration;
    refresh: () => void;
}

function FlowItem({ flow, handleClick, simulationConfiguration, refresh }: FlowItemProps) {
    const runnablePrompt = getRunnableSurveyPrompt(flow);
    const actions = getSurveyCardActionVisibility(flow.isDraft);
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
            {flow.isDraft ? (
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
                            {flow.flowName}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                {actions.shareDraft ? (
                    <Stack direction='row' spacing={1}>
                        <ShareFeedbackPromptFlowDraft flow={flow} />
                        {runnablePrompt && (
                            <RunRound1Simulation
                                prompt={runnablePrompt}
                                isSurveyDraft={flow.isDraft}
                                hasResponses={hasRound1SimulationResponses(runnablePrompt)}
                                configuration={simulationConfiguration}
                                onSuccess={refresh}
                            />
                        )}
                        {actions.viewResponses && <ViewResponses />}
                    </Stack>
                ) : (
                    <Stack direction='row' spacing={1}>
                        {actions.reshareSurvey && <ShareFeedbackPromptFlow flow={flow} />}
                        {actions.viewResponses && <ViewResponses />}
                    </Stack>
                )}
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
    simulationConfiguration: SimulationConfiguration;
    refresh: () => void;
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
    simulationConfiguration,
    refresh,
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
                <Tab label='Surveys' value='surveys' />
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
                                <PromptItem
                                    key={prompt.id}
                                    prompt={prompt}
                                    handleClick={handlePromptClick}
                                    simulationConfiguration={simulationConfiguration}
                                    refresh={refresh}
                                />
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
                                <PromptItem
                                    key={prompt.id}
                                    prompt={prompt}
                                    handleClick={handlePromptClick}
                                    simulationConfiguration={simulationConfiguration}
                                    refresh={refresh}
                                />
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
                            <PromptItem
                                key={prompt.id}
                                prompt={prompt}
                                handleClick={handlePromptClick}
                                simulationConfiguration={simulationConfiguration}
                                refresh={refresh}
                            />
                        ))
                    ) : (
                        <EmptyState message='No Multiple Choice Prompts To Display Yet.' />
                    )}
                </List>
            )}
            {selectedTab === 'surveys' && (
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
                        flows.map((flow) => (
                            <FlowItem
                                key={flow.id}
                                flow={flow}
                                handleClick={handleFlowClick}
                                simulationConfiguration={simulationConfiguration}
                                refresh={refresh}
                            />
                        ))
                    ) : (
                        <EmptyState message='No Surveys To Display Yet.' />
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
    const { prompts, connections, refresh, simulationConfiguration } = useLiveFeedbackPrompts({
        fragmentRef,
    });
    const { flows, connections: flowConnections } = useLiveFeedbackPromptFlows({ fragmentRef: flowsFragmentRef });
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

    const handleNewSurveySimulationSuccess = (flow: Flow) => {
        selectedFlowRef.current = {
            ...flow,
            prompts: flow.prompts.map((flowPrompt) => ({
                ...flowPrompt,
                prompt: { ...flowPrompt.prompt, hasSimulationResponses: true },
            })),
        };
        refresh();
        handleOpenFlowResponses();
    };

    React.useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container direction='column' alignItems='center' height='100%' minHeight='100%'>
            <Grid container direction='row' alignItems='center' justifyContent='center' sx={{ width: '100%', mb: 2 }}>
                <SubmitLiveFeedbackPrompt connections={connections} selectedTab={selectedTab} />
                <Divider orientation='vertical' flexItem sx={{ width: '1rem', marginRight: '1rem' }} />
                <SubmitLiveFeedbackFlow
                    connections={flowConnections}
                    simulationConfiguration={simulationConfiguration}
                    onSimulationSuccess={handleNewSurveySimulationSuccess}
                />
            </Grid>
            <PromptList
                prompts={prompts}
                flows={flows}
                handlePromptClick={handlePromptClick}
                handleFlowClick={handleFlowClick}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                simulationConfiguration={simulationConfiguration}
                refresh={refresh}
            />
            <FeedbackResponsesDialog
                open={isFeedbackResponsesOpen}
                handleClose={handleCloseFeedbackResponses}
                promptRef={selectedPromptRef}
                selectedPrompt={selectedPrompt}
                setSelectedPrompt={setSelectedPrompt}
                simulationConfiguration={simulationConfiguration}
                refresh={refresh}
            />
            <FeedbackFlowResponsesDialog
                open={isFlowResponsesOpen}
                handleClose={handleCloseFlowResponses}
                selectedFlow={selectedFlowRef.current}
                simulationConfiguration={simulationConfiguration}
                refresh={refresh}
            />
        </Grid>
    );
}
