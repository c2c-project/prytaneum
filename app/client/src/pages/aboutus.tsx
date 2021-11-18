import * as React from 'react';
import Image from 'next/image';
import { Grid, Typography, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
<<<<<<< HEAD
        height: '100%',
        paddingLeft: theme.spacing(1),
        textAlign: 'center',
    },
=======
        minHeight: '85vh',
        paddingLeft: '1rem',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        textAlign: 'center',
    },
>>>>>>> feat(frontend): implement about us page
    paragraph: {
        fontSize: 'large'
    },
}));

export default function AboutUs() {
    const classes = useStyles();

    return (
<<<<<<< HEAD
        <Grid container className={classes.root} justify='center' alignItems='center' spacing={2}>
            <Grid container item xs={12} direction='column' alignItems='center' spacing={1}>
                <Grid item xs={4} sm={3} md={2}>
                    <Image
                        src='/static/prytaneum_logo.svg' 
=======
        <Grid container alignItems='center' className={classes.root} justify='center' spacing={2}>
            
            <Grid item xs={12} className={classes.section}>
                <Grid item xs={4} sm={3} md={2}>
                    <Image
                        src='https://i.ibb.co/qmXt8Fw/prytaneum-logo-filled.png' 
>>>>>>> feat(frontend): implement about us page
                        width={1107}
                        height={1108}
                        objectFit='contain'
                    />
                </Grid>
<<<<<<< HEAD
                <Grid item>
                    <Typography variant='body1' className={classes.paragraph}>
                        Technology to Enhance Democracy
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h4'>
                        Our Journey
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} justify='center' alignItems='center' spacing={2}>
                <Grid item sm={5} md={3}>
                    <Image
                        src='/static/directors.png' 
                        width={257}
                        height={273}
                        objectFit='contain'
                    />
                </Grid>
                <Grid container item sm={7} md={9} spacing={2}>
                    <Grid item>
                        <Typography variant='body1' className={classes.paragraph}>
                            Built by the University of California, Riverside&apos;s Technology, 
                            Communication and Democracy Lab (TeCD-Lab), the Prytaneum was spearheaded 
                            by lab director Prof. <b>Kevin Esterling</b> and associate director 
                            Prof. <b>Mariam Salloum</b>. 
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1' className={classes.paragraph}>
                            In collaboration with the Congressional Management Foundation,  Prof. 
                            Esterling and Prof. Salloum co-led the Connecting to Congress (C2C) 
                            research team that received a grant from the National Science Foundation 
                            (NSF) to work with the U.S. Congress on developing new technology for 
                            constituent engagement. The C2C idea was that, in today’s society, it is 
                            hard for individuals to feel like their voice is heard on important 
                            policies.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant='body1' className={classes.paragraph}>
                        With seed funding from the Democracy Fund, the UCR TeCD-Lab developed 
                        the <b>Prytaneum project</b>, the result of over a decade of research into 
                        the best practices for online town halls. This new, open source online town hall 
                        platform meets the requirements identified in the extensive C2C research, 
                        and creates a setting for a many-participant, interactive event that lends 
                        itself to collaborative, constructive exchanges between government officials 
                        and constituents.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1' className={classes.paragraph}>
                        The C2C research team published their findings  from the NSF study, Politics 
                        with the People: Building a Directly Representative Democracy (Neblo, 
                        Esterling, and Lazer 2018). In it they give recommendations for the design 
                        features that make for a good online town hall experience. 
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1' className={classes.paragraph}>
                        In particular, the online platform should reduce barriers to participating 
                        such that it is easy for everyone in the community to participate 
                        interactively. The elected official should participate in the session 
                        through streaming video and audio, so that the constituents can feel the 
                        direct connection with the elected official and authenticate that it is in 
                        fact the elected official with whom they are talking.
                    </Typography>
                </Grid>
=======
                <Typography variant='body1' className={classes.paragraph}>
                    Technology to Enhance Democracy
                </Typography>
                <Typography variant='h4'>
                    Our Journey
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3} className={classes.section}>
                <Image
                    src='https://i.ibb.co/4YYwHx8/directors.png' 
                    width={257}
                    height={273}
                    objectFit='contain'
                />
            </Grid>
            <Grid item xs={12} sm={8} md={9} className={classes.section}>
                <Typography variant='body1' className={classes.paragraph}>
                    Built by the University of California, Riverside&apos;s Technology, 
                    Communication and Democracy Lab (TeCD-Lab), the Prytaneum was spearheaded 
                    by lab director Prof. <b>Kevin Esterling</b> and associate director 
                    Prof. <b>Mariam Salloum</b>. 
                </Typography>
                <Hidden smDown>
                    <Typography variant='body1' className={classes.paragraph}>
                        In collaboration with the Congressional Management Foundation,  Prof. 
                        Esterling and Prof. Salloum co-led the Connecting to Congress (C2C) 
                        research team that received a grant from the National Science Foundation 
                        (NSF) to work with the U.S. Congress on developing new technology for 
                        constituent engagement. The C2C idea was that, in today’s society, it is 
                        hard for individuals to feel like their voice is heard on important 
                        policies.
                    </Typography>
                </Hidden>
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Hidden mdUp>
                    <Typography variant='body1' className={classes.paragraph}>
                        In collaboration with the Congressional Management Foundation,  Prof. 
                        Esterling and Prof. Salloum co-led the Connecting to Congress (C2C) 
                        research team that received a grant from the National Science Foundation 
                        (NSF) to work with the U.S. Congress on developing new technology for 
                        constituent engagement. The C2C idea was that, in today’s society, it is 
                        hard for individuals to feel like their voice is heard on important 
                        policies.
                    </Typography>
                </Hidden>
                <Typography variant='body1' className={classes.paragraph}>
                    With seed funding from the Democracy Fund, the UCR TeCD-Lab developed 
                    the <b>Prytaneum project</b>, the result of over a decade of research into 
                    the best practices for online town halls. This new, open source online town hall 
                    platform meets the requirements identified in the extensive C2C research, 
                    and creates a setting for a many-participant, interactive event that lends 
                    itself to collaborative, constructive exchanges between government officials 
                    and constituents.
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    The C2C research team published their findings  from the NSF study, Politics 
                    with the People: Building a Directly Representative Democracy (Neblo, 
                    Esterling, and Lazer 2018). In it they give recommendations for the design 
                    features that make for a good online town hall experience. 
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    In particular, the online platform should reduce barriers to participating 
                    such that it is easy for everyone in the community to participate 
                    interactively. The elected official should participate in the session 
                    through streaming video and audio, so that the constituents can feel the 
                    direct connection with the elected official and authenticate that it is in 
                    fact the elected official with whom they are talking.
                </Typography>
>>>>>>> feat(frontend): implement about us page
            </Grid>
        </Grid>
    );
}