import * as React from 'react';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
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
        
        <Grid container alignItems='center' justifyContent='center' spacing={2} className={classes.root} style={{ backgroundColor: '#8EAFFF42' }}>
            <Blurb
                title='Enable constructive, virtual dialogue'
                titleColor='#282D6E'
            />
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
        
        <Grid container alignItems='center' justifyContent='center' spacing={2} className={classes.root}>
            <Blurb
                title='A better solution for remote public engagement.'
                paragraphs={['See how Prytaneum enables interaction through our town hall platform:']}
                titleColor='#F5C64F'
                paragraphsColor='#272C6C'
            />
            {/*<Carousel cards={views} />*/}
            <Grid container alignItems='center' justifyContent='center' wrap='nowrap' marginTop={5}>
                <Grid item>
                    <Grid container wrap='nowrap'>
                        <PersonIcon fontSize='large' style={{ color: '#F5C64F', marginTop: 11 }} />
                        <Typography variant='h4' color='#F5C64F' fontSize='40px'>
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
                        src='/static/participant_view.svg'
                        width={1114}
                        height={576}
                        objectFit='contain'
                    />
                </Grid>
            </Grid>
            <Grid container alignItems='center' justifyContent='center' wrap='nowrap' marginTop={10}>
                <Grid item>
                    <Image
                        data-test-id='moderator-view'
                        alt='Moderator View Screenshot'
                        src='/static/moderator_view.svg'
                        width={1114}
                        height={576}
                        objectFit='contain'
                    />
                </Grid>
                <Grid item marginRight={-10} marginLeft={10}>
                    <Grid container wrap='nowrap'>
                        <Image 
                            alt='Moderator Icon'
                            src='/static/moderator_icon.svg' 
                            width={36} 
                            height={26}
                            objectFit='contain' 
                        />
                        <Typography variant='h4' color='#F5C64F' fontSize='40px'>
                            Moderator View
                        </Typography>
                    </Grid>
                    <Typography variant='body1' color='#272C6C' fontSize='18px' align='center' width='80%' marginLeft={-2}>
                        or take charge of your own Prytaneum event as a moderator and administrate event discussion
                    </Typography>
                </Grid>
            </Grid>
        </Grid>

        <Grid container alignItems='center' justifyContent='center' spacing={2} className={classes.root}>
            <Blurb
                paragraphs={
                    [
                        'Just like any town hall, Prytaneum offers roles to fit the needs of any attendee: organizer, speaker, moderator, moderator assistant, and participant. Prytaneum complements these roles by promoting constructive engagement through the user interface and “pro-social” algorithm.',
                    ]
                }
            />
            <Carousel cards={roles} />
        </Grid>

        <Grid container alignItems='center' justifyContent='center' spacing={3} className={classes.root}>
            <Grid item>
                <Image
                    src='/static/democracy_fund_logo.svg'
                    width={280}
                    height={200}
                    objectFit='contain'
                    alt='democracy fund logo'
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
