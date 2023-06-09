import * as React from 'react';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import useTheme from '@mui/styles/useTheme';

import { Blurb } from '@local/features/landing/Blurb';
export function Views() {
    const theme = useTheme();
    const mdDownBreakpoint = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Grid
            container
            width='100%'
            minHeight='60vh'
            alignItems='center'
            justifyContent='center'
            // spacing={2}
            margin={0}
            marginTop={theme.spacing(2)}
            marginBottom={theme.spacing(2)}
        >
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
                wrap={mdDownBreakpoint ? 'wrap' : 'nowrap'}
                marginTop={5}
            >
                <Grid item>
                    <Grid container wrap='nowrap' justifyContent='center'>
                        <img
                            style={{ objectFit: 'contain' }}
                            alt='Participant Icon'
                            src='/static/participant_icon_yellow.svg'
                            width={31}
                            height={21}
                        />
                        <Typography variant='h4' color='#F5C64F' fontSize='40px'>
                            Participant View
                        </Typography>
                    </Grid>
                    <Typography
                        variant='body1'
                        color='#272C6C'
                        fontSize='18px'
                        align='center'
                        marginRight={mdDownBreakpoint ? 0 : theme.spacing(2)}
                    >
                        Sit in on Prytaneum events as a participant and contribute to event discussion
                    </Typography>
                </Grid>
                <img
                    style={{ objectFit: 'contain', marginTop: mdDownBreakpoint ? theme.spacing(2) : 0 }}
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
                wrap={mdDownBreakpoint ? 'wrap' : 'nowrap'}
                marginTop={mdDownBreakpoint ? 5 : 10}
                marginBottom={4}
            >
                <img
                    style={{ objectFit: 'contain', marginBottom: mdDownBreakpoint ? theme.spacing(2) : 0 }}
                    data-test-id='moderator-view'
                    alt='Moderator View Screenshot'
                    src='/static/moderator_view.png'
                    width='50%'
                    height='50%'
                />
                <Grid item>
                    <Grid container wrap='nowrap' justifyContent='center'>
                        <img
                            style={{ objectFit: 'contain' }}
                            alt='Moderator Icon'
                            src='/static/moderator_icon_yellow.svg'
                            width={36}
                            height={26}
                        />
                        <Typography variant='h4' color='#F5C64F' fontSize='40px'>
                            Moderator View
                        </Typography>
                    </Grid>
                    <Typography
                        variant='body1'
                        color='#272C6C'
                        fontSize='18px'
                        align='center'
                        marginLeft={mdDownBreakpoint ? 0 : theme.spacing(2)}
                    >
                        or take charge of your own Prytaneum event as a moderator and administrate event discussion
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}
