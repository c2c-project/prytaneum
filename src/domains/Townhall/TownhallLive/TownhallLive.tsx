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
            flexGrow: 0,
            maxHeight: `calc(((9/16) * 63vw) - ${theme.spacing(2)}px)`,
            height: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            minHeight: '33vh',
            height: '33vh',
            width: '100%',
        },
    },
    paper: {
        padding: theme.spacing(2),
        width: '100%',
    },
    description: {
        flexGrow: 1,
    },
    descriptionTitle: {
        flexGrow: 1,
    },
    titleText: {
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
        <Grid
            container
            alignContent='flex-start'
            spacing={2}
            alignItems='center'
        >
            <Grid item xs='auto' className={classes.descriptionTitle}>
                <Typography variant='overline' className={classes.titleText}>
                    {form.title}
                </Typography>
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
                <div className={classes.video}>
                    <VideoPlayer url='https://www.youtube.com/watch?v=wW1lY5jFNcQ' />
                </div>
                <Grid container item xs='auto' className={classes.description}>
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
