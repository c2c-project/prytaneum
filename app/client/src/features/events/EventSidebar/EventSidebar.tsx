/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Grid, Tab, Skeleton, useMediaQuery, Typography, Badge } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { graphql, useFragment } from 'react-relay';

import { EventSidebarFragment$key } from '@local/__generated__/EventSidebarFragment.graphql';
import { QuestionListContainer } from '@local/features/events/Questions/QuestionList';
import { LiveFeedbackList } from '@local/features/events/LiveFeedback/LiveFeedbackList';
import { QuestionCarousel } from '../Questions/QuestionCarousel';
import { useLiveFeedbackPrompt } from '../LiveFeedbackPrompts';
import {
    useLiveFeedbackPromptResultsShared,
    ViewLiveFeedbackPromptResults,
} from '../LiveFeedbackPrompts/LiveFeedbackPromptResults';
import { StyledTabs } from '@local/components/StyledTabs';
import { StyledColumnGrid } from '@local/components/StyledColumnGrid';
import { SubmitLiveFeedbackPromptResponse } from '../LiveFeedbackPrompts/LiveFeedbackPromptResponse';
import { useResponsiveDialog } from '@local/components/ResponsiveDialog';
import {
    EventFeedbackInfoPopper,
    EventInfoPopperStage,
    EventQuestionInfoPopper,
    useEventInfoPopper,
} from '@local/components/EventInfoPoppers';
import { Participant } from '../Participants/useParticipantList';
import ParticipantList from '../Participants/ParticipantList';
import { useBroadcastMessageSnack } from '../BroadcastMessages/useBroadcastMessageSnack';

export const EVENT_SIDEBAR_FRAGMENT = graphql`
    fragment EventSidebarFragment on Event {
        id
        isQuestionFeedVisible
        isViewerModerator
        ...SpeakerListFragment
        ...useQuestionListFragment @arguments(userLang: $lang)
        ...useBroadcastMessageListFragment
        ...useQuestionQueueFragment @arguments(userLang: $lang)
        ...QuestionCarouselFragment @arguments(userLang: $lang)
        ...useLiveFeedbackListFragment @arguments(eventId: $eventId)
        ...useOnDeckFragment @arguments(userLang: $lang)
    }
`;

export function EventSidebarLoader() {
    return <Skeleton variant='rectangular' height={500} width={200} />;
}
export interface EventSidebarProps {
    fragmentRef: EventSidebarFragment$key;
    isViewerModerator: boolean;
    isLive: boolean;
    setIsLive: React.Dispatch<React.SetStateAction<boolean>>;
    participants: Participant[];
}
export const EventSidebar = ({ fragmentRef, participants }: EventSidebarProps) => {
    const theme = useTheme();
    const mdUpBreakpoint = useMediaQuery(theme.breakpoints.up('md'));
    const smDownBreakpoint = useMediaQuery(theme.breakpoints.down('sm'));
    const data = useFragment(EVENT_SIDEBAR_FRAGMENT, fragmentRef);
    const sessionStorageTab = sessionStorage.getItem('eventSidebarSelectedTab');
    const [selectedTab, setSelectedTab] = React.useState<number>(sessionStorageTab ? Number(sessionStorageTab) : 0);
    const [isFeedbackPromptResponseOpen, openFeedbackPromptResponse, closeFeedbackPromptResponse] =
        useResponsiveDialog();
    const [isFeedbackPromptResultsOpen, openFeedbackPromptResults, closeFeedbackPromptResults] = useResponsiveDialog();
    const eventId = data.id;
    useBroadcastMessageSnack();

    // Subscribe to live feedback prompts
    const { feedbackPromptRef } = useLiveFeedbackPrompt({ openFeedbackPromptResponse });
    const { feedbackPromptResultsRef } = useLiveFeedbackPromptResultsShared({
        openFeedbackPromptResults,
    });

    const handleTabChange = (e: React.SyntheticEvent, newTab: number) => {
        setSelectedTab(newTab);
        sessionStorage.setItem('eventSidebarSelectedTab', newTab.toString());
    };

    // Event Info Poppers
    const [currentPopper] = useEventInfoPopper();
    const questionTabRef = React.useRef<HTMLDivElement | null>(null);
    const feedbackTabRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        switch (currentPopper) {
            case 1:
                const viewedEventPopperQuestionStage = localStorage.getItem('eventInfoPopperViewedStage2');
                if (viewedEventPopperQuestionStage === 'true') break;
                setSelectedTab(0);
                break;
            case 2:
                // Check if user has viewed the feedback popper already to avoid unnecessary tab switching
                const viewedEventPopperFeedbackStage = localStorage.getItem('eventInfoPopperViewedStage3');
                if (viewedEventPopperFeedbackStage === 'true') break;
                setSelectedTab(1);
                break;
            default:
                const previousTab = sessionStorage.getItem('eventSidebarSelectedTab');
                setSelectedTab(previousTab ? Number(previousTab) : 0);
                break;
        }
    }, [currentPopper]);

    const [numOfFeedbackMsgs, setNumOfFeedbackMsgs] = React.useState<number>(0);
    const feedbackTabLabel = React.useMemo(() => {
        if (smDownBreakpoint) {
            return (
                <React.Fragment>
                    <Typography variant='caption'>Messages</Typography>
                    <Badge
                        badgeContent={numOfFeedbackMsgs}
                        color='error'
                        sx={{ transform: 'translate(35px, -23px)' }}
                    />
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                Messages
                <Badge badgeContent={numOfFeedbackMsgs} color='error' sx={{ transform: 'translate(40px, -23px)' }} />
            </React.Fragment>
        );
    }, [numOfFeedbackMsgs, smDownBreakpoint]);

    return (
        <Grid
            container
            height='100%'
            padding={mdUpBreakpoint ? theme.spacing(0, 0, 0, 1) : theme.spacing(0)}
            maxWidth={'100%'}
            sx={{
                '& > *': {
                    marginBottom: theme.spacing(1),
                    width: '100%',
                },
            }}
            direction='column'
            alignContent='flex-start'
            alignItems='flex-start'
            wrap='nowrap'
        >
            <SubmitLiveFeedbackPromptResponse
                eventId={eventId}
                promptRef={feedbackPromptRef}
                isOpen={isFeedbackPromptResponseOpen}
                open={openFeedbackPromptResponse}
                close={closeFeedbackPromptResponse}
            />
            <ViewLiveFeedbackPromptResults
                promptRef={feedbackPromptResultsRef}
                open={isFeedbackPromptResultsOpen}
                setOpen={openFeedbackPromptResults}
                close={closeFeedbackPromptResults}
            />
            <Grid item>
                <QuestionCarousel fragmentRef={data} />
            </Grid>
            <Grid
                item
                container
                display='flex'
                direction='column'
                justifyContent='flex-start'
                flexGrow={1}
                width='100%'
            >
                <StyledTabs
                    value={selectedTab}
                    props={{
                        onChange: handleTabChange,
                        'aria-label': 'bottom tabs',
                        centered: true,
                    }}
                >
                    <Tab
                        id='question-tab'
                        label={smDownBreakpoint ? <Typography variant='caption'>Questions</Typography> : 'Questions'}
                        value={0}
                        ref={questionTabRef}
                        sx={{
                            zIndex: currentPopper === EventInfoPopperStage.Questions ? theme.zIndex.drawer + 2 : 0,
                            ariaControls: 'question-tabpanel-0',
                        }}
                    />
                    <Tab
                        id='feedback-tab'
                        label={feedbackTabLabel}
                        value={1}
                        ref={feedbackTabRef}
                        sx={{
                            zIndex: currentPopper === EventInfoPopperStage.Feedback ? theme.zIndex.drawer + 2 : 0,
                            ariaControls: 'feedback-tabpanel-1',
                            overflow: 'visible', // Prevents badge from being cut off
                        }}
                    />
                    <Tab
                        id='participants-tab'
                        label={
                            smDownBreakpoint ? <Typography variant='caption'>Participants</Typography> : 'Participants'
                        }
                        value={2}
                        sx={{
                            ariaControls: 'participants-tabpanel-2',
                            overflow: 'visible', // Prevents badge from being cut off
                        }}
                    />
                </StyledTabs>
                <EventQuestionInfoPopper questionContainerRef={questionTabRef} />
                <EventFeedbackInfoPopper feedbackContainerRef={feedbackTabRef} />
                <StyledColumnGrid
                    props={{
                        id: 'scrollable-tab',
                        minHeight: '500px',
                        display: 'flex',
                        flexGrow: 1,
                        padding: 0,
                    }}
                    scrollable={selectedTab === 2}
                >
                    <QuestionListContainer fragmentRef={data} isVisible={selectedTab === 0} searchOnly={false} />
                    <LiveFeedbackList
                        fragmentRef={data}
                        isVisible={selectedTab === 1}
                        setNumOfFeedbackMsgs={setNumOfFeedbackMsgs}
                    />
                    <ParticipantList participants={participants} isVisible={selectedTab === 2} />
                </StyledColumnGrid>
            </Grid>
        </Grid>
    );
};
