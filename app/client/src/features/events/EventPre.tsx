import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import { Badge, Button, Divider, Grid, Paper, Tab, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

import { CountdownWrapper } from '@local/components/Countdown';
import { EventPreQuery } from '@local/__generated__/EventPreQuery.graphql';
import { EventContext } from './EventContext';
import { ConditionalRender } from '../../components/ConditionalRender';
import { Loader } from '@local/components';
import { LiveFeedbackList } from './LiveFeedback';
import { FragmentRefs } from 'relay-runtime';
import { EventDetailsCard } from './EventDetailsCard';
import { SpeakerList } from './Speakers';
import { useEventDetails } from './useEventDetails';
import { PreloadedLiveMessages } from './BroadcastMessages/LiveMessages';
import { StyledTabs } from '@local/components/StyledTabs';
import { StyledColumnGrid } from '@local/components/StyledColumnGrid';
import { EventIssueGuideViewer } from './EventIssueGuide/EventIssueGuideViewer';
import { useUser } from '../accounts';
import { ViewerOnlyQuestionListContainer } from './Questions/ViewerOnlyQuestionList/ViewerOnlyQuestionList';

const EVENT_PRE_QUERY = graphql`
    query EventPreQuery($eventId: ID!, $lang: String!) {
        node(id: $eventId) {
            id
            ... on Event {
                ...useViewerOnlyQuestionListFragment @arguments(userLang: $lang)
                ...useLiveFeedbackListFragment @arguments(eventId: $eventId)
                ...useEventDetailsFragment
                ...SpeakerListFragment
            }
        }
    }
`;

export interface EventPreProps {
    fragmentRef: {
        readonly id: string;
        readonly ' $fragmentSpreads': FragmentRefs<any>;
    };
}

export function EventPre({ fragmentRef }: EventPreProps) {
    const theme = useTheme();
    const lgDownBreakpoint = useMediaQuery(theme.breakpoints.down('lg'));
    const router = useRouter();
    const mdDownBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
    const [tab, setTab] = React.useState<'Questions' | 'Feedback'>('Questions');
    const { user } = useUser();
    const { eventData } = useEventDetails({ fragmentRef });
    const { id: eventId, isActive, isViewerModerator } = eventData;
    const [numOfFeedbackMsgs, setNumOfFeedbackMsgs] = React.useState<number>(0);
    // used to create the countdown component
    const date = eventData.startDateTime as Date;

    // TODO: add is private event check
    React.useEffect(() => {
        if (isActive || isViewerModerator) router.push(`/events/${eventId}/live`);
        if (!eventData.endDateTime) return;
        const now = new Date();
        const endTime = new Date(eventData.endDateTime);
        if (!isActive && now > endTime) router.push(`/events/${eventId}/post`);
    }, [eventData.endDateTime, eventId, isActive, isViewerModerator, router]);

    const handleChange = (e: React.SyntheticEvent, newTab: 'Questions' | 'Feedback') => {
        e.preventDefault();
        setTab(newTab);
    };

    return (
        <EventContext.Provider
            value={{
                eventId: eventData.id,
                isModerator: Boolean(eventData.isViewerModerator),
                pauseParentRefreshing: () => {},
                resumeParentRefreshing: () => {},
                eventData,
            }}
        >
            <Grid container spacing={2} columns={16} height='100%'>
                {/* Column 1 */}
                <Grid
                    item
                    container
                    xs={mdDownBreakpoint ? 16 : 6}
                    direction='column'
                    justifyContent='space-around'
                    marginLeft={mdDownBreakpoint ? '0' : '3rem'}
                >
                    <Grid item container className='Upcoming Event Text'>
                        <Typography variant='h4'>Upcoming Event</Typography>
                        <Grid item paddingTop='1rem'>
                            <Typography variant='h5'>
                                This event will start on{' '}
                                {new Date(date).toLocaleDateString('en-US', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })}{' '}
                                at{' '}
                                {new Date(date).toLocaleTimeString('en-US', {
                                    timeZoneName: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                                , thank you for joining!{' '}
                                {!user
                                    ? ' Please create an account (using the top right button) or log in to participate.'
                                    : 'Please feel free to ask questions or provide feedback before the event starts.'}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item className='Event Details'>
                        <Typography variant='h4'>Event Details</Typography>
                        <Paper
                            sx={{
                                width: '100%',
                                height: '250px',
                                overflowY: 'auto',
                            }}
                        >
                            <Grid container height='100%' justifyContent='center' alignItems='center'>
                                <Grid item>
                                    <EventDetailsCard eventData={eventData} />
                                    <Divider style={{ background: 'black' }} />
                                    <SpeakerList fragmentRef={fragmentRef} />
                                    {/* TODO: add Organizers List */}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item className='Event Updates'>
                        <Typography variant='h4'>Event Updates</Typography>
                        <PreloadedLiveMessages />
                    </Grid>
                    <Grid item className='Resources'>
                        <Typography variant='h4'>Resources</Typography>
                        <Grid container justifyContent='space-around' width='100%' marginTop='1rem'>
                            <Grid item>
                                <EventIssueGuideViewer url={eventData.issueGuideUrl} title={eventData.title} />
                            </Grid>
                            <Grid item>
                                <Link href='/guides/participant'>
                                    <Button variant='contained'>
                                        <PersonIcon sx={{ marginRight: '0.5rem' }} />
                                        Participant Guide
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Column 2 */}
                <Grid
                    item
                    container
                    xs={mdDownBreakpoint ? 16 : 5}
                    direction='column'
                    wrap='nowrap'
                    marginLeft={lgDownBreakpoint ? 0 : 2}
                >
                    <Grid
                        item
                        container
                        className='Pre-Event-Prytaneum-Logo'
                        justifyContent='center'
                        marginTop='2rem'
                        marginBottom='2rem'
                    >
                        <img width='60%' src='/static/prytaneum_logo2.svg' alt='Prytaneum Logo' />
                    </Grid>
                    <Grid item container className='Countdown' justifyContent='center' alignContent='center'>
                        <Paper
                            style={{
                                marginBottom: '2rem',
                                paddingLeft: '25px',
                                paddingRight: '25px',
                                minWidth: '300px',
                            }}
                        >
                            <CountdownWrapper date={date} />
                        </Paper>
                    </Grid>
                    <Grid item container direction='column' width='100%' display='flex' flexGrow={1}>
                        <StyledTabs value={tab} props={{ onChange: handleChange, 'aria-label': 'tabs' }}>
                            <Tab label='Questions' value='Questions' />
                            <Tab
                                label={
                                    <React.Fragment>
                                        Feedback
                                        <Badge
                                            badgeContent={numOfFeedbackMsgs}
                                            color='error'
                                            sx={{ transform: 'translate(40px, -23px)' }}
                                        />
                                    </React.Fragment>
                                }
                                value='Feedback'
                                sx={{
                                    overflow: 'visible', // This is needed to show the badge
                                }}
                            />
                            {eventData.isViewerModerator === true && <Tab label='Broadcast' value='Broadcast' />}
                        </StyledTabs>
                        <StyledColumnGrid
                            props={{
                                id: 'scrollable-tab',
                                minHeight: '600px',
                                maxHeight: '100%',
                                display: 'flex',
                                flexGrow: 1,
                                padding: 0,
                            }}
                            scrollable={false}
                        >
                            <ViewerOnlyQuestionListContainer
                                fragmentRef={fragmentRef}
                                isVisible={tab === 'Questions'}
                            />
                            <LiveFeedbackList
                                fragmentRef={fragmentRef}
                                isVisible={tab === 'Feedback'}
                                setNumOfFeedbackMsgs={setNumOfFeedbackMsgs}
                            />
                        </StyledColumnGrid>
                    </Grid>
                </Grid>
            </Grid>
        </EventContext.Provider>
    );
}

export interface EventPreContainerProps {
    queryRef: PreloadedQuery<EventPreQuery>;
}

function EventPreContainer({ queryRef }: EventPreContainerProps) {
    const { node } = usePreloadedQuery(EVENT_PRE_QUERY, queryRef);

    if (!node) return <Loader />;

    return <EventPre fragmentRef={node} />;
}

export interface PreloadedEventPreProps {
    eventId: string;
}

export function PreloadedEventPre({ eventId }: PreloadedEventPreProps) {
    const { user, isLoading } = useUser();
    const [eventLiveQueryRef, loadEventQuery, disposeQuery] = useQueryLoader<EventPreQuery>(EVENT_PRE_QUERY);

    React.useEffect(() => {
        if (isLoading) return;
        loadEventQuery({ eventId, lang: user?.preferredLang || 'EN' });
    }, [eventId, loadEventQuery, isLoading, user?.preferredLang]);

    React.useEffect(() => {
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!eventLiveQueryRef) return <Loader />;
    return (
        <ConditionalRender client>
            <React.Suspense fallback={<EventPreContainer queryRef={eventLiveQueryRef} />}>
                <EventPreContainer queryRef={eventLiveQueryRef} />
            </React.Suspense>
        </ConditionalRender>
    );
}
