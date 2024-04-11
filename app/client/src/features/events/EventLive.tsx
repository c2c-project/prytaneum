/* eslint-disable react/prop-types */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { Grid, useMediaQuery } from '@mui/material';
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

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            flexWrap: 'nowrap',
        },
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            overflowY: 'scroll',
            flexWrap: 'nowrap',
        },
    },
    panes: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        // [theme.breakpoints.up('md')]: {
        //     overflowY: 'scroll',
        // },
    },
    video: {
        [theme.breakpoints.down('md')]: {
            position: 'sticky',
            top: 0,
            zIndex: theme.zIndex.appBar,
        },
    },
    target: {
        scrollMarginTop: '1rem',
    },
}));

export const EVENT_LIVE_QUERY = graphql`
    query EventLiveQuery($eventId: ID!) {
        node(id: $eventId) {
            id
            ... on Event {
                isViewerModerator
                ...EventSidebarFragment
                ...useBroadcastMessageListFragment
                ...EventVideoFragment
                ...useEventDetailsFragment
                ...SpeakerListFragment
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
    const isModerator = Boolean(node.isViewerModerator);
    const { user } = useUser();
    const { id: eventId } = eventData;

    const { pausePingEvent, resumePingEvent } = usePingEvent(eventId);

    const pauseParentRefreshing = React.useCallback(() => {
        pauseEventDetailsRefresh();
        pausePingEvent();
    }, [pauseEventDetailsRefresh, pausePingEvent]);

    const resumeParentRefreshing = React.useCallback(() => {
        resumeEventDetailsRefresh();
        resumePingEvent();
    }, [resumeEventDetailsRefresh, resumePingEvent]);

    // Handle private events and token validation
    React.useEffect(() => {
        if (eventData.isViewerModerator) {
            setValidationChecked(true);
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
    }, [displaySnack, eventData, router, tokenProvided, user, validateInvite]);

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
    const classes = useStyles();
    const theme = useTheme();

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
            }}
        >
            <Grid component={motion.div} key='townhall-live' container className={classes.root} onScroll={handleScroll}>
                {!isMdUp && <div ref={topRef} />}
                <Grid container item md={8} direction='column' wrap='nowrap'>
                    <Grid item className={classes.video}>
                        <EventVideo fragmentRef={node} />
                    </Grid>
                    <EventDetailsCard eventData={eventData} />
                    <SpeakerList fragmentRef={node} />
                </Grid>
                <Grid container item xs={12} md={4} direction='column'>
                    <div className={classes.panes} id='event-sidebar-scroller' onScroll={handleScroll}>
                        {/* {isMdUp && <div ref={topRef} className={classes.target} />} */}
                        <EventSidebar
                            fragmentRef={node}
                            isViewerModerator={isModerator}
                            isLive={isLive}
                            setIsLive={setIsLive}
                        />
                    </div>
                </Grid>
                <Fab onClick={handleClick} ZoomProps={{ in: isFabVisible }}>
                    <KeyboardArrowUpIcon />
                </Fab>
            </Grid>
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
    const [eventLiveQueryRef, loadEventQuery, disposeQuery] = useQueryLoader<EventLiveQuery>(EVENT_LIVE_QUERY);
    const [validateInviteQueryRef, loadInviteQuery] = useQueryLoader<ValidateInviteQuery>(VALIDATE_INVITE_QUERY);

    React.useEffect(() => {
        if (!eventLiveQueryRef) loadEventQuery({ eventId });
    }, [eventId, eventLiveQueryRef, loadEventQuery]);

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
