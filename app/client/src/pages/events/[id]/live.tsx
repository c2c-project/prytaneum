/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { motion } from 'framer-motion';
import { NextPage, GetServerSidePropsContext } from 'next';
import { useSelector } from 'react-redux';
import { fetchQuery, graphql } from 'react-relay';

import { liveQuery, liveQueryResponse } from '@local/__generated__/liveQuery.graphql';
import { Loader } from '@local/components/Loader';
import { Fab } from '@local/components/Fab';
import { EventSidebar, EventProvider, EventVideo } from '@local/features/events';
import { Event } from '@local/graphql-types';
import { initializeApollo, addApolloState } from '@local/utils/apolloClient';
import { initEnvironment } from '@local/utils/relay-environment';
import { initializeStore } from '@local/reducers/store';
import { PickRequired } from '@local/utils/ts-utils';

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

const LIVE_QUERY = graphql`
    query liveQuery($eventId: ID!) {
        node(id: $eventId) {
            id
            ... on Event {
                ...EventSidebarFragment
                ...EventVideoFragment
            }
        }
    }
`;

function doesCtxHaveId(
    ctx: GetServerSidePropsContext<{ id?: string }>
): ctx is PickRequired<GetServerSidePropsContext<{ id: string }>, 'params'> {
    return ctx?.params?.id !== undefined;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext<{ id: string }>) {
    // const apolloClient = initializeApollo();

    // await apolloClient.query({
    //     query: EventSettingsDocument,
    //     variables: { input: ctx?.params?.id },
    // });

    // return addApolloState(apolloClient, {
    //     props: {
    //         id: ctx?.params?.id,
    //         initialReduxState: reduxStore.getState(),
    //         hideSideNav: true,
    //         containerProps: { maxWidth: 'xl' },
    //     },
    // });
    const reduxStore = initializeStore();
    const baseProps = {
        initialReduxState: reduxStore.getState(),
        hideSideNav: true,
        containerProps: { maxWidth: 'xl' },
    };
    if (!doesCtxHaveId(ctx)) return { props: baseProps };
    const environment = initEnvironment();
    const queryProps = await fetchQuery<liveQuery>(environment, LIVE_QUERY, { eventId: ctx.params.id }).toPromise();
    const initialRecords = environment.getStore().getSource().toJSON();
    return { props: { ...baseProps, ...queryProps, initialRecords } };
}

// TODO: SSR this and redirect appropriately if it's not live
const Live: NextPage<liveQueryResponse> = ({ node: eventById }) => {
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
    if (!eventById) return <h1>what</h1>;

    return (
        <Grid component={motion.div} key='townhall-live' container className={classes.root} onScroll={handleScroll}>
            {!isMdUp && <div ref={topRef} />}
            <Grid item md={8} className={classes.video}>
                <EventVideo fragmentRef={eventById} />
            </Grid>
            <Grid container item xs={12} md={4} direction='column'>
                <div className={classes.panes} onScroll={handleScroll}>
                    {isMdUp && <div ref={topRef} className={classes.target} />}
                    <EventSidebar fragmentRef={eventById} />
                </div>
            </Grid>
            <Fab onClick={handleClick} ZoomProps={{ in: isFabVisible }}>
                <KeyboardArrowUpIcon />
            </Fab>
        </Grid>
    );
};

export default Live;
