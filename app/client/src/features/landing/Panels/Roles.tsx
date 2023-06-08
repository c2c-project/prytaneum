import * as React from 'react';
import { useRouter } from 'next/router';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';
import useTheme from '@mui/styles/useTheme';

import { Blurb } from '@local/features/landing/Blurb';

export function Roles() {
    const theme = useTheme();
    const lgDownBreakpoint = useMediaQuery(theme.breakpoints.down('lg'));
    const mdDownBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();

    return (
        <Grid
            container
            display='flex'
            alignItems='center'
            justifyContent='center'
            spacing={2}
            margin={0}
            style={{ backgroundColor: '#F5C64F42', width: '100%' }}
        >
            <Grid item width='100%' marginTop={8}>
                <Blurb title='Participate in town hall events using roles' />
            </Grid>

            <Stack
                direction={mdDownBreakpoint ? 'column' : 'row'}
                spacing={2}
                width='95%'
                maxWidth='1500px'
                marginTop={7}
                marginBottom={5}
            >
                {/* User is not pointed to the top of each guide page after navigating to the page.
                    This is caused by an open NextJS bug: https://github.com/vercel/next.js/issues/28778 */}
                <Card
                    style={{
                        width: '25%',
                        height: 570,
                        backgroundColor: theme.palette.custom.creamCan,
                        borderRadius: 0,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <CardContent>
                        <Grid container display='flex' alignItems='center' justifyContent='center'>
                            <img
                                style={{ objectFit: 'contain' }}
                                alt='Speaker Icon'
                                src='/static/speaker_icon.svg'
                                width={82}
                                height={80}
                            />
                        </Grid>
                        <Blurb
                            title='Speaker'
                            titleColor='#F9F9F9'
                            paragraphs={['Officials who answer the discussion given by moderators.']}
                        />
                        <List disablePadding={true} sx={{ listStyleType: 'disc', marginTop: 10, marginLeft: 1 }}>
                            <ListItem sx={{ display: 'list-item', marginBottom: -2 }}>
                                <ListItemText
                                    primary={'Same experience as a Zoom call'}
                                    primaryTypographyProps={{ fontSize: lgDownBreakpoint ? 14 : 16 }}
                                />
                            </ListItem>
                            <ListItem sx={{ display: 'list-item', marginBottom: -2 }}>
                                <ListItemText
                                    primary={'One on one with moderators'}
                                    primaryTypographyProps={{ fontSize: lgDownBreakpoint ? 14 : 16 }}
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
                <Card
                    style={{
                        width: '25%',
                        height: 570,
                        backgroundColor: theme.palette.custom.creamCan,
                        borderRadius: 0,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <CardContent>
                        <Grid container display='flex' alignItems='center' justifyContent='center'>
                            <img
                                style={{ objectFit: 'contain' }}
                                alt='Participant Icon'
                                src='/static/participant_icon.svg'
                                width={82}
                                height={80}
                            />
                        </Grid>
                        <Blurb
                            title='Participant'
                            titleColor='#F9F9F9'
                            paragraphs={['Residents who engage in discussion on a policy topic.']}
                        />
                        <List disablePadding={true} sx={{ listStyleType: 'disc', marginTop: 10, marginLeft: 1 }}>
                            <ListItem sx={{ display: 'list-item', marginBottom: -2 }}>
                                <ListItemText
                                    primary={'Submit questions'}
                                    primaryTypographyProps={{ fontSize: lgDownBreakpoint ? 14 : 16 }}
                                />
                            </ListItem>
                            <ListItem sx={{ display: 'list-item', marginBottom: -2 }}>
                                <ListItemText
                                    primary={'Like and quote other participant questions'}
                                    primaryTypographyProps={{ fontSize: lgDownBreakpoint ? 14 : 16 }}
                                />
                            </ListItem>
                            <ListItem sx={{ display: 'list-item', marginBottom: -2 }}>
                                <ListItemText
                                    primary={'Provide feedback to moderators'}
                                    primaryTypographyProps={{ fontSize: lgDownBreakpoint ? 14 : 16 }}
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 'auto',
                            marginBottom: 2,
                        }}
                    >
                        <Button
                            size='medium'
                            style={{ color: 'white' }}
                            onClick={() => router.push('/guides/participant')}
                        >
                            Participant Guide
                        </Button>
                    </CardActions>
                </Card>
                <Card
                    style={{
                        width: '25%',
                        height: 570,
                        backgroundColor: theme.palette.custom.creamCan,
                        borderRadius: 0,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <CardContent>
                        <Grid container display='flex' alignItems='center' justifyContent='center'>
                            <img
                                style={{ objectFit: 'contain' }}
                                alt='Moderator Icon'
                                src='/static/moderator_icon.svg'
                                width={82}
                                height={80}
                            />
                        </Grid>
                        <Blurb
                            title='Moderator'
                            titleColor='#F9F9F9'
                            paragraphs={['Officials that oversee event discussion with the speaker.']}
                        />
                        <List disablePadding={true} sx={{ listStyleType: 'disc', marginTop: 10, marginLeft: 1 }}>
                            <ListItem sx={{ display: 'list-item', marginBottom: -2 }}>
                                <ListItemText
                                    primary={
                                        'Manage the question queue by adding, removing and reordering participant questions'
                                    }
                                    primaryTypographyProps={{ fontSize: lgDownBreakpoint ? 14 : 16 }}
                                />
                            </ListItem>
                            <ListItem sx={{ display: 'list-item', marginBottom: -2 }}>
                                <ListItemText
                                    primary={'Respond to participant feedback'}
                                    primaryTypographyProps={{ fontSize: lgDownBreakpoint ? 14 : 16 }}
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 'auto',
                            marginBottom: 2,
                        }}
                    >
                        <Button
                            size='medium'
                            style={{ color: 'white' }}
                            onClick={() => router.push('/guides/moderator')}
                        >
                            Moderator Guide
                        </Button>
                    </CardActions>
                </Card>
                <Card
                    style={{
                        width: '25%',
                        height: 570,
                        backgroundColor: theme.palette.custom.creamCan,
                        borderRadius: 0,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <CardContent>
                        <Grid container display='flex' alignItems='center' justifyContent='center'>
                            <img
                                style={{ objectFit: 'contain' }}
                                alt='Organizer Icon'
                                src='/static/organizer_icon.svg'
                                width={82}
                                height={80}
                            />
                        </Grid>
                        <Blurb
                            title='Organizer'
                            titleColor='#F9F9F9'
                            paragraphs={['Officials that create and set up events on Prytaneum.']}
                        />
                        <List disablePadding={true} sx={{ listStyleType: 'disc', marginTop: 10, marginLeft: 1 }}>
                            <ListItem sx={{ display: 'list-item', marginBottom: -2 }}>
                                <ListItemText
                                    primary={'Create events for an organization'}
                                    primaryTypographyProps={{ fontSize: lgDownBreakpoint ? 14 : 16 }}
                                />
                            </ListItem>
                            <ListItem sx={{ display: 'list-item', marginBottom: -2 }}>
                                <ListItemText
                                    primary={'Configure event details'}
                                    primaryTypographyProps={{ fontSize: lgDownBreakpoint ? 14 : 16 }}
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 'auto',
                            marginBottom: 2,
                        }}
                    >
                        <Button
                            size='medium'
                            style={{ color: 'white' }}
                            onClick={() => router.push('guides/organizer')}
                        >
                            Organizer Guide
                        </Button>
                    </CardActions>
                </Card>
            </Stack>

            <Grid
                item
                style={{
                    height: 40,
                    width: '95%',
                    maxWidth: '2000px',
                    [theme.breakpoints.up('lg')]: {
                        marginTop: -710,
                    },
                    [theme.breakpoints.down('lg')]: {
                        marginTop: -660,
                    },
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#D2A942',
                }}
            >
                <Typography variant='h4' color='white' fontSize={20} marginBottom={2}>
                    Features
                </Typography>
            </Grid>
        </Grid>
    );
}
