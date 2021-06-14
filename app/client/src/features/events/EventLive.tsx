/* eslint-disable react/prop-types */
import * as React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { motion } from 'framer-motion';
import { Skeleton } from '@material-ui/lab';
import { NextPage, GetServerSidePropsContext } from 'next';
import { graphql, fetchQuery, useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Loader } from '@local/components/Loader';

import type { EventLiveQuery } from '@local/__generated__/EventLiveQuery.graphql';
import { Fab } from '@local/components/Fab';
import { ConditionalRender } from '@local/components';
import { EventSidebar, EventVideo, EventVideoLoader, EventContext, EventSidebarLoader } from '@local/features/events';
import { initServerEnvironment, makeServerFetchFunction } from '@local/utils/relay-environment';
import { PickRequired } from '@local/utils/ts-utils';
import { initApp } from '@local/utils/init-app';

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
        // padding: theme.spacing(1.5),
        [theme.breakpoints.up('md')]: {
            overflowY: 'scroll',
        },
    },
    video: {
        [theme.breakpoints.up('md')]: {
            // marginTop: theme.spacing(2),
            marginLeft: theme.spacing(2),
        },
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
            }
        }
    }
`;

export function EventLiveLoader() {
    return <Loader />;
}

export interface PreloadedEventLiveProps {
    eventId: string;
}

export interface EventLiveProps {
    queryRef: PreloadedQuery<EventLiveQuery>;
}

export function EventLive({ queryRef }: EventLiveProps) {
    const { node } = usePreloadedQuery(EVENT_LIVE_QUERY, queryRef);
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

    if (!node) return <EventSidebarLoader />;

    return (
        <EventContext.Provider value={{ eventId: node.id, isModerator: Boolean(node.isViewerModerator) }}>
            <Grid component={motion.div} key='townhall-live' container className={classes.root} onScroll={handleScroll}>
                {!isMdUp && <div ref={topRef} />}
                <Grid item md={8} className={classes.video}>
                    <EventVideo fragmentRef={node} />
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

export function PreloadedEventLive({ eventId }: PreloadedEventLiveProps) {
    const [queryRef, loadQuery] = useQueryLoader<EventLiveQuery>(EVENT_LIVE_QUERY);

    React.useEffect(() => {
        if (!queryRef) loadQuery({ eventId });
    }, [queryRef, loadQuery, eventId]);

    if (!queryRef) return <EventSidebarLoader />;

    return <EventLive queryRef={queryRef} />;
}
