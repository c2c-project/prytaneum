import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { CallToAction } from '@local/features/landing/CallToAction';
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
}));

export default function Landing() {
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Grid
                container
                alignItems='center'
                justifyContent='center'
                spacing={2}
                className={classes.landing}
                marginTop={-10}
            >
                <CallToAction />
            </Grid>

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
                    <div className={classes.video}>
                        <iframe
                            src='https://drive.google.com/file/d/14OzBMXPlkDENtyHgwRlDW4315DRImYzx/preview'
                            width='854'
                            height='480'
                            allow='autoplay'
                            title='instructional video'
                        ></iframe>
                    </div>
                </Grid>

                <Grid item marginBottom={10}>
                    <Button className={classes.button} onClick={() => router.push('/guides/getting-started')}>
                        Learn How To Get Started
                    </Button>
                </Grid>
            </Grid>

            {/* This is the only section of the page that doesn't need the style prop detailed above. */}
            <Grid container alignItems='center' justifyContent='center' spacing={2} className={classes.root}>
                <Grid item marginTop={6}>
                    <Blurb
                        title='A better solution for remote public engagement.'
                        paragraphs={['See how Prytaneum enables interaction through our town hall platform:']}
                        titleColor='#F5C64F'
                        paragraphsColor='#272C6C'
                    />
                </Grid>
                <Grid container alignItems='center' justifyContent='center' wrap='nowrap' marginTop={5}>
                    <Grid item>
                        <Grid container wrap='nowrap'>
                            <Image
                                alt='Participant Icon'
                                src='/static/participant_icon_yellow.svg'
                                width={31}
                                height={21}
                                objectFit='contain'
                            />
                            <Typography variant='h4' color='#F5C64F' fontSize='40px' marginLeft={1}>
                                Participant View
                            </Typography>
                        </Grid>
                        <Typography variant='body1' color='#272C6C' fontSize='18px' align='center' width='80%'>
                            Sit in on Prytaneum events as a participant and contribute to event discussion
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Image
                            data-test-id='participant-view'
                            alt='Participant View Screenshot'
                            src='/static/participant_view.png'
                            width={1114}
                            height={576}
                            objectFit='contain'
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems='center'
                    justifyContent='center'
                    wrap='nowrap'
                    marginTop={10}
                    marginBottom={4}
                >
                    <Grid item>
                        <Image
                            data-test-id='moderator-view'
                            alt='Moderator View Screenshot'
                            src='/static/moderator_view.png'
                            width={1114}
                            height={576}
                            objectFit='contain'
                        />
                    </Grid>
                    <Grid item marginRight={-10} marginLeft={10}>
                        <Grid container wrap='nowrap'>
                            <Image
                                alt='Moderator Icon'
                                src='/static/moderator_icon_yellow.svg'
                                width={36}
                                height={26}
                                objectFit='contain'
                            />
                            <Typography variant='h4' color='#F5C64F' fontSize='40px' marginLeft={1}>
                                Moderator View
                            </Typography>
                        </Grid>
                        <Typography
                            variant='body1'
                            color='#272C6C'
                            fontSize='18px'
                            align='center'
                            width='80%'
                            marginLeft={-2}
                        >
                            or take charge of your own Prytaneum event as a moderator and administrate event discussion
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

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

                <Stack direction='row' spacing={2} width='95%' marginTop={7} marginBottom={20}>
                    {/* User is not pointed to the top of each guide page after navigating to the page.
                    This is caused by an open NextJS bug: https://github.com/vercel/next.js/issues/28778 */}
                    <Card className={classes.roleCard}>
                        <CardContent>
                            <Grid container display='flex' alignItems='center' justifyContent='center'>
                                <Image
                                    alt='Speaker Icon'
                                    src='/static/speaker_icon.svg'
                                    width={82}
                                    height={80}
                                    objectFit='contain'
                                />
                            </Grid>
                            <Blurb
                                title='Speaker'
                                titleColor='#F9F9F9'
                                paragraphs={['Officials who answer the discussion given by moderators.']}
                            />
                            <List disablePadding={true} sx={{ listStyleType: 'disc', marginTop: 6, marginLeft: 1 }}>
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
                                <Image
                                    alt='Participant Icon'
                                    src='/static/participant_icon.svg'
                                    width={82}
                                    height={80}
                                    objectFit='contain'
                                />
                            </Grid>
                            <Blurb
                                title='Participant'
                                titleColor='#F9F9F9'
                                paragraphs={['Residents who engage in discussion on a policy topic.']}
                            />
                            <List disablePadding={true} sx={{ listStyleType: 'disc', marginTop: 6, marginLeft: 1 }}>
                                <ListItem sx={{ display: 'list-item', marginBottom: -2 }}>
                                    <ListItemText
                                        primary={'Submit questions'}
                                        primaryTypographyProps={{ fontSize: 18 }}
                                    />
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
                                <Image
                                    alt='Moderator Icon'
                                    src='/static/moderator_icon.svg'
                                    width={82}
                                    height={80}
                                    objectFit='contain'
                                />
                            </Grid>
                            <Blurb
                                title='Moderator'
                                titleColor='#F9F9F9'
                                paragraphs={['Officials that oversee event discussion with the speaker.']}
                            />
                            <List disablePadding={true} sx={{ listStyleType: 'disc', marginTop: 6, marginLeft: 1 }}>
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
                                <Image
                                    alt='Organizer Icon'
                                    src='/static/organizer_icon.svg'
                                    width={82}
                                    height={80}
                                    objectFit='contain'
                                />
                            </Grid>
                            <Blurb
                                title='Organizer'
                                titleColor='#F9F9F9'
                                paragraphs={['Officials that create and set up events on Prytaneum.']}
                            />
                            <List disablePadding={true} sx={{ listStyleType: 'disc', marginTop: 6, marginLeft: 1 }}>
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

                <Grid
                    item
                    height={40}
                    width='95%'
                    marginTop={-122}
                    zIndex={1000}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    style={{ backgroundColor: '#D2A942' }}
                >
                    <Typography variant='h4' color='white' fontSize={20} marginBottom={2}>
                        Features
                    </Typography>
                </Grid>
            </Grid>

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

            <Grid
                container
                spacing={3}
                className={classes.root}
                marginLeft='calc(-100vw / 2 + 50%) !important'
                style={{ width: '100vw' }}
            >
                <Grid item justifyContent='flex-start' marginTop={10} marginLeft='5%'>
                    <Image
                        src='/static/prytaneum_logo2.svg'
                        width={234}
                        height={51}
                        objectFit='contain'
                        alt='prytaneum 2 logo'
                    />
                </Grid>
                <Grid container justifyContent='flex-end' marginTop={-10} marginRight='5%'>
                    <Stack direction='row' justifyContent='end' spacing={4}>
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

                <Divider flexItem variant='middle' style={{ width: '90%', marginLeft: '5%' }} />

                <Grid item justifyContent='flex-start' marginTop={10} marginLeft='5%'>
                    <Typography color='#999999'>© 2023 Prytaneum. All rights reserved.</Typography>
                </Grid>
                <Grid container justifyContent='flex-end' marginTop={-10} marginRight='5%'>
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
        </>
    );
}
