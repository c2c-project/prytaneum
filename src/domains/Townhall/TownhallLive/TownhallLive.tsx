import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    IconButton,
    Collapse,
    Paper,
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import clsx from 'clsx';

import Fab from 'components/Fab';
import VideoPlayer from 'components/VideoPlayer';
import { TownhallContext } from '../Contexts/Townhall';
import TownhallPanes from '../TownhallPanes';

const useStyles = makeStyles((theme) => ({
    root: {
        '--root-width': 'calc(100%)',
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
    video: {
        [theme.breakpoints.up('md')]: {
            // height: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            // width: '100%',
        },
        // minHeight: 'calc((9/16) * var(--video-width) - 10px)',
        // maxHeight: 'calc((9/16) * var(--video-width) - 10px)',
        // height: 'calc((9/16) * 100%)',
        // display: 'flex',
        // flex: '1 0 content',
        // paddingTop: '56.25%' /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */,
        // flex: '0 0 56.25%',
        // position: 'relative',
        // paddingTop: '56.25%',
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
    const { form } = React.useContext(TownhallContext);
    const classes = useStyles();
    const topRef = React.useRef<HTMLDivElement | null>(null);
    const [isFabVisible, setIsFabVisible] = React.useState(false);
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
    const [isIn, setIsIn] = React.useState(false);

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

    const description = (
        <Grid container alignContent='flex-start' alignItems='center'>
            <Grid item xs='auto' className={classes.descriptionTitle}>
                <Typography variant='overline'>{form.title}</Typography>
            </Grid>
            <Grid item xs='auto'>
                {/* <Grid item xs='auto'>
                    <Avatar
                        src={form.speaker.picture}
                        className={classes.largeAvatar}
                    />
                </Grid>
                <Grid item xs='auto'>
                    <Typography>{form.speaker.name}</Typography>
                    <Typography variant='caption'>
                        {form.speaker.party}
                    </Typography>
                    &nbsp; &middot; &nbsp;
                    <Typography display='inline' variant='caption'>
                        {form.speaker.territory}
                    </Typography>
                </Grid> */}
                {!isMdUp && (
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: isIn,
                        })}
                        onClick={() => setIsIn(!isIn)}
                    >
                        <KeyboardArrowUpIcon />
                    </IconButton>
                )}
            </Grid>
            {!isMdUp ? (
                <Collapse in={isIn}>
                    <Grid item xs={12}>
                        <Typography paragraph>{form.description}</Typography>
                    </Grid>
                </Collapse>
            ) : (
                <Grid item xs={12}>
                    <Typography paragraph>{form.description}</Typography>
                </Grid>
            )}
        </Grid>
    );

    return (
        <div className={classes.root} onScroll={handleScroll}>
            {!isMdUp && <div ref={topRef} />}
            <Grid item xs={12} md={8} container direction='column'>
                <Grid container item xs='auto'>
                    <VideoPlayer url='https://www.youtube.com/watch?v=wW1lY5jFNcQ' />
                    <Paper className={classes.paper}>{description}</Paper>
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
    );
}
