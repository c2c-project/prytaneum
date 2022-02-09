/* eslint-disable react/prop-types */
import * as React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { motion } from 'framer-motion';
import { graphql, useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Loader } from '@local/components/Loader';

import type { EventLiveQuery } from '@local/__generated__/EventLiveQuery.graphql';
import { Fab } from '@local/components/Fab';
import { EventSidebar, EventVideo, EventContext, EventSidebarLoader } from '@local/features/events';
import { ValidateInviteQuery } from '@local/__generated__/ValidateInviteQuery.graphql';
import { VALIDATE_INVITE_QUERY } from './Invites/ValidateInvite';
import { EventDetailsCard } from './EventDetailsCard';
import { SpeakerList } from './Speakers';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            flexWrap: 'nowrap',
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            overflowY: 'scroll',
            flexWrap: 'nowrap',
        },
    },
    panes: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            overflowY: 'scroll',
        },
    },
    video: {
        [theme.breakpoints.down('sm')]: {
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
                ...EventVideoFragment
                ...EventDetailsCardFragment
                ...SpeakerListFragment
            }
        }
    }
`;

export function EventLiveLoader() {
    return <Loader />;
}

export interface PreloadedEventLiveProps {
    eventId: string;
    token?: string;
}

export interface EventLiveProps {
    eventLiveQueryRef: PreloadedQuery<EventLiveQuery>;
    validateInviteQueryRef: PreloadedQuery<ValidateInviteQuery>;
}

export function EventLive({ eventLiveQueryRef, validateInviteQueryRef }: EventLiveProps) {
    const { node } = usePreloadedQuery(EVENT_LIVE_QUERY, eventLiveQueryRef);
    const { validateInvite } = usePreloadedQuery(VALIDATE_INVITE_QUERY, validateInviteQueryRef);
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

    React.useEffect(() => {
        const { valid } = validateInvite;
        console.log(valid);
        // Check if event is private
        // If private, check if valid & redirect if invalid
    }, [validateInvite]);

    if (!node) return <EventSidebarLoader />;

    return (
        <EventContext.Provider value={{ eventId: node.id, isModerator: Boolean(node.isViewerModerator) }}>
            <Grid component={motion.div} key='townhall-live' container className={classes.root} onScroll={handleScroll}>
                {!isMdUp && <div ref={topRef} />}
                <Grid
                    container item
                    md={8}
                    direction='column'
                    wrap='nowrap'
                >
                    <Grid item className={classes.video}>
                        <EventVideo fragmentRef={node} />
                    </Grid>
                    <EventDetailsCard fragmentRef={node} />
                    <SpeakerList fragmentRef={node} />
                </Grid>
                <Grid container item xs={12} md={4} direction='column'>
                    <div className={classes.panes} onScroll={handleScroll}>
                        {isMdUp && <div ref={topRef} className={classes.target} />}
                        <EventSidebar fragmentRef={node} />
                    </div>
                </Grid>
                <Fab onClick={handleClick} ZoomProps={{ in: isFabVisible }}>
                    <KeyboardArrowUpIcon />
                </Fab>
            </Grid>
        </EventContext.Provider>
    );
}

export function PreloadedEventLive({ eventId, token }: PreloadedEventLiveProps) {
    const [eventLiveQueryRef, loadEventQuery] = useQueryLoader<EventLiveQuery>(EVENT_LIVE_QUERY);
    const [validateInviteQueryRef, loadInviteQuery] = useQueryLoader<ValidateInviteQuery>(VALIDATE_INVITE_QUERY);

    React.useEffect(() => {
        if (!eventLiveQueryRef) loadEventQuery({ eventId });
    }, [eventLiveQueryRef, loadEventQuery, eventId]);

    React.useEffect(() => {
        if (!token && !validateInviteQueryRef) loadInviteQuery({ token: '', eventId });
        if (token && !validateInviteQueryRef) loadInviteQuery({ token, eventId });
    }, [validateInviteQueryRef, loadInviteQuery, eventId, token]);

    if (!eventLiveQueryRef || !validateInviteQueryRef) return <EventSidebarLoader />;

    return <EventLive eventLiveQueryRef={eventLiveQueryRef} validateInviteQueryRef={validateInviteQueryRef} />;
}
