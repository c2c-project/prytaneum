import * as React from 'react';
import { Grid, Typography, Button, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import useTheme from '@mui/styles/useTheme';

export function CallToAction() {
    const theme = useTheme();
    const lgDownBreakpoint = useMediaQuery(theme.breakpoints.down('lg'));
    const mdDownBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
    const smDownBreakpoint = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();

    return (
        <Grid
            container
            width='100%'
            minHeight='85vh'
            alignItems='center'
            justifyContent='center'
            spacing={2}
            margin={0}
        >
            <Grid item xs={12} md={6} alignItems={mdDownBreakpoint ? 'center' : 'normal'}>
                <img
                    style={{ objectFit: 'contain' }}
                    alt='Prytaneum Landing Graphic'
                    src='/static/prytaneum_landing_graphic.svg'
                    width='100%'
                    height='100%'
                />
            </Grid>
            <Grid item xs={12} md={6} marginLeft={mdDownBreakpoint ? 0 : -10} marginTop={-13}>
                <img
                    style={{ objectFit: 'contain' }}
                    data-test-id='landing-prytanum-logo'
                    alt='Prytaneum Logo'
                    src='/static/p_logo.svg'
                    width='100%'
                    height='100%'
                />
                <Typography
                    variant='h5'
                    textAlign={lgDownBreakpoint ? 'center' : 'right'}
                    fontWeight={500}
                    fontSize={smDownBreakpoint ? 18 : 25}
                    style={{ color: '#D79922' }}
                    marginTop={-1}
                >
                    A crucial tool for a better democracy.
                </Typography>
                <Grid item marginLeft={mdDownBreakpoint ? 0 : 14} marginTop={2}>
                    <Typography variant='h6' textAlign='center'>
                        This town hall platform leverages AI and big data to enable meaningful democratic engagement
                        between residents and public officials.
                    </Typography>
                </Grid>
                <Grid item container marginLeft={mdDownBreakpoint ? 0 : 5} marginTop={3} justifyContent='center'>
                    <Grid item marginRight={3}>
                        <Button
                            style={{
                                color: 'white',
                                backgroundColor: '#2427B7',
                                borderRadius: 12,
                                padding: '3px 20px 3px 20px',
                            }}
                            onClick={() => router.push('/guides/getting-started')}
                        >
                            Get Started
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{
                                backgroundColor: '#ED526C',
                                borderRadius: 12,
                                color: 'white',
                                padding: '3px 20px 3px 20px',
                            }}
                            onClick={() => router.push('#video-section')}
                        >
                            See How It Works
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
