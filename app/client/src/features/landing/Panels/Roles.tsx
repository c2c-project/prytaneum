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
    root: {
        minHeight: '60vh',
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
    featuresBanner: {
        height: 40,
        width: '95%',
        [theme.breakpoints.up('lg')]: {
            marginTop: -950,
        },
        [theme.breakpoints.down('lg')]: {
            marginTop: -890,
        },
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D2A942',
    },
    contain: {
        objectFit: 'contain',
    },
}));

export function Roles() {
    const theme = useTheme();
    const mdBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    const classes = useStyles();

    return (
        <Grid
            container
            display='flex'
            alignItems='center'
            justifyContent='center'
            spacing={2}
            className={classes.root}
            marginLeft='calc(-100vw / 2 + 50%) !important'
            style={{ backgroundColor: '#F5C64F42', width: '100vw' }}
        >
            <Grid item width='100%' marginTop={8}>
                <Blurb title='Participate in town hall events using roles' />
            </Grid>

            <Stack
                direction={mdBreakpoint ? 'column' : 'row'}
                spacing={2}
                width='95%'
                maxWidth='1500px'
                marginTop={7}
                marginBottom={20}
            >
                {/* User is not pointed to the top of each guide page after navigating to the page.
                    This is caused by an open NextJS bug: https://github.com/vercel/next.js/issues/28778 */}
                <Card className={classes.roleCard}>
                    <CardContent>
                        <Grid container display='flex' alignItems='center' justifyContent='center'>
                            <img
                                className={classes.contain}
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
                                    primaryTypographyProps={{ fontSize: 18 }}
                                />
                            </ListItem>
                            <ListItem sx={{ display: 'list-item', marginBottom: -2 }}>
                                <ListItemText
                                    primary={'One on one with moderators'}
                                    primaryTypographyProps={{ fontSize: 18 }}
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
                <Card className={classes.roleCard}>
                    <CardContent>
                        <Grid container display='flex' alignItems='center' justifyContent='center'>
                            <img
                                className={classes.contain}
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
                                <ListItemText primary={'Submit questions'} primaryTypographyProps={{ fontSize: 18 }} />
                            </ListItem>
                            <ListItem sx={{ display: 'list-item', marginBottom: -2 }}>
                                <ListItemText
                                    primary={'Like and quote other participant questions'}
                                    primaryTypographyProps={{ fontSize: 18 }}
                                />
                            </ListItem>
                            <ListItem sx={{ display: 'list-item', marginBottom: -2 }}>
                                <ListItemText
                                    primary={'Provide feedback to moderators'}
                                    primaryTypographyProps={{ fontSize: 18 }}
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
                <Card className={classes.roleCard}>
                    <CardContent>
                        <Grid container display='flex' alignItems='center' justifyContent='center'>
                            <img
                                className={classes.contain}
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
                                    primaryTypographyProps={{ fontSize: 18 }}
                                />
                            </ListItem>
                            <ListItem sx={{ display: 'list-item', marginBottom: -2 }}>
                                <ListItemText
                                    primary={'Respond to participant feedback'}
                                    primaryTypographyProps={{ fontSize: 18 }}
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
                <Card className={classes.roleCard}>
                    <CardContent>
                        <Grid container display='flex' alignItems='center' justifyContent='center'>
                            <img
                                className={classes.contain}
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
                                    primaryTypographyProps={{ fontSize: 18 }}
                                />
                            </ListItem>
                            <ListItem sx={{ display: 'list-item', marginBottom: -2 }}>
                                <ListItemText
                                    primary={'Configure event details'}
                                    primaryTypographyProps={{ fontSize: 18 }}
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

            <Grid item className={classes.featuresBanner} maxWidth='1500px'>
                <Typography variant='h4' color='white' fontSize={20} marginBottom={2}>
                    Features
                </Typography>
            </Grid>
        </Grid>
    );
}
