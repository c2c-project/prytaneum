import React from 'react';
import { useRouter } from 'next/router';
import { graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import { Divider, Grid, Paper, Tab, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { EventPostQuery } from '@local/__generated__/EventPostQuery.graphql';
import { EventContext } from './EventContext';
import { ConditionalRender } from '../../components/ConditionalRender';
import { Loader } from '@local/components';
import { LiveFeedbackList } from './LiveFeedback';
import { FragmentRefs } from 'relay-runtime';
import { EventDetailsCard } from './EventDetailsCard';
import { SpeakerList } from './Speakers';
import { useEventDetails } from './useEventDetails';
import { QuestionListContainer } from './Questions/QuestionList/QuestionList';
import { VideoModal } from './Videos/VideoModal';
import PostEventFeedback from './PostEventFeedback/PostEventFeedback';
import { StyledTabs } from '@local/components/StyledTabs';
import { StyledColumnGrid } from '@local/components/StyledColumnGrid';
import { useUser } from '../accounts';

const EVENT_POST_QUERY = graphql`
    query EventPostQuery($eventId: ID!, $lang: String!) {
        node(id: $eventId) {
            id
            ... on Event {
                ...useQuestionListFragment @arguments(userLang: $lang)
                ...useLiveFeedbackListFragment @arguments(eventId: $eventId)
                ...useEventDetailsFragment
                ...SpeakerListFragment
                ...EventVideoFragment
            }
        }
    }
`;

export interface EventPostProps {
    node: {
        readonly id: string;
        readonly ' $fragmentSpreads': FragmentRefs<any>;
    };
}

export function EventPost({ node }: EventPostProps) {
    const theme = useTheme();
    const lgDownBreakpoint = useMediaQuery(theme.breakpoints.down('lg'));
    const mdDownBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    const [tab, setTab] = React.useState<'Questions' | 'Feedback'>('Questions');
    const [routeChecked, setRouteChecked] = React.useState(false);
    const { eventData, isLive } = useEventDetails({ fragmentRef: node });
    const eventId = eventData.id;

    // TODO: add is private event check
    React.useEffect(() => {
        if (isLive || eventData.isViewerModerator) {
            router.push(`/events/${eventId}/live`);
        }
        if (eventData.startDateTime === null) {
            setRouteChecked(true);
            return;
        }
        const now = new Date();
        const startTime = new Date(eventData.startDateTime);
        if (!isLive && now < startTime) {
            router.push(`/events/${eventId}/pre`);
        }
        setRouteChecked(true);
    }, [eventData.isViewerModerator, eventData.startDateTime, eventId, isLive, router]);

    const handleChange = (e: React.SyntheticEvent, newTab: 'Questions' | 'Feedback') => {
        e.preventDefault();
        setTab(newTab);
    };

    if (!routeChecked) return <Loader />;

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
                        <Typography variant='h4'>Event Ended</Typography>
                        <Grid item paddingTop='1rem'>
                            <Typography variant='h5'>
                                This event is now over, thank you for participating! If you would like to view this
                                event again in archived mode or want to submit post-event feedback, check out the
                                “Post-Event Resources” below. Questions and feedback given during this event can be
                                viewed on the window to the right.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item className='Event Details'>
                        <Typography variant='h4'>Event Details</Typography>
                        <Paper style={{ width: '100%', height: '250px', overflowY: 'auto' }}>
                            <Grid container height='100%' justifyContent='center' alignItems='center'>
                                <Grid item>
                                    <EventDetailsCard eventData={eventData} />
                                    <Divider style={{ background: 'black' }} />
                                    <SpeakerList fragmentRef={node} />
                                    {/* TODO: add Organizers List */}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item className='Resources'>
                        <Typography variant='h4'>Post-Event Resources</Typography>
                        <Grid container justifyContent='space-around' width='100%' marginTop='1rem'>
                            <Grid item>
                                <VideoModal fragmentRef={node} />
                            </Grid>
                            <Grid item>
                                <PostEventFeedback eventId={eventId} />
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
                    flexWrap='nowrap'
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
                    <Grid item container direction='column' width='100%' display='flex' flexGrow={1}>
                        <StyledTabs value={tab} props={{ onChange: handleChange, 'aria-label': 'tabs' }}>
                            <Tab label='Questions' value='Questions' />
                            <Tab label='Feedback' value='Feedback' />
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
                            <QuestionListContainer
                                fragmentRef={node}
                                isVisible={tab === 'Questions'}
                                askQuestionEnabled={false}
                                searchOnly={true}
                            />
                            <LiveFeedbackList fragmentRef={node} isVisible={tab === 'Feedback'} />
                        </StyledColumnGrid>
                    </Grid>
                </Grid>
            </Grid>
        </EventContext.Provider>
    );
}

export interface EventPostContainerProps {
    queryRef: PreloadedQuery<EventPostQuery>;
}

function EventPostContainer({ queryRef }: EventPostContainerProps) {
    const { node } = usePreloadedQuery(EVENT_POST_QUERY, queryRef);

    if (!node) return <Loader />;

    return <EventPost node={node} />;
}

export interface PreloadedEventPostProps {
    eventId: string;
}

export function PreloadedEventPost({ eventId }: PreloadedEventPostProps) {
    const { user, isLoading } = useUser();
    const [queryRef, loadQuery, disposeQuery] = useQueryLoader<EventPostQuery>(EVENT_POST_QUERY);

    React.useEffect(() => {
        if (isLoading) return;
        if (!queryRef) loadQuery({ eventId, lang: user?.preferredLang || 'EN' });
    }, [eventId, queryRef, loadQuery, isLoading, user?.preferredLang]);

    React.useEffect(() => {
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!queryRef) return <Loader />;

    return (
        <ConditionalRender client>
            <React.Suspense fallback={<EventPostContainer queryRef={queryRef} />}>
                <EventPostContainer queryRef={queryRef} />
            </React.Suspense>
        </ConditionalRender>
    );
}
