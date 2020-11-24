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
        width: 'inherit',
        display: 'flex',
        flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row',
        },
        [theme.breakpoints.down('sm')]: {
            flexFlow: 'column',
            overflowY: 'auto',
        },
    },
    panes: {
        [theme.breakpoints.up('md')]: {
            overflowY: 'scroll',
            maxHeight: '100%',
            padding: theme.spacing(2), // TODO: work on spacing with this
        },
        [theme.breakpoints.down('sm')]: {
            minHeight: '100%',
            paddingTop: theme.spacing(1),
        },
        width: '100%',
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        flex: 1,
    },
    descriptionTitle: {
        flexGrow: 1,
    },
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    expand: {
        transform: 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(0deg)',
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
            <div className={classes.root} onScroll={handleScroll}>
                {!isMdUp && <div ref={topRef} />}
                <Grid item xs={12} md={8} container direction='column'>
                    <Grid container item xs='auto'>
                        <VideoPlayer url='https://youtu.be/h1o0l_dTV_s' />
                    </Grid>
                </Grid>
                <Grid container item xs={12} md={4}>
                    <div className={classes.panes} onScroll={handleScroll}>
                        {isMdUp && <div ref={topRef} />}
                        <TownhallPanes />
                    </div>
                </Grid>
                <Fab onClick={handleClick} zoomProps={{ in: isFabVisible }}>
                    <KeyboardArrowUpIcon />
                </Fab>
            </div>
        </PaneProvider>
    );
}
