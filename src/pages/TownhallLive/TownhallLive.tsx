import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import Fab from 'components/Fab';
import VideoPlayer from 'components/VideoPlayer';
import PaneProvider from 'domains/Townhall/Contexts/Pane';
import TownhallPanes from 'domains/Townhall/TownhallPanes';
import useTownhall from 'hooks/useTownhall';

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
        padding: theme.spacing(1.5),
        [theme.breakpoints.up('md')]: {
            overflowY: 'scroll',
        },
    },
    video: {
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(2),
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

export default function TownhallLive() {
    const classes = useStyles();
    const topRef = React.useRef<HTMLDivElement | null>(null);
    const [isFabVisible, setIsFabVisible] = React.useState(false);
    const theme = useTheme();
    const [townhall] = useTownhall();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    // increase the distance required to show the scroll to top fab
    // bedcause of on screen keyboards on mobile
    const distance = React.useMemo(() => (isMdUp ? 100 : 250), [isMdUp]);

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

    return (
        <PaneProvider>
            <Grid container className={classes.root} onScroll={handleScroll}>
                {!isMdUp && <div ref={topRef} />}
                <Grid item md={8} className={classes.video}>
                    <VideoPlayer url={townhall.settings.video.url} />
                </Grid>
                <Grid container item xs={12} md={4} direction='column'>
                    <div className={classes.panes} onScroll={handleScroll}>
                        {isMdUp && <div ref={topRef} className={classes.target} />}
                        <TownhallPanes />
                    </div>
                </Grid>
                <Fab onClick={handleClick} ZoomProps={{ in: isFabVisible }}>
                    <KeyboardArrowUpIcon />
                </Fab>
            </Grid>
        </PaneProvider>
    );
}
