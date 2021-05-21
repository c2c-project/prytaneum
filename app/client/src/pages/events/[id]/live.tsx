/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { motion } from 'framer-motion';
import { NextPage, GetServerSidePropsContext } from 'next';
import { useSelector } from 'react-redux';

import { Loader } from '@local/components/Loader';
import { Fab } from '@local/components/Fab';
import VideoPlayer from '@local/components/VideoPlayer';
import { EventSidebar, EventProvider } from '@local/features/events';
import { useEventSettingsQuery, Event, EventSettingsDocument } from '@local/graphql-types';
import { initializeApollo, addApolloState } from '@local/utils/apolloClient';
import { initializeStore } from '@local/reducers/store';

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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const apolloClient = initializeApollo();
    const reduxStore = initializeStore();

    await apolloClient.query({
        query: EventSettingsDocument,
        variables: { input: ctx?.params?.id },
    });

    return addApolloState(apolloClient, {
        props: {
            id: ctx?.params?.id,
            initialReduxState: reduxStore.getState(),
            hideSideNav: true,
            containerProps: { maxWidth: 'xl' },
        },
    });
}

// TODO: SSR this and redirect appropriately if it's not live
const Live: NextPage<{ id: string }> = ({ id }) => {
    // main state
    const [eventDetails, setEventDetails] = React.useState<Event | null>(null);

    // styles
    const classes = useStyles();
    const theme = useTheme();

    // language
    const lang = useSelector((store) => store.language);

    const video = React.useMemo(() => {
        if (!eventDetails || !eventDetails.videos) return '';
        const eventVideo = eventDetails.videos.find(({ lang: videoLang }) => lang === videoLang);
        if (eventVideo === undefined) return '';
        return eventVideo.url;
    }, [lang, eventDetails]);

    // references for scrolling
    const topRef = React.useRef<HTMLDivElement | null>(null);
    const [isFabVisible, setIsFabVisible] = React.useState(false);

    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    const { loading: isLoading } = useEventSettingsQuery({
        variables: { input: id },
        onCompleted(results) {
            if (results.eventById) setEventDetails(results.eventById);
        },
    });

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
    if (isLoading || !eventDetails) return <Loader />;

    return (
        <EventProvider event={eventDetails}>
            <Grid component={motion.div} key='townhall-live' container className={classes.root} onScroll={handleScroll}>
                {!isMdUp && <div ref={topRef} />}
                <Grid item md={8} className={classes.video}>
                    <VideoPlayer url={video} />
                </Grid>
                <Grid container item xs={12} md={4} direction='column'>
                    <div className={classes.panes} onScroll={handleScroll}>
                        {isMdUp && <div ref={topRef} className={classes.target} />}
                        <EventSidebar />
                    </div>
                </Grid>
                <Fab onClick={handleClick} ZoomProps={{ in: isFabVisible }}>
                    <KeyboardArrowUpIcon />
                </Fab>
            </Grid>
        </EventProvider>
    );
};

Live.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Live;
