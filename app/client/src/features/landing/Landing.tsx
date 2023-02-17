import * as React from 'react';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import makeStyles from '@mui/styles/makeStyles';
import { CallToAction } from '@local/features/landing/CallToAction'
import { Blurb } from '@local/features/landing/Blurb'

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
        width: '100%',
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
}));

export default function Landing() {
    const classes = useStyles();
    const router = useRouter();

    return <>
        <Grid container overflow='hidden' alignItems='center' justifyContent='center' spacing={2} className={classes.landing} marginTop={-10}>
            <CallToAction />
        </Grid>
        {/* <div ref={sentinelRef} className={classes.sentinel}> */}
        <Grid container alignItems='center' justifyContent='center' spacing={2} className={classes.root} style={{ backgroundColor: '#8EAFFF42' }}>
            <Blurb
                title='Enable constructive, virtual dialogue'
                color='#282D6E'
            />
            {/*
                <ParticipantDemo
                    shadow='10px 10px 0 0 #f5c64f'
                    scale='scale(0.95)'
                />
            */}
            <Grid item xs={12}>
                <div className={classes.video}>
                    <ReactPlayer url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' height='480px' width='854px' />
                </div>
            </Grid>
            <Grid item marginBottom={10}>
                <Button className={classes.button} onClick={() => router.push('/guides/getting-started')}>
                    Learn How To Get Started
                </Button>
            </Grid>
            
            <Grid item xs={12}>
                <div className={classes.video}>
                    <ReactPlayer url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' height='480px' width='854px'/>
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
            <Blurb
                title='A better solution for remote public engagement.'
                color='#F5C64F'
            />
            <Blurb paragraphs={['See how Prytaneum enables interaction through our town hall platform:']} color='#272C6C' />
            {/*<Carousel cards={views} />*/}
            <Grid item>
                <PersonIcon fontSize='large' />
                <Image
                    data-test-id='participant-view'
                    alt='Participant View Screenshot'
                    src='/static/participant_view.svg'
                    width={557}
                    height={288}
                    objectFit='contain'
                />
            </Grid>
        </Grid>

        <Grid container alignItems='center' justifyContent='center' spacing={2} className={classes.root} style={{ backgroundColor: '#F5C64F42' }}>
            <Grid item width='100%' marginTop={8}>
                <Blurb title='Participate in town hall events using roles' />
            </Grid>

            <Grid item width='25%' zIndex={500} marginTop={5} marginBottom={20}>
                <Card sx={{ height: 520, backgroundColor: '#F5C64F', borderRadius: 0 }}>
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
                        <Typography sx={{ fontSize: 18, marginTop: 10}}>
                            <Box
                                component='span'
                                sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
                            >
                                •
                            </Box>
                            Same experience as a Zoom call
                        </Typography>
                        <Typography sx={{ fontSize: 18, marginBottom: 15 }}>
                            <Box
                                component='span'
                                sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
                            >
                                •
                            </Box>
                            One on one with moderators
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item width='25%' zIndex={500} marginTop={5} marginBottom={20}>
                <Card sx={{ height: 520, backgroundColor: '#F5C64F', borderRadius: 0, display: 'flex', flexDirection: 'column' }}>
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
                        <Typography sx={{ fontSize: 18, marginTop: 10}}>
                            <Box
                                component='span'
                                sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
                            >
                                •
                            </Box>
                            Submit questions
                        </Typography>
                        <Typography sx={{ fontSize: 18 }}>
                            <Box
                                component='span'
                                sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
                            >
                                •
                            </Box>
                            Like and quote other participant questions
                        </Typography>
                        <Typography sx={{ fontSize: 18, marginBottom: 0 }}>
                            <Box
                                component='span'
                                sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
                            >
                                •
                            </Box>
                            Provide feedback to moderators
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto', marginBottom: 2 }}>
                        <Button size='medium' style={{ color: 'white' }}>Participant Guide</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item width='25%' zIndex={500} marginTop={5} marginBottom={20}>
                <Card sx={{ height: 520, backgroundColor: '#F5C64F', borderRadius: 0, display: 'flex', flexDirection: 'column' }}>
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
                        <Typography sx={{ fontSize: 18, marginTop: 10}}>
                            <Box
                                component='span'
                                sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
                            >
                                •
                            </Box>
                            Manage the question queue by adding, removing and reordering participant questions
                        </Typography>
                        <Typography sx={{ fontSize: 18  }}>
                            <Box
                                component='span'
                                sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
                            >
                                •
                            </Box>
                            Respond to participant feedback
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto', marginBottom: 2 }}>
                        <Button size='medium' style={{ color: 'white' }}>Moderator Guide</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item width='25%' zIndex={500} marginTop={5} marginBottom={20}>
                <Card sx={{ height: 520, backgroundColor: '#F5C64F', borderRadius: 0, display: 'flex', flexDirection: 'column' }}>
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
                        <Typography sx={{ fontSize: 18, marginTop: 10}}>
                            <Box
                                component='span'
                                sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
                            >
                                •
                            </Box>
                            Create events for an organization
                        </Typography>
                        <Typography sx={{ fontSize: 18 }}>
                            <Box
                                component='span'
                                sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
                            >
                                •
                            </Box>
                            Configure event details
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto', marginBottom: 2 }}>
                        <Button size='medium' style={{ color: 'white' }}>Organizer Guide</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item height={40} width='80%' marginTop={-110} zIndex={1000} display='flex' alignItems='center' justifyContent='center' style={{ backgroundColor: '#D2A942' }}>
                <Typography variant='h4' color='white' fontSize={20} marginBottom={2}>Features</Typography>
            </Grid>
        </Grid>

        <Grid container display='flex' alignItems='center' justifyContent='center' spacing={2} className={classes.root}>
            <Grid item marginTop={2} marginBottom={1}>
                <Blurb 
                    title='Read more on how Prytaneum came to be,'
                    paragraphs={['the team behind the online town hall platform, and our motivations.']}
                    titleColor='#F5C64F'
                    paragraphsColor='#272C6C'
                />
            </Grid>
            <Grid item>
                <Image 
                    alt='Team Photo' 
                    src='/static/team_photo.png' 
                    height={450} 
                    width={1920}
                    objectFit='contain'
                />
                <Carousel cards={roles} />
            </Grid>
            <Grid item>
                <Button 
                    size='medium' 
                    style={{ color: 'white', marginTop: -480 }} 
                    onClick={() => router.push('/aboutus')}>
                        Read more about us
                </Button>
            </Grid>
        </Grid>

        <Grid container spacing={3} className={classes.root}>
            <Grid item justifyContent='flex-start' marginTop={10} marginLeft='10%'>
                <Image 
                    src='/static/prytaneum_logo2.svg' 
                    width={234} 
                    height={51}
                    objectFit='contain'
                    alt='prytaneum 2 logo'
                />
            </Grid>
            <Grid container justifyContent='flex-end' marginTop={-10} marginRight='10%'>
                <Stack direction='row' justifyContent='end' spacing={4}>
                    <Button style={{ color: '#282D6E', fontSize: '28px', maxHeight: '30px', textTransform: 'capitalize' }} onClick={() => router.push('/aboutus')}>About</Button>
                    <Button style={{ color: '#282D6E', fontSize: '28px', maxHeight: '30px', textTransform: 'capitalize' }}>Guides</Button>
                    <Button style={{ color: '#282D6E', fontSize: '28px', maxHeight: '30px', textTransform: 'capitalize' }}>Contact Us</Button>
                </Stack>
            </Grid>

            <Divider flexItem variant='middle' style={{ width: '80%', marginLeft: '10%' }}/>

            <Grid item justifyContent='flex-start' marginTop={10} marginLeft='10%'>
                <Typography color='#999999'>© 2023 Prytaneum. All rights reserved.</Typography>
            </Grid>
            <Grid container justifyContent='flex-end' marginTop={-10} marginRight='10%'>
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
    </>;
}
