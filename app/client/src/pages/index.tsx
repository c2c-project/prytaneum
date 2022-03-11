import * as React from 'react';
import Image from 'next/image';
import { Grid } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import { useUser } from '@local/features/accounts';
import { CallToAction } from '@local/features/promo/CallToAction'
import { Blurb } from '@local/features/promo/Blurb'
import { Carousel } from '@local/features/promo/Carousel';
import { ParticipantDemo, ModeratorDemo } from '@local/features/promo/InteractiveDemo'
// import { ScrollButton } from '@local/features/promo/ScrollButton'
// import { ConditionalRender } from '@local/components';

const useStyles = makeStyles((theme) => ({
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
        transform: 'rotate(-90deg)'
    },
    // sentinel: {
    //     paddingTop: theme.spacing(4), // offset for scroll
    // }
}));

export default function Home() {
    const classes = useStyles();
    const router = useRouter();
    const [user] = useUser();

    const roles = [
        <Blurb
            key='blurb1'
            title='Partcipant Role'
            icon={<PeopleAltOutlinedIcon/>}
            paragraphs={
                [
                    'The residents who want to engage in discussion on a policy topic. Participants can type and ask questions; they can like, quote, and reply to other participant\'s questions; they can participate in breakout rooms.',
                ]
            }
        />,
        <Blurb
            key='blurb2'
            title='Moderator Role'
            icon={<SupervisedUserCircleOutlinedIcon/>}
            paragraphs={
                [
                    'The mediators who handle participants\' questions to be answered by the speaker. Moderators see the full question list and the question queue that was  curated by the moderator assistants; they select which question to ask next;  they ask the question on the video call for the speaker to respond. Moderators interact with the speaker via a streaming service of the organizer\'s choice.',
                ]
            }
        />,
        <Blurb
            key='blurb3'
            title='Speaker Role'
            icon={<RecordVoiceOverOutlinedIcon/>}
            paragraphs={
                [
                    'The main speaker of a discussion. The speaker does not see the question list or  the question queue. Instead, meetings appear like an ordinary video call with  the moderator. The speaker interacts with the moderators via a streaming service  of the organizer\'s choice.',
                ]
            }
        />,
    ]

    const views = [
        <ParticipantDemo
            key='view1'
            title='Participant View' 
            shadow='10px 10px 0 0 #4056a1' 
            scale='scale(0.95)'
        />,
        <ModeratorDemo
            key='view2'
            title='Moderator View' 
            shadow='10px 10px 0 0 #8eafff' 
            scale='scale(0.95)'
        />,
    ]

    // const sentinelRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (user) router.push('/organizations/me');
    }, [user, router]);

    return <>
        <Grid container alignItems='center' justifyContent='center' spacing={2} className={classes.landing}>
            <CallToAction/>
            {/* TODO: Fix auto-scroll
            <ConditionalRender client>
                <ScrollButton sentinelRef={sentinelRef}/>
            </ConditionalRender> */}
        </Grid>
        {/* <div ref={sentinelRef} className={classes.sentinel}> */}
        <Grid container alignItems='center' justifyContent='center' spacing={2} className={classes.root}>
            <Blurb
                title='What is Prytaneum?'
                paragraphs={
                    [
                        'Prytaneum is an open-source, highly-interactive online town hall platform powered by artificial intelligence and an innovative user interface.',
                        'Our town hall platform enables constructive, virtual dialogue between government officials and their constituents - creating opportunities for democratic engagement that is not available through commercially available webinar or streaming platforms.'
                    ]
                }
            />
            <Grid item xs={12}>
                <ParticipantDemo 
                    shadow='10px 10px 0 0 #f5c64f' 
                    scale='scale(0.95)'
                />
            </Grid>
        </Grid>
        {/* </div> */}
        <Grid container alignItems='center' justifyContent='center' spacing={2} className={classes.root}>
            <Blurb
                title='A better solution for remote public engagement.'
            />
            <Carousel cards={views}/>
        </Grid>
        <Grid container alignItems='center' justifyContent='center' spacing={2} className={classes.root}>
            <Blurb
                paragraphs={
                    [
                        'Just like any town hall, Prytaneum offers roles to fit the needs of any attendee: organizer, speaker, moderator, moderator assistant, and participant. Prytaneum complements these roles by promoting constructive engagement through the user interface and “pro-social” algorithm.',
                    ]
                }
            />
            <Carousel cards={roles}/>
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
                    src='/static/prytaneum_logo.svg' 
                    width={150}
                    height={200}
                    objectFit='contain'
                    alt='prytaneum logo'
                />
            </Grid>
            <Grid item>
                <Image
                    src='/static/ucr_tecd_logo.svg' 
                    width={450}
                    height={200}
                    objectFit='contain'
                    alt='ucr tecd logo'
                />
            </Grid>
        </Grid>
    </>;
}
