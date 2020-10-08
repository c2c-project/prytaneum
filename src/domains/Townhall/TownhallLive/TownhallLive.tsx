import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Avatar,
    useMediaQuery,
    useTheme,
    IconButton,
    Collapse,
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import clsx from 'clsx';

import Fab from 'components/Fab';
import VideoPlayer from 'components/VideoPlayer';
import { TownhallContext } from '../Contexts/Townhall';
import QuestionFeed from '../QuestionFeed';

const useDesktopStyles = makeStyles((theme) => ({
    root: {
        height: 'inherit',
        width: 'inherit',
        display: 'flex',
        flex: 1,
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row',
        },
        [theme.breakpoints.down('sm')]: {
            flexFlow: 'column',
            overflowY: 'auto',
        },
    },
    questionFeed: {
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.up('md')]: {
            overflowY: 'scroll',
            maxHeight: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            minHeight: '100%',
        },
        padding: theme.spacing(3),
        width: '100%',
    },
    video: {
        [theme.breakpoints.up('md')]: {
            flexGrow: 2,
            maxHeight: `calc(((9/16) * 63vw) - ${theme.spacing(2)}px)`,
        },
        [theme.breakpoints.down('sm')]: {
            minHeight: '33vh',
            height: '33vh',
            width: '100%',
        },
    },
    feedContainer: {
        height: '100%',
    },
    titleBar: {
        width: 'inherit',
        display: 'flex',
        flex: 1,
        padding: theme.spacing(2),
    },
    title: {
        textTransform: 'uppercase',
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
    const classes = useDesktopStyles();
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
        <Grid
            container
            alignContent='flex-start'
            spacing={2}
            alignItems='center'
        >
            <Typography className={classes.title} variant='overline'>
                {form.title}
            </Typography>
            <Grid item xs={12} container alignItems='center' spacing={2}>
                <Grid item xs='auto'>
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
                </Grid>
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
                    <Typography paragraph>{form.description}</Typography>
                </Collapse>
            ) : (
                <Typography paragraph>{form.description}</Typography>
            )}
        </Grid>
    );

    return (
        <div className={classes.root} onScroll={handleScroll}>
            {!isMdUp && <div ref={topRef} />}
            <Grid item xs={12} md={8} container direction='column'>
                <div className={classes.video}>
                    <VideoPlayer url='https://www.youtube.com/watch?v=5qap5aO4i9A' />
                </div>
                <div className={classes.titleBar}>{description}</div>
            </Grid>
            <Grid
                container
                item
                xs={12}
                md={4}
                className={classes.feedContainer}
            >
                <div className={classes.questionFeed} onScroll={handleScroll}>
                    {isMdUp && <div ref={topRef} />}
                    <Typography variant='subtitle2'>Question Feed</Typography>
                    <QuestionFeed />
                </div>
            </Grid>
            <Fab onClick={handleClick} zoomProps={{ in: isFabVisible }}>
                <KeyboardArrowUpIcon />
            </Fab>
        </div>
    );
}
