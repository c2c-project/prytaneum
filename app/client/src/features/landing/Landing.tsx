import * as React from 'react';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Grid, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import makeStyles from '@mui/styles/makeStyles';
import { CallToAction } from '@local/features/landing/CallToAction';
import { Blurb } from '@local/features/landing/Blurb';
import { Carousel } from '@local/features/landing/Carousel';
import { ParticipantDemo, ModeratorDemo } from '@local/features/landing/InteractiveDemo';
// import { ScrollButton } from '@local/features/promo/ScrollButton'
// import { ConditionalRender } from '@local/components';

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
    // sentinel: {
    //     paddingTop: theme.spacing(4), // offset for scroll
    // }
}));

export default function Landing() {
    const classes = useStyles();
    const router = useRouter();

    const roles = [
        <Blurb
            key='blurb1'
            title='Participant Role'
            icon={<PeopleAltOutlinedIcon />}
            paragraphs={[
                // eslint-disable-next-line quotes
                "The residents who want to engage in discussion on a policy topic. Participants can type and ask questions; they can like, quote, and reply to other participant's questions; they can participate in breakout rooms.",
            ]}
        />,
        <Blurb
            key='blurb2'
            title='Moderator Role'
            icon={<SupervisedUserCircleOutlinedIcon />}
            paragraphs={[
                // eslint-disable-next-line quotes
                "The mediators who handle participants' questions to be answered by the speaker. Moderators see the full question list and the question queue that was  curated by the moderator assistants; they select which question to ask next;  they ask the question on the video call for the speaker to respond. Moderators interact with the speaker via a streaming service of the organizer's choice.",
            ]}
        />,
        <Blurb
            key='blurb3'
            title='Speaker Role'
            icon={<RecordVoiceOverOutlinedIcon />}
            paragraphs={[
                // eslint-disable-next-line quotes
                "The main speaker of a discussion. The speaker does not see the question list or  the question queue. Instead, meetings appear like an ordinary video call with  the moderator. The speaker interacts with the moderators via a streaming service  of the organizer's choice.",
            ]}
        />,
    ];

    const views = [
        <ParticipantDemo key='view1' title='Participant View' shadow='10px 10px 0 0 #4056a1' scale='scale(0.95)' />,
        <ModeratorDemo key='view2' title='Moderator View' shadow='10px 10px 0 0 #8eafff' scale='scale(0.95)' />,
    ];

    // const sentinelRef = React.useRef<HTMLDivElement | null>(null);

    return <>
        <Grid container alignItems='center' justifyContent='center' spacing={2} className={classes.landing}>
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
            <Grid container alignItems='center' justifyContent='center' spacing={2} className={classes.root}>
                <Blurb
                    paragraphs={[
                        'Just like any town hall, Prytaneum offers roles to fit the needs of any attendee: organizer, speaker, moderator, moderator assistant, and participant. Prytaneum complements these roles by promoting constructive engagement through the user interface and “pro-social” algorithm.',
                    ]}
                />
                <Carousel cards={roles} />
            </Grid>
            <Grid container alignItems='center' justifyContent='center' spacing={3} className={classes.root}>
                <Grid item>
                    <img src='/static/democracy_fund_logo.svg' width={280} height={200} alt='democracy fund logo' />
                </Grid>
                <Grid item>
                    <img src='/static/prytaneum_logo.svg' width={150} height={200} alt='prytaneum logo' />
                </Grid>
                <Grid item>
                    <img src='/static/ucr_tecd_logo.svg' width={450} height={200} alt='ucr tecd logo' />
                </Grid>
            </Grid>
        </>
    );
}
