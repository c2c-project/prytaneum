/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Grid, Tab, Skeleton, Tabs } from '@mui/material';
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

export const EVENT_SIDEBAR_FRAGMENT = graphql`
    fragment EventSidebarFragment on Event {
        id
        isQuestionFeedVisible
        isViewerModerator
        ...EventDetailsCardFragment
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
        height: '75%',

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

type SidebarTabs = 'Queue' | 'Questions' | 'Feedback' | 'Broadcast';

export function EventSidebarLoader() {
    return <Skeleton variant='rectangular' height={500} width={200} />;
}
export interface EventSidebarProps {
    fragmentRef: EventSidebarFragment$key;
    override: Boolean;
}
export const EventSidebar = ({ fragmentRef, override }: EventSidebarProps) => {
    const theme = useTheme();
    const classes = useStyles();
    const data = useFragment(EVENT_SIDEBAR_FRAGMENT, fragmentRef);
    const [tab, setTab] = React.useState<SidebarTabs>('Questions');

    // Subscribe to live feedback prompts
    useLiveFeedbackPrompt();
    useLiveFeedbackPromptResultsShared();

    const handleChange = (e: React.SyntheticEvent, newTab: SidebarTabs) => {
        e.preventDefault();
        setTab(newTab);
    };

    const displayActionButtons = React.useMemo(() => {
        const eventId = data.id;
        if (data.isViewerModerator) {
            if (tab === 'Queue') return null;
            if (tab === 'Questions') return null;
            if (tab === 'Feedback')
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
            if (tab === 'Questions')
                return (
                    <Grid container paddingBottom='1rem' justifyContent='center'>
                        <AskQuestion eventId={eventId} />
                    </Grid>
                );
            if (tab === 'Feedback')
                return (
                    <Grid container paddingBottom='1rem' justifyContent='center'>
                        <SubmitLiveFeedback eventId={eventId} />
                    </Grid>
                );
            return null;
        }
    }, [data, tab]);

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
                {!data.isViewerModerator && <QuestionCarousel fragmentRef={data} />}
                {data.isViewerModerator && !override && (
                    <CurrentQuestionCard isViewerModerator={Boolean(data.isViewerModerator)} fragmentRef={data} />
                )}
            </Grid>
            <Grid item>
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
                    value={tab}
                    onChange={handleChange}
                    centered
                    aria-label='secondary tabs example'
                >
                    {data.isViewerModerator === true && !override && <Tab label='Queue' value='Queue' />}
                    <Tab label='Questions' value='Questions' />
                    <Tab label='Feedback' value='Feedback' />
                    {!override && <Tab label='Broadcast' value='Broadcast' />}
                </Tabs>
                {data.isViewerModerator === true && <QuestionQueue fragmentRef={data} isVisible={tab === 'Queue'} />}
                <QuestionList fragmentRef={data} ActionButtons={displayActionButtons} isVisible={tab === 'Questions'} />
                <LiveFeedbackList
                    fragmentRef={data}
                    ActionButtons={displayActionButtons}
                    isVisible={tab === 'Feedback'}
                />
                <PreloadedBroadcastMessageList isVisible={tab === 'Broadcast'} />
            </Grid>
        </Grid>
    );
};
