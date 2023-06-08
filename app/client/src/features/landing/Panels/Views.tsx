import * as React from 'react';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import useTheme from '@mui/styles/useTheme';

import { Blurb } from '@local/features/landing/Blurb';

const useStyles = makeStyles((theme) => ({
    button: {
        color: 'white',
        backgroundColor: '#F5C64F',
        borderRadius: 12,
        height: '100%',
        width: 'auto',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 20,
        paddingRight: 20,
    },
    landing: {
        width: '100%',
        minHeight: '85vh', // set to this height to center call to action (offset height from navbar)
        margin: 0,
    },
    root: {
        minHeight: '60vh',
        width: '100%',
        margin: 0,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    arrowsection: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    downarrow: {
        fontSize: '4rem',
        transform: 'rotate(-90deg)',
    },
    video: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    roleCard: {
        width: '25%',
        height: 560,
        backgroundColor: theme.palette.custom.creamCan,
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    contain: {
        objectFit: 'contain',
    },
}));

export function Views() {
    const theme = useTheme();
    const mdBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyles();

    return (
        <Grid container alignItems='center' justifyContent='center' spacing={2} className={classes.root} margin={0}>
            <Grid item marginTop={6}>
                <Blurb
                    title='A better solution for remote public engagement.'
                    paragraphs={['See how Prytaneum enables interaction through our town hall platform:']}
                    titleColor='#F5C64F'
                    paragraphsColor='#272C6C'
                />
            </Grid>
            <Grid
                container
                item
                alignItems='center'
                justifyContent='center'
                wrap={mdBreakpoint ? 'wrap' : 'nowrap'}
                marginTop={5}
            >
                <Grid item marginRight={2}>
                    <Grid container wrap='nowrap' justifyContent='center'>
                        <img
                            className={classes.contain}
                            alt='Participant Icon'
                            src='/static/participant_icon_yellow.svg'
                            width={31}
                            height={21}
                        />
                        <Typography variant='h4' color='#F5C64F' fontSize='40px' marginLeft={1}>
                            Participant View
                        </Typography>
                    </Grid>
                    <Typography variant='body1' color='#272C6C' fontSize='18px' align='center'>
                        Sit in on Prytaneum events as a participant and contribute to event discussion
                    </Typography>
                </Grid>
                <img
                    className={classes.contain}
                    data-test-id='participant-view'
                    alt='Participant View Screenshot'
                    src='/static/participant_view.png'
                    width='50%'
                    height='50%'
                />
            </Grid>
            <Grid
                container
                alignItems='center'
                justifyContent='center'
                wrap={mdBreakpoint ? 'wrap' : 'nowrap'}
                marginTop={10}
                marginBottom={4}
            >
                <img
                    className={classes.contain}
                    data-test-id='moderator-view'
                    alt='Moderator View Screenshot'
                    src='/static/moderator_view.png'
                    width='50%'
                    height='50%'
                />
                <Grid item marginLeft={2}>
                    <Grid container wrap='nowrap' justifyContent='center'>
                        <img
                            className={classes.contain}
                            alt='Moderator Icon'
                            src='/static/moderator_icon_yellow.svg'
                            width={36}
                            height={26}
                        />
                        <Typography variant='h4' color='#F5C64F' fontSize='40px' marginLeft={1}>
                            Moderator View
                        </Typography>
                    </Grid>
                    <Typography variant='body1' color='#272C6C' fontSize='18px' align='center' marginLeft={-2}>
                        or take charge of your own Prytaneum event as a moderator and administrate event discussion
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}
