/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Grid, Tab, Skeleton, Tabs, Button, useMediaQuery, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme, alpha } from '@mui/material/styles';
import { graphql, useFragment } from 'react-relay';

import { EventSidebarFragment$key } from '@local/__generated__/EventSidebarFragment.graphql';
import { QuestionList } from '@local/features/events/Questions/QuestionList';
import { QuestionQueue } from '@local/features/events/Moderation/ManageQuestions';
import AskQuestion from '@local/features/events/Questions/AskQuestion';
import { LiveFeedbackList } from '@local/features/events/LiveFeedback/LiveFeedbackList';
import { PreloadedBroadcastMessageList } from '@local/features/events/BroadcastMessages/BroadcastMessageList';
import { SubmitLiveFeedback } from '@local/features/events/LiveFeedback/SubmitLiveFeedback';
import { QuestionCarousel } from '../Questions/QuestionCarousel';
import { CurrentQuestionCard } from '../Moderation/ManageQuestions/CurrentQuestionCard';
import { ShareFeedbackResults, useLiveFeedbackPrompt } from '../LiveFeedbackPrompts';
import { SubmitLiveFeedbackPrompt } from '../LiveFeedbackPrompts/LiveFeedbackPrompt/SubmitLiveFeedbackPrompt';
import { useLiveFeedbackPromptResultsShared } from '../LiveFeedbackPrompts/LiveFeedbackPromptResults';
import { PreloadedParticipantsList } from '../Participants/ParticipantsList';
import { StyledTabs } from '@local/components/StyledTabs';
import { StyledColumnGrid } from '@local/components/StyledColumnGrid';
import { ModeratorActions } from '../Moderation/ModeratorActions';

export const EVENT_SIDEBAR_FRAGMENT = graphql`
    fragment EventSidebarFragment on Event {
        id
        isQuestionFeedVisible
        isViewerModerator
        ...SpeakerListFragment
        ...useQuestionListFragment
        ...useBroadcastMessageListFragment
        ...useQuestionQueueFragment
        ...QuestionCarouselFragment
        ...useLiveFeedbackListFragment
    }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',

        padding: theme.spacing(0, 1, 1, 1),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1),
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: 600,
        },
        '& > *': {
            marginBottom: theme.spacing(2.5),
            width: '100%',
        },
    },
}));

// TODO: Add sidebar top section for moderator tools
type sidebarTopTabs = 'Moderator';
type SidebarBottomTabs = 'Queue' | 'Questions' | 'Feedback' | 'Broadcast' | 'Participants';

export function EventSidebarLoader() {
    return <Skeleton variant='rectangular' height={500} width={200} />;
}
export interface EventSidebarProps {
    fragmentRef: EventSidebarFragment$key;
    isViewerModerator: boolean;
    isLive: boolean;
    setIsLive: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EventSidebar = ({ fragmentRef, isViewerModerator, isLive, setIsLive }: EventSidebarProps) => {
    const theme = useTheme();
    const classes = useStyles();
    const data = useFragment(EVENT_SIDEBAR_FRAGMENT, fragmentRef);
    const [topTab, setTopTab] = React.useState<sidebarTopTabs>('Moderator');
    const [bottomTab, setBottomTab] = React.useState<SidebarBottomTabs>('Questions');
    const [topSectionVisible, setTopSectionVisible] = React.useState(true);
    const eventId = data.id;

    const mdUpBreakpoint = useMediaQuery(theme.breakpoints.up('md'));
    const smDownBreakpoint = useMediaQuery(theme.breakpoints.down('sm'));

    // Subscribe to live feedback prompts
    useLiveFeedbackPrompt();
    useLiveFeedbackPromptResultsShared();

    const toggleTopSectionVisibility = React.useCallback(() => {
        setTopSectionVisible((prev) => !prev);
    }, []);

    const handleTopChange = (e: React.SyntheticEvent, newTab: sidebarTopTabs) => {
        e.preventDefault();
        setTopTab(newTab);
    };

    const handleBottomChange = (e: React.SyntheticEvent, newTab: SidebarBottomTabs) => {
        e.preventDefault();
        setBottomTab(newTab);
    };

    const displayActionButtons = React.useMemo(() => {
        if (data.isViewerModerator) {
            if (bottomTab === 'Queue') return null;
            if (bottomTab === 'Questions') return null;
            if (bottomTab === 'Feedback')
                return (
                    <Grid container direction='row' justifyContent='space-evenly' alignItems='center'>
                        <Grid item paddingBottom='1rem'>
                            <SubmitLiveFeedbackPrompt eventId={eventId} />
                        </Grid>
                        <Grid item paddingBottom='1rem'>
                            <ShareFeedbackResults />
                        </Grid>
                    </Grid>
                );
            return null;
        } else {
            if (bottomTab === 'Questions')
                return (
                    <Grid container paddingBottom='1rem' justifyContent='center'>
                        <AskQuestion eventId={eventId} />
                    </Grid>
                );
            if (bottomTab === 'Feedback')
                return (
                    <Grid container paddingBottom='1rem' justifyContent='center'>
                        <SubmitLiveFeedback eventId={eventId} />
                    </Grid>
                );
            return null;
        }
    }, [data.isViewerModerator, bottomTab, eventId]);

    return (
        <Grid
            container
            className={classes.root}
            direction='column'
            alignContent='flex-start'
            alignItems='flex-start'
            wrap='nowrap'
        >
            <Grid item>
                {!isViewerModerator && <QuestionCarousel fragmentRef={data} />}
                {isViewerModerator && (
                    <CurrentQuestionCard isViewerModerator={Boolean(isViewerModerator)} fragmentRef={data} />
                )}
            </Grid>
            {isViewerModerator && (
                <Button onClick={toggleTopSectionVisibility}>
                    {topSectionVisible ? 'Hide Moderator Tools' : 'Show Moderator Tools'}
                </Button>
            )}
            {isViewerModerator && topSectionVisible && (
                <Grid item container justifyContent='start'>
                    <StyledTabs value={topTab} theme={theme} props={{ onChange: handleTopChange }}>
                        <Tab label='Moderator' value='Moderator' />
                    </StyledTabs>
                    <StyledColumnGrid theme={theme} props={{ height: '250px' }}>
                        <Grid item justifyContent='center' width='100%'>
                            <ModeratorActions isLive={isLive} setIsLive={setIsLive} eventId={eventId} />
                            <PreloadedParticipantsList
                                eventId={data.id}
                                isVisible={isViewerModerator && topTab === 'Moderator'}
                            />
                        </Grid>
                    </StyledColumnGrid>
                </Grid>
            )}
            <Grid item container justifyContent='center' height='100%' width='100%'>
                <Tabs
                    sx={{
                        '& .MuiTabs-indicator': { backgroundColor: 'custom.creamCan' },
                        '& .MuiTab-root': {
                            color: 'white',
                            backgroundColor: alpha(theme.palette.custom.darkCreamCan, 0.25),
                            borderRadius: '20px 20px 0 0',
                        },
                        '& .Mui-selected': { color: 'white !important', backgroundColor: 'custom.creamCan' },
                    }}
                    value={bottomTab}
                    onChange={handleBottomChange}
                    centered
                    aria-label='secondary tabs example'
                >
                    {isViewerModerator && (
                        <Tab
                            label={smDownBreakpoint ? <Typography variant='caption'>Queue</Typography> : 'Queue'}
                            value='Queue'
                        />
                    )}
                    {/* eslint-disable-next-line quotes */}
                    <Tab
                        label={smDownBreakpoint ? <Typography variant='caption'>Questions</Typography> : 'Questions'}
                        value='Questions'
                    />
                    <Tab
                        label={smDownBreakpoint ? <Typography variant='caption'>Feedback</Typography> : 'Feedback'}
                        value='Feedback'
                    />
                    {isViewerModerator && (
                        <Tab
                            label={
                                smDownBreakpoint ? <Typography variant='caption'>Broadcast</Typography> : 'Broadcast'
                            }
                            value='Broadcast'
                        />
                    )}
                </Tabs>
                <StyledColumnGrid
                    theme={theme}
                    props={{
                        id: 'event-sidebar-bottom-tabs-scrollable',
                        height: `${mdUpBreakpoint ? '97%' : '500px'}`,
                    }}
                >
                    {isViewerModerator === true && (
                        <QuestionQueue fragmentRef={data} isVisible={bottomTab === 'Queue'} />
                    )}
                    <QuestionList
                        fragmentRef={data}
                        ActionButtons={displayActionButtons}
                        isVisible={bottomTab === 'Questions'}
                    />
                    <LiveFeedbackList
                        fragmentRef={data}
                        ActionButtons={displayActionButtons}
                        isVisible={bottomTab === 'Feedback'}
                    />
                    {isViewerModerator === true && (
                        <PreloadedBroadcastMessageList isVisible={bottomTab === 'Broadcast'} />
                    )}
                </StyledColumnGrid>
            </Grid>
        </Grid>
    );
};
