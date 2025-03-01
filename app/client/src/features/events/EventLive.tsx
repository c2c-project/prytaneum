/* eslint-disable react/prop-types */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Tooltip, Typography, useMediaQuery } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { motion } from 'framer-motion';
import { graphql, useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import type { FragmentRefs } from 'relay-runtime';
import { Loader } from '@local/components/Loader';
import { useRouter } from 'next/router';

import type { EventLiveQuery } from '@local/__generated__/EventLiveQuery.graphql';
import { Fab } from '@local/components/Fab';
import { EventSidebar, EventVideo, EventContext } from '@local/features/events';
import { ValidateInviteQuery } from '@local/__generated__/ValidateInviteQuery.graphql';
import { VALIDATE_INVITE_QUERY } from './Invites/ValidateInvite';
import { EventDetailsCard } from './EventDetailsCard';
import { SpeakerList } from './Speakers';
import { useSnack } from '@local/core';
import { useUser } from '../accounts';
import { useEventDetails } from './useEventDetails';
import { usePingEvent } from './Participants/usePingEvent';
import { useHashedColor } from '@local/core/getHashedColor';
import { EventTopicContext } from './ModeratorView/EventTopicContext';
import { useParticipantList } from './Participants/useParticipantList';
import GoogleMeet from '../google-meet/GoogleMeet';

export const EVENT_LIVE_QUERY = graphql`
    query EventLiveQuery($eventId: ID!, $lang: String!) {
        node(id: $eventId) {
            id
            ... on Event {
                isViewerModerator
                ...useGoogleMeetFragment
                ...EventSidebarFragment
                ...useBroadcastMessageListFragment
                ...EventVideoFragment
                ...useEventDetailsFragment
                ...SpeakerListFragment
                ...useOnDeckFragment @arguments(userLang: $lang)
                ...useParticipantListFragment @arguments(eventId: $eventId)
            }
        }
    }
`;

export function EventLiveLoader() {
    return <Loader />;
}

type Node = {
    readonly id: string;
    readonly isViewerModerator?: boolean | null | undefined;
    readonly isActive?: boolean | null | undefined;
    readonly ' $fragmentSpreads': FragmentRefs<any>;
};

type ValidateInvite = {
    readonly user: {
        readonly avatar: string | null;
        readonly email: string | null;
        readonly firstName: string | null;
        readonly id: string;
        readonly isAdmin: boolean | null;
        readonly lastName: string | null;
    } | null;
    readonly valid: boolean;
};

interface EventLiveProps {
    node: Node;
    validateInvite: ValidateInvite;
    tokenProvided: boolean;
}

function EventLive({ node, validateInvite, tokenProvided }: EventLiveProps) {
    const router = useRouter();
    const { displaySnack } = useSnack();
    const [routeChecked, setRouteChecked] = React.useState(false);
    const [validationChecked, setValidationChecked] = React.useState(false);
    const { eventData, isLive, setIsLive, pauseEventDetailsRefresh, resumeEventDetailsRefresh } = useEventDetails({
        fragmentRef: node,
    });
    const { participants } = useParticipantList({ fragmentRef: node, eventId: node.id });
    const numOfParticipants = participants.length;
    const isModerator = Boolean(node.isViewerModerator);
    const { user } = useUser();
    const { id: eventId } = eventData;
    useHashedColor();

    // NOTE: Defaults to paused, use startPingEvent to start pinging once participant is validated
    // since we only want participants on the live page to ping the server, thus avoiding unnecessary pings on pre/post event pages
    // If this was defaulted to true, it would ping the server even if the user is redirected to a different page after validation
    const { pausePingEvent, resumePingEvent, startPingEvent } = usePingEvent(eventId);

    const pauseParentRefreshing = React.useCallback(() => {
        pauseEventDetailsRefresh();
        pausePingEvent();
    }, [pauseEventDetailsRefresh, pausePingEvent]);

    const resumeParentRefreshing = React.useCallback(() => {
        resumeEventDetailsRefresh();
        resumePingEvent();
    }, [resumeEventDetailsRefresh, resumePingEvent]);

    React.useEffect(() => {
        if (routeChecked && validationChecked) startPingEvent();
    }, [routeChecked, startPingEvent, validationChecked]);

    // Handle private events and token validation
    React.useEffect(() => {
        if (eventData.isViewerModerator) {
            router.push(`/events/${eventId}/new-mod`);
            return;
        }
        if (!validateInvite?.valid && eventData.isPrivate === true) {
            if (eventData.isViewerInvited === true) {
                setValidationChecked(true);
                return;
            }
            if (tokenProvided) displaySnack('Invalid invite token.', { variant: 'error' });
            else displaySnack('You do not have permission to join this private event.', { variant: 'error' });
            router.push('/');
        }
        // Ensure user is logged in if invite is valid (Do not reload if user is already logged in)
        if (user === null && validateInvite?.valid && validateInvite?.user !== null) router.reload();
        else setValidationChecked(true);
    }, [displaySnack, eventData, eventId, router, tokenProvided, user, validateInvite]);

    React.useEffect(() => {
        if (!validationChecked) return;
        if (isLive || isModerator) {
            setRouteChecked(true);
            return;
        }
        const { startDateTime, endDateTime } = eventData;
        if (startDateTime !== null && endDateTime !== null) {
            const now = new Date();
            const startTime = new Date(startDateTime);
            const endTime = new Date(endDateTime);
            const eventLengthInSeconds = (endTime.getTime() - startTime.getTime()) / 1000;
            const eventLengthInMinutes = eventLengthInSeconds / 60;
            const middleTime = new Date(startTime);
            middleTime.setUTCMinutes(startTime.getUTCMinutes() + eventLengthInMinutes / 2);
            if (now > middleTime) {
                router.push(`/events/${eventId}/post`);
            } else {
                router.push(`/events/${eventId}/pre`);
            }
        } else {
            router.push(`/events/${eventId}/pre`);
        }
    }, [eventId, isLive, isModerator, router, eventData, validationChecked]);

    // styles
    const theme = useTheme();
    const mdBreakpointUp = useMediaQuery(theme.breakpoints.up('md'));

    // references for scrolling
    const topRef = React.useRef<HTMLDivElement | null>(null);
    const [isFabVisible, setIsFabVisible] = React.useState(false);

    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    // increase the distance required to show the scroll to top fab
    // because of on screen keyboards on mobile
    const distance = React.useMemo(() => (isMdUp ? 500 : 800), [isMdUp]);

    const handleScroll = () => {
        const top = topRef.current?.getBoundingClientRect()?.top;
        if (top && top < -distance) {
            setIsFabVisible(true);
        } else {
            setIsFabVisible(false);
        }
    };

    const handleClick = () => {
        topRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
        });
    };

    if (!routeChecked || !validationChecked) return <Loader />;

    return (
        <EventContext.Provider
            value={{
                eventId: node.id,
                isModerator: Boolean(node.isViewerModerator),
                pauseParentRefreshing,
                resumeParentRefreshing,
                eventData,
            }}
        >
            <EventTopicContext.Provider value={{ topic: 'default', topics: [] }}>
                <Grid
                    component={motion.div}
                    key='townhall-live'
                    container
                    sx={[
                        {
                            height: '100%',
                            flexDirection: 'column',
                            flexWrap: 'nowrap',
                        },
                        mdBreakpointUp && {
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                        },
                    ]}
                    onScroll={handleScroll}
                >
                    {!isMdUp && <div ref={topRef} />}
                    <Grid container item md={8} direction='column' wrap='nowrap'>
                        <Grid
                            item
                            sx={{
                                [theme.breakpoints.down('md')]: {
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: theme.zIndex.appBar,
                                },
                                display: eventData.eventType === 'GOOGLE_MEET' ? 'flex' : 'inline',
                                flex: eventData.eventType === 'GOOGLE_MEET' ? 1 : 'none',
                                minHeight: eventData.eventType === 'GOOGLE_MEET' ? '700px' : '0px',
                            }}
                        >
                            {eventData.eventType === 'GOOGLE_MEET' ? (
                                <div id='google-meet' className='meet-frame' style={{ height: '100%', width: '100%' }}>
                                    <GoogleMeet fragmentRef={node} />
                                </div>
                            ) : (
                                <EventVideo fragmentRef={node} />
                            )}
                        </Grid>
                        <Grid container item sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '1rem' }}>
                            <Tooltip title='Total Active Participants' placement='top'>
                                <PersonIcon sx={{ color: 'red', marginLeft: '0.25rem' }} />
                            </Tooltip>
                            <Tooltip title={`${numOfParticipants} Participants`} placement='top'>
                                <Typography color='error'>{numOfParticipants}</Typography>
                            </Tooltip>
                        </Grid>
                        <EventDetailsCard eventData={eventData} />
                        <SpeakerList fragmentRef={node} />
                        <div style={{ height: '1rem' }} />
                    </Grid>
                    <Grid container item xs={12} md={4} direction='column'>
                        <div
                            style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
                            id='event-sidebar-scroller'
                            onScroll={handleScroll}
                        >
                            {/* {isMdUp && <div ref={topRef} className={classes.target} />} */}
                            <EventSidebar
                                fragmentRef={node}
                                isViewerModerator={isModerator}
                                isLive={isLive}
                                setIsLive={setIsLive}
                                participants={participants}
                            />
                        </div>
                    </Grid>
                    <Fab onClick={handleClick} ZoomProps={{ in: isFabVisible }}>
                        <KeyboardArrowUpIcon />
                    </Fab>
                </Grid>
            </EventTopicContext.Provider>
        </EventContext.Provider>
    );
}

interface EventLiveContainerProps {
    eventLiveQueryRef: PreloadedQuery<EventLiveQuery>;
    validateInviteQueryRef: PreloadedQuery<ValidateInviteQuery>;
    tokenProvided: boolean;
}

function EventLiveContainer({ eventLiveQueryRef, validateInviteQueryRef, tokenProvided }: EventLiveContainerProps) {
    const { node } = usePreloadedQuery(EVENT_LIVE_QUERY, eventLiveQueryRef);
    const { validateInvite } = usePreloadedQuery(VALIDATE_INVITE_QUERY, validateInviteQueryRef);

    if (!node || !validateInvite) return <Loader />;

    return <EventLive node={node} validateInvite={validateInvite} tokenProvided={tokenProvided} />;
}

export interface PreloadedEventLiveProps {
    eventId: string;
    token?: string;
}

export function PreloadedEventLive({ eventId, token }: PreloadedEventLiveProps) {
    const { user, isLoading } = useUser();
    const [eventLiveQueryRef, loadEventQuery, disposeQuery] = useQueryLoader<EventLiveQuery>(EVENT_LIVE_QUERY);
    const [validateInviteQueryRef, loadInviteQuery] = useQueryLoader<ValidateInviteQuery>(VALIDATE_INVITE_QUERY);

    React.useEffect(() => {
        if (isLoading) return;
        if (!eventLiveQueryRef) loadEventQuery({ eventId, lang: user?.preferredLang || 'EN' });
    }, [eventId, eventLiveQueryRef, isLoading, loadEventQuery, user?.preferredLang]);

    React.useEffect(() => {
        if (!token && !validateInviteQueryRef) loadInviteQuery({ token: '', eventId });
        if (token && !validateInviteQueryRef) loadInviteQuery({ token, eventId });
    }, [validateInviteQueryRef, loadInviteQuery, eventId, token]);

    React.useEffect(() => {
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!eventLiveQueryRef || !validateInviteQueryRef) return <Loader />;
    return (
        <EventLiveContainer
            eventLiveQueryRef={eventLiveQueryRef}
            validateInviteQueryRef={validateInviteQueryRef}
            tokenProvided={!!token}
        />
    );
}
