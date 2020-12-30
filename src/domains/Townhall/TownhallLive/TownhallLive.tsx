import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import Fab from 'components/Fab';
import VideoPlayer from 'components/VideoPlayer';
import PaneProvider from '../Contexts/Pane';
import TownhallPanes from '../TownhallPanes';

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
        padding: theme.spacing(1.5), // TODO: work on spacing with this
        [theme.breakpoints.up('md')]: {
            overflowY: 'scroll',
        },
    },
    video: {
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(2),
            marginLeft: theme.spacing(2),
        },
    },
    target: {
        scrollMarginTop: '1rem',
    },
    // saving these for future
    // sticky: {
    //     top: 0,
    //     zIndex: theme.zIndex.appBar,
    //     position: 'sticky',
    //     width: '100%',
    // },
}));

export default function TownhallLive() {
    const classes = useStyles();
    const topRef = React.useRef<HTMLDivElement | null>(null);
    const [isFabVisible, setIsFabVisible] = React.useState(false);
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    const handleScroll = () => {
        const top = topRef.current?.getBoundingClientRect()?.top;
        if (top && top < -100) {
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
    // TODO: video url
    return (
        <PaneProvider>
            <Grid
                id='123'
                container
                className={classes.root}
                onScroll={handleScroll}
            >
                {!isMdUp && <div ref={topRef} />}
                <Grid
                    item
                    md={8}
                    container
                    direction='column'
                    className={classes.video}
                >
                    <Grid container item xs='auto'>
                        <VideoPlayer url='https://youtu.be/h1o0l_dTV_s' />
                    </Grid>
                </Grid>
                <Grid container item xs={12} md={4} direction='column'>
                    <div className={classes.panes} onScroll={handleScroll}>
                        {isMdUp && (
                            <div ref={topRef} className={classes.target} />
                        )}
                        <TownhallPanes />
                    </div>
                </Grid>
                <Fab onClick={handleClick} zoomProps={{ in: isFabVisible }}>
                    <KeyboardArrowUpIcon />
                </Fab>
            </Grid>
        </PaneProvider>
    );
}
