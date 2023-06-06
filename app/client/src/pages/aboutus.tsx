import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useUser } from '@local/features/accounts';
import { Loader } from '@local/components';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 0,
        },
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 250,
        },
        textAlign: 'center',
        alignContent: 'flex-start',
    },
    rootLoggedOut: {
        width: '100%',
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        [theme.breakpoints.up('lg')]: {
            paddingLeft: '5%',
            paddingRight: '5%',
        },
        minHeight: '85vh',
        scrollPaddingTop: '-10rem',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        textAlign: 'center',
    },
    paragraph: {
        fontSize: 'large',
    },
    contain: {
        objectFit: 'contain',
    },
}));

export default function AboutUs() {
    const classes = useStyles();
    const { user, isLoading } = useUser();

    if (isLoading) return <Loader />;

    return (
        <Grid container className={user ? classes.root : classes.rootLoggedOut} alignItems='center' spacing={2}>
            <Grid container item xs={12} direction='column' alignItems='center' spacing={1}>
                <Grid item xs={4} sm={3} md={2}>
                    <img
                        className={classes.contain}
                        src='/static/prytaneum_logo.svg'
                        width='250px'
                        height='250px'
                        alt='Prytaneum Logo'
                    />
                </Grid>
                <Grid item>
                    <Typography variant='body1' className={classes.paragraph}>
                        Technology to Enhance Democracy
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h4'>Our Journey</Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} alignItems='center' justifyContent='center' spacing={2}>
                <Grid item sm={5} md={3}>
                    <img
                        className={classes.contain}
                        src='/static/directors.png'
                        width='250px'
                        height='250px'
                        alt='Directors'
                    />
                </Grid>
                <Grid container item sm={7} md={9} spacing={2}>
                    <Grid item>
                        <Typography variant='body1' className={classes.paragraph}>
                            Built by the University of California, Riverside&apos;s Technology, Communication and
                            Democracy Lab (TeCD-Lab), the Prytaneum was spearheaded by lab director Prof.{' '}
                            <b>Kevin Esterling</b> and associate director Prof. <b>Mariam Salloum</b>.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1' className={classes.paragraph}>
                            In collaboration with the Congressional Management Foundation, Prof. Esterling and Prof.
                            Salloum co-led the Connecting to Congress (C2C) research team that received a grant from the
                            National Science Foundation (NSF) to work with the U.S. Congress on developing new
                            technology for constituent engagement. The C2C idea was that, in today’s society, it is hard
                            for individuals to feel like their voice is heard on important policies.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant='body1' className={classes.paragraph}>
                        With seed funding from the Democracy Fund, the UCR TeCD-Lab developed the{' '}
                        <b>Prytaneum project</b>, the result of over a decade of research into the best practices for
                        online town halls. This new, open source online town hall platform meets the requirements
                        identified in the extensive C2C research, and creates a setting for a many-participant,
                        interactive event that lends itself to collaborative, constructive exchanges between government
                        officials and constituents.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1' className={classes.paragraph}>
                        The C2C research team published their findings from the NSF study, Politics with the People:
                        Building a Directly Representative Democracy (Neblo, Esterling, and Lazer 2018). In it they give
                        recommendations for the design features that make for a good online town hall experience.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1' className={classes.paragraph}>
                        In particular, the online platform should reduce barriers to participating such that it is easy
                        for everyone in the community to participate interactively. The elected official should
                        participate in the session through streaming video and audio, so that the constituents can feel
                        the direct connection with the elected official and authenticate that it is in fact the elected
                        official with whom they are talking.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}
