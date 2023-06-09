/* eslint-disable jsx-a11y/img-redundant-alt */
import * as React from 'react';
import { useRouter } from 'next/router';
import { Button, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import useTheme from '@mui/styles/useTheme';

import { CallToAction } from '@local/features/landing/CallToAction';
import { Blurb } from '@local/features/landing/Blurb';
import { Roles as RolesPanel } from './Panels/Roles';
import { MobileRoles as MobileRolesPanel } from './Panels/MobileRoles';
import { Views as ViewsPanel } from './Panels/Views';
import ReactPlayer from 'react-player';

export default function Landing() {
    const theme = useTheme();
    const mdUpBreakpoint = useMediaQuery(theme.breakpoints.up('md'));
    const mdDownBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();

    return (
        <Grid container>
            <CallToAction />
            <Grid
                container
                width='100%'
                alignItems='center'
                justifyContent='center'
                spacing={2}
                margin={0}
                style={{ backgroundColor: '#8EAFFF42' }}
            >
                <Grid item marginTop={6} id='video-section'>
                    <Blurb title='Enable constructive, virtual dialogue' titleColor='#282D6E' />
                </Grid>

                <Grid item container justifyContent='center' width='100%' style={{ paddingLeft: 0 }}>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            aspectRatio: mdDownBreakpoint ? '16/9' : 'auto',
                        }}
                    >
                        <ReactPlayer
                            url='https://youtu.be/Q-8-cQujh3k'
                            playing={true}
                            muted
                            loop
                            width={'854px'}
                            height={mdUpBreakpoint ? '480px' : '100%'}
                            playsinline
                            controls
                        />
                    </div>
                    <Grid item marginY={5}>
                        <Button
                            style={{
                                color: 'white',
                                backgroundColor: '#F5C64F',
                                borderRadius: 12,
                                height: '100%',
                                width: 'auto',
                                paddingTop: 3,
                                paddingBottom: 3,
                                paddingLeft: 20,
                                paddingRight: 20,
                            }}
                            onClick={() => router.push('/guides/getting-started')}
                        >
                            Learn How To Get Started
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            {/* This is the only section of the page that doesn't need the style prop detailed above. */}
            <ViewsPanel />
            {mdDownBreakpoint ? <MobileRolesPanel /> : <RolesPanel />}
            {/* BOTTOM BANNER SECTION */}
            <Grid
                container
                direction='column'
                display='flex'
                alignItems='center'
                justifyContent='center'
                spacing={2}
                margin={0}
                style={{ width: '100%' }}
            >
                <Grid item marginTop={2} marginBottom={1}>
                    <Blurb
                        title='Read more on how Prytaneum came to be,'
                        paragraphs={['the team behind the online town hall platform, and our motivations.']}
                        titleColor='#F5C64F'
                        paragraphsColor='#272C6C'
                    />
                </Grid>
                <Grid item style={{ padding: 0 }}>
                    <img
                        style={{ objectFit: 'contain' }}
                        alt='Team Photo'
                        src='/static/team_photo.png'
                        width='100%'
                        height='100%'
                    />
                </Grid>
                <Grid item>
                    <Button
                        size='medium'
                        variant='contained'
                        style={{
                            color: 'white',
                            backgroundColor: theme.palette.custom.creamCan,
                            marginTop: mdDownBreakpoint ? 0 : '-10rem',
                            zIndex: 100,
                        }}
                        onClick={() => router.push('/aboutus')}
                    >
                        Read more about us
                    </Button>
                </Grid>
            </Grid>
            {/* FOOTER SECTION */}
            <Grid container width='100%' marginTop={mdDownBreakpoint ? '1rem' : 0}>
                <Grid item container justifyContent={mdDownBreakpoint ? 'center' : 'normal'}>
                    <Grid
                        item
                        justifyContent={mdDownBreakpoint ? 'center' : 'flex-start'}
                        marginLeft={mdDownBreakpoint ? '0%' : '5%'}
                    >
                        <img
                            style={{ objectFit: 'contain' }}
                            alt='prytaneum 2 logo'
                            src='/static/prytaneum_logo2.svg'
                            width={234}
                            height={51}
                        />
                    </Grid>
                    <Grid
                        container
                        justifyContent={mdDownBreakpoint ? 'center' : 'flex-end'}
                        marginTop={mdDownBreakpoint ? 4 : -6}
                        marginRight={mdDownBreakpoint ? '0%' : '5%'}
                    >
                        <Stack direction='row' spacing={4}>
                            <Button
                                style={{
                                    color: '#282D6E',
                                    fontSize: mdDownBreakpoint ? '20px' : '28px',
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
                                    fontSize: mdDownBreakpoint ? '20px' : '28px',
                                    maxHeight: '30px',
                                    textTransform: 'capitalize',
                                }}
                            >
                                Guides
                            </Button>
                            <Button
                                style={{
                                    color: '#282D6E',
                                    fontSize: mdDownBreakpoint ? '20px' : '28px',
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
                        paddingBottom: mdDownBreakpoint ? '2rem' : '0rem',
                        marginLeft: mdDownBreakpoint ? '0%' : '5%',
                    }}
                />
                <Grid item container justifyContent={mdDownBreakpoint ? 'center' : 'normal'}>
                    <Grid
                        item
                        justifyContent={mdDownBreakpoint ? 'center' : 'flex-start'}
                        marginLeft={mdDownBreakpoint ? '0%' : '5%'}
                        marginTop='2rem'
                    >
                        <Typography color='#999999'>© 2023 Prytaneum. All rights reserved.</Typography>
                    </Grid>
                    <Grid
                        container
                        justifyContent={mdDownBreakpoint ? 'center' : 'flex-end'}
                        marginTop={mdDownBreakpoint ? 4 : -6}
                        marginRight={mdDownBreakpoint ? '0%' : '5%'}
                    >
                        <Grid item marginRight={6}>
                            <img
                                style={{ objectFit: 'contain' }}
                                alt='democracy fund logo'
                                src='/static/democracy_fund_logo.svg'
                                width={152}
                                height={61}
                            />
                        </Grid>
                        <Grid item>
                            <img
                                style={{ objectFit: 'contain' }}
                                alt='ucr tecd logo'
                                src='/static/ucr_tecd_logo.svg'
                                width={276}
                                height={62}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
