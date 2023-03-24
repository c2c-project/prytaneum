import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import useTheme from '@mui/styles/useTheme';

import { CallToAction } from '@local/features/landing/CallToAction';
import { Blurb } from '@local/features/landing/Blurb';
import { Roles as RolesPanel } from './Panels/Roles';
import { Views as ViewsPanel } from './Panels/Views';
import ReactPlayer from 'react-player';

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
        margin: 0,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    videoWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            marginLeft: 0,
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: -8,
        },
    },
}));

export default function Landing() {
    const theme = useTheme();
    const mdBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyles();
    const router = useRouter();

    console.log(mdBreakpoint);

    return (
        <>
            <CallToAction />

            {/* The marginLeft and width props allow this component to override the maxWidth set by its parent container in `Main.tsx` */}
            <Grid
                container
                overflow='hidden'
                alignItems='center'
                justifyContent='center'
                spacing={2}
                className={classes.root}
                marginLeft='calc(-100vw / 2 + 50%) !important'
                style={{ backgroundColor: '#8EAFFF42', width: '100vw' }}
            >
                <Grid item marginTop={6} id='video-section'>
                    <Blurb title='Enable constructive, virtual dialogue' titleColor='#282D6E' />
                </Grid>

                <Grid item xs={12}>
                    <div className={classes.videoWrapper}>
                        <ReactPlayer
                            url='videos/prytaneum_promo.mp4'
                            playing={true}
                            muted
                            loop
                            width={'854px'}
                            height='100%'
                            playsinline
                            controls
                        />
                    </div>
                </Grid>

                <Grid item marginBottom={10}>
                    <Button className={classes.button} onClick={() => router.push('/guides/getting-started')}>
                        Learn How To Get Started
                    </Button>
                </Grid>
            </Grid>

            {/* This is the only section of the page that doesn't need the style prop detailed above. */}
            <ViewsPanel />
            <RolesPanel />
            {/* BOTTOM BANNER SECTION */}
            <Grid
                container
                display='flex'
                alignItems='center'
                justifyContent='center'
                spacing={2}
                className={classes.root}
                marginLeft='calc(-103vw / 2 + 50%) !important'
                style={{ width: '100vw' }}
            >
                <Grid item marginTop={2} marginBottom={1}>
                    <Blurb
                        title='Read more on how Prytaneum came to be,'
                        paragraphs={['the team behind the online town hall platform, and our motivations.']}
                        titleColor='#F5C64F'
                        paragraphsColor='#272C6C'
                    />
                </Grid>
                <Grid item marginRight='-1.5%'>
                    <Image alt='Team Photo' src='/static/team_photo.png' height={450} width={1920} objectFit='fill' />
                </Grid>
                <Grid item>
                    <Button
                        size='medium'
                        style={{ color: 'white', marginTop: '-250%' }}
                        onClick={() => router.push('/aboutus')}
                    >
                        Read more about us
                    </Button>
                </Grid>
            </Grid>
            {/* FOOTER SECTION */}
            <Grid container marginLeft='calc(-100vw / 2 + 50%) !important' width='100vw'>
                <Grid item container justifyContent={mdBreakpoint ? 'center' : 'normal'}>
                    <Grid
                        item
                        justifyContent={mdBreakpoint ? 'center' : 'flex-start'}
                        marginLeft={mdBreakpoint ? '0%' : '5%'}
                    >
                        <Image
                            src='/static/prytaneum_logo2.svg'
                            width={234}
                            height={51}
                            objectFit='contain'
                            alt='prytaneum 2 logo'
                        />
                    </Grid>
                    <Grid
                        container
                        justifyContent={mdBreakpoint ? 'center' : 'flex-end'}
                        marginTop={mdBreakpoint ? 4 : -6}
                        marginRight={mdBreakpoint ? '0%' : '5%'}
                    >
                        <Stack direction='row' spacing={4}>
                            <Button
                                style={{
                                    color: '#282D6E',
                                    fontSize: '28px',
                                    maxHeight: '30px',
                                    textTransform: 'capitalize',
                                }}
                                onClick={() => router.push('/aboutus')}
                            >
                                About
                            </Button>
                            <Button
                                style={{
                                    color: '#282D6E',
                                    fontSize: '28px',
                                    maxHeight: '30px',
                                    textTransform: 'capitalize',
                                }}
                            >
                                Guides
                            </Button>
                            <Button
                                style={{
                                    color: '#282D6E',
                                    fontSize: '28px',
                                    maxHeight: '30px',
                                    textTransform: 'capitalize',
                                }}
                            >
                                Contact Us
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <Divider
                    variant='middle'
                    style={{
                        width: '90%',
                        paddingBottom: mdBreakpoint ? '2rem' : '0rem',
                        marginLeft: mdBreakpoint ? '0%' : '5%',
                    }}
                />
                <Grid item container justifyContent={mdBreakpoint ? 'center' : 'normal'}>
                    <Grid
                        item
                        justifyContent={mdBreakpoint ? 'center' : 'flex-start'}
                        marginLeft={mdBreakpoint ? '0%' : '5%'}
                        marginTop='2rem'
                    >
                        <Typography color='#999999'>© 2023 Prytaneum. All rights reserved.</Typography>
                    </Grid>
                    <Grid
                        container
                        justifyContent={mdBreakpoint ? 'center' : 'flex-end'}
                        marginTop={mdBreakpoint ? 4 : -6}
                        marginRight={mdBreakpoint ? '0%' : '5%'}
                    >
                        <Grid item marginRight={6}>
                            <Image
                                src='/static/democracy_fund_logo.svg'
                                width={152}
                                height={61}
                                objectFit='contain'
                                alt='democracy fund logo'
                            />
                        </Grid>
                        <Grid item>
                            <Image
                                src='/static/ucr_tecd_logo.svg'
                                width={276}
                                height={62}
                                objectFit='contain'
                                alt='ucr tecd logo'
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
