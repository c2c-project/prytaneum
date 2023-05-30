/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Grid, Tab, Skeleton, Tabs, Button, useMediaQuery } from '@mui/material';
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
    override: Boolean;
    isViewerModerator: Boolean;
    isLive: Boolean;
    updateEventStatus: () => void;
}
export const EventSidebar = ({
    fragmentRef,
    override,
    isViewerModerator,
    isLive,
    updateEventStatus,
}: EventSidebarProps) => {
    const theme = useTheme();
    const classes = useStyles();
    const data = useFragment(EVENT_SIDEBAR_FRAGMENT, fragmentRef);
    const [topTab, setTopTab] = React.useState<sidebarTopTabs>('Moderator');
    const [bottomTab, setBottomTab] = React.useState<SidebarBottomTabs>('Questions');
    const [topSectionVisible, setTopSectionVisible] = React.useState(true);

    const mdUpBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

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
        const eventId = data.id;
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
    }, [data, bottomTab]);

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
                {isViewerModerator && !override && (
                    <CurrentQuestionCard isViewerModerator={Boolean(isViewerModerator)} fragmentRef={data} />
                )}
            </Grid>
            {isViewerModerator && (
                <Grid item container justifyContent='center'>
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
                        value={topTab}
                        onChange={handleTopChange}
                        centered
                        aria-label='secondary tabs example'
                    >
                        {data.isViewerModerator === true && !override && (
                            <Tab onClick={toggleTopSectionVisibility} label='Moderator' value='Moderator' />
                        )}
                    </Tabs>
                    {topSectionVisible && (
                        <Grid
                            container
                            justifyContent='center'
                            sx={{
                                width: '100%',
                                height: '250px',
                                border: 5,
                                padding: 1,
                                borderImage: `linear-gradient(${theme.palette.custom.creamCan},${alpha(
                                    theme.palette.custom.creamCan,
                                    0.06
                                )}) 10`,
                                backgroundColor: alpha(theme.palette.custom.creamCan, 0.06),
                                overflowY: 'scroll',
                                '::-webkit-scrollbar': {
                                    backgroundColor: 'transparent',
                                },
                                '::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#D9D9D9',
                                    backgroundOpacity: '0.3',
                                    borderRadius: '20px',
                                    border: '5px solid transparent',
                                    backgroundClip: 'content-box',
                                },
                            }}
                        >
                            <Grid item justifyContent='center' width='100%'>
                                <Grid item container justifyContent='center' width='100%'>
                                    <Button
                                        variant='contained'
                                        color={isLive ? 'error' : 'success'}
                                        onClick={updateEventStatus}
                                    >
                                        {isLive ? 'End Event' : 'Start Event'}
                                    </Button>
                                </Grid>
                                <PreloadedParticipantsList
                                    eventId={data.id}
                                    isVisible={isViewerModerator && topTab === 'Moderator'}
                                />
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}
            <Grid item container justifyContent='center' height='100%'>
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
                    {isViewerModerator === true && !override && <Tab label='Queue' value='Queue' />}
                    <Tab label='Questions' value='Questions' />
                    <Tab label='Feedback' value='Feedback' />
                    {isViewerModerator === true && <Tab label='Broadcast' value='Broadcast' />}
                </Tabs>
                <Grid
                    id='event-sidebar-bottom-tabs-scrollable'
                    container
                    justifyContent='center'
                    sx={{
                        width: '100%',
                        height: `${mdUpBreakpoint ? '97%' : '500px'}`,
                        border: 5,
                        padding: 1,
                        borderImage: `linear-gradient(${theme.palette.custom.creamCan},${alpha(
                            theme.palette.custom.creamCan,
                            0.06
                        )}) 10`,
                        backgroundColor: alpha(theme.palette.custom.creamCan, 0.06),
                        overflowY: 'scroll',
                        '::-webkit-scrollbar': {
                            backgroundColor: 'transparent',
                        },
                        '::-webkit-scrollbar-thumb': {
                            backgroundColor: '#D9D9D9',
                            backgroundOpacity: '0.3',
                            borderRadius: '20px',
                            border: '5px solid transparent',
                            backgroundClip: 'content-box',
                        },
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
                </Grid>
            </Grid>
        </Grid>
    );
};
