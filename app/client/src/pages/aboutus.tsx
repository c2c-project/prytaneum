import * as React from 'react';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useUser } from '@local/features/accounts';
import { Loader } from '@local/components';

export default function AboutUs() {
    const theme = useTheme();
    const lgUpBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));
    const { user, isLoading } = useUser();

    if (isLoading) return <Loader />;

    return (
        <Grid
            container
            width='100%'
            height='100%'
            textAlign='center'
            alignItems='center'
            alignContent='flex-start'
            paddingLeft={user ? (lgUpBreakpoint ? '250px' : 0) : lgUpBreakpoint ? '5%' : 0}
            paddingRight={user ? 0 : lgUpBreakpoint ? '5%' : 0}
            spacing={2}
        >
            <Grid container item xs={12} direction='column' alignItems='center' spacing={1}>
                <Grid item xs={4} sm={3} md={2}>
                    <img
                        css={{ objectFit: 'contain' }}
                        src='/static/prytaneum_logo.svg'
                        width='250px'
                        height='250px'
                        alt='Prytaneum Logo'
                    />
                </Grid>
                <Grid item>
                    <Typography variant='body1' fontSize='large'>
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
                        css={{ objectFit: 'contain' }}
                        src='/static/directors.png'
                        width='250px'
                        height='250px'
                        alt='Directors'
                    />
                </Grid>
                <Grid container item sm={7} md={9} spacing={2}>
                    <Grid item>
                        <Typography variant='body1' fontSize='large'>
                            Built by the University of California, Riverside&apos;s Technology, Communication and
                            Democracy Lab (TeCD-Lab), the Prytaneum was spearheaded by lab director Prof.{' '}
                            <b>Kevin Esterling</b> and associate director Prof. <b>Mariam Salloum</b>.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1' fontSize='large'>
                            In collaboration with the Congressional Management Foundation, Prof. Esterling and Prof.
                            Salloum co-led the Connecting to Congress (C2C) research team that received a grant from the
                            National Science Foundation (NSF) to work with the U.S. Congress on developing new
                            technology for constituent engagement. The C2C idea was that, in today’s society, it is hard
                            for individuals to feel like their voice is heard on important policies.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant='body1' fontSize='large'>
                        With seed funding from the Democracy Fund, the UCR TeCD-Lab developed the{' '}
                        <b>Prytaneum project</b>, the result of over a decade of research into the best practices for
                        online town halls. This new, open source online town hall platform meets the requirements
                        identified in the extensive C2C research, and creates a setting for a many-participant,
                        interactive event that lends itself to collaborative, constructive exchanges between government
                        officials and constituents.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1' fontSize='large'>
                        The C2C research team published their findings from the NSF study, Politics with the People:
                        Building a Directly Representative Democracy (Neblo, Esterling, and Lazer 2018). In it they give
                        recommendations for the design features that make for a good online town hall experience.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1' fontSize='large'>
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
