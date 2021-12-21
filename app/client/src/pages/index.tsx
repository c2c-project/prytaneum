import * as React from 'react';
import Image from 'next/image';
import { Grid } from '@material-ui/core';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useUser } from '@local/features/accounts';
import { CallToAction } from '@local/features/promo/CallToAction'
import { Blurb } from '@local/features/promo/Blurb'
import { Carousel } from '@local/features/promo/Carousel';
import { ParticipantDemo, ModeratorDemo } from '@local/features/promo/InteractiveDemo'
import { ScrollButton } from '@local/features/promo/ScrollButton'

const useStyles = makeStyles((theme) => ({
    landing: {
        width: '100%',
        minHeight: '100vh',
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
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    downarrow: {
        fontSize: '4rem',
        transform: 'rotate(-90deg)'
    },
    sentinel: {
        paddingTop: theme.spacing(4), // offset for scroll
    }
}));

export default function Home() {
    const classes = useStyles();
    const router = useRouter();
    const [user] = useUser();

    const roles = [
        <Blurb key='b1'
            title='Partcipant Role'
            icon={<PeopleAltOutlinedIcon/>}
            paragraphs={
                [
                    'The residents who want to engage in discussion on a policy topic. Participants can type and ask questions; they can like, quote, and reply to other participant&apos;s questions; they can participate in breakout rooms.',
                ]
            }
        />,
        <Blurb key='b2'
            title='Moderator Role'
            icon={<SupervisedUserCircleOutlinedIcon/>}
            paragraphs={
                [
                    'The mediators who handle participants&apos; questions to be answered by the speaker. Moderators see the full question list and the question queue that was  curated by the moderator assistants; they select which question to ask next;  they ask the question on the video call for the speaker to respond. Moderators interact with the speaker via a streaming service of the organizer&apos;s choice.',
                ]
            }
        />,
        <Blurb key='b3'
            title='Speaker Role'
            icon={<RecordVoiceOverOutlinedIcon/>}
            paragraphs={
                [
                    'The main speaker of a discussion. The speaker does not see the question list or  the question queue. Instead, meetings appear like an ordinary video call with  the moderator. The speaker interacts with the moderators via a streaming service  of the organizer&apos;s choice.',
                ]
            }
        />,
    ]

    const views = [
        <ParticipantDemo key='v1' />,
        <ModeratorDemo key='v2' />,
    ]

    const sentinelRef = React.useRef<HTMLDivElement | null>(null);

    const roles = [
        <Blurb
            title='Partcipant Role'
            icon={<PeopleAltOutlinedIcon/>}
            paragraphs={
                [
                    'The residents who want to engage in discussion on a policy topic. Participants can type and ask questions; they can like, quote, and reply to other participant&apos;s questions; they can participate in breakout rooms.',
                ]
            }
        />,
        <Blurb
            title='Moderator Role'
            icon={<SupervisedUserCircleOutlinedIcon/>}
            paragraphs={
                [
                    'The mediators who handle participants&apos; questions to be answered by the speaker. Moderators see the full question list and the question queue that was  curated by the moderator assistants; they select which question to ask next;  they ask the question on the video call for the speaker to respond. Moderators interact with the speaker via a streaming service of the organizer&apos;s choice.',
                ]
            }
        />,
        <Blurb
            title='Speaker Role'
            icon={<RecordVoiceOverOutlinedIcon/>}
            paragraphs={
                [
                    'The main speaker of a discussion. The speaker does not see the question list or  the question queue. Instead, meetings appear like an ordinary video call with  the moderator. The speaker interacts with the moderators via a streaming service  of the organizer&apos;s choice.',
                ]
            }
        />,
    ]

    const views = [
        <ParticipantDemo 
            title='Participant View' 
            shadow='10px 10px 0 0 #4056a1' 
            scale='scale(0.95)'
        />,
        <ModeratorDemo 
            title='Moderator View' 
            shadow='10px 10px 0 0 #8eafff' 
            scale='scale(0.95)'
        />,
    ]

    const sentinelRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (user) router.push('/organizations/me');
    }, [user, router]);

    return (
        <>
            <Grid container alignItems='center' justify='center' spacing={2} className={classes.landing}>
                <CallToAction/>
                <ScrollButton sentinelRef={sentinelRef}/>
            </Grid>
            <div ref={sentinelRef} className={classes.sentinel}>
                <Grid container alignItems='center' justify='center' spacing={2} className={classes.root}>
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
                        <ParticipantDemo/>
                    </Grid>
                </Grid>
            </div>
            <Grid container alignItems='center' justify='center' spacing={2} className={classes.root}>
                <Blurb
                    title='A better solution for remote public engagement.'
                />
                <Carousel cards={views}/>
            </Grid>
            <Grid container alignItems='center' justify='center' spacing={2} className={classes.root}>
                <Blurb
                    paragraphs={
                        [
                            'Just like any town hall, Prytaneum offers roles to fit the needs of any attendee: organizer, speaker, moderator, moderator assistant, and participant. Prytaneum complements these roles by promoting constructive engagement through the user interface and “pro-social” algorithm.',
                        ]
                    }
                />
                <Carousel cards={roles}/>
            </Grid>
            <Grid container alignItems='center' justify='center' spacing={3} className={classes.root}>
                <Grid item>
                    <Image
                        src='/static/democracy_fund_logo.svg' 
                        width={280}
                        height={200}
                        objectFit='contain'
                    />
                </Grid>
                <Grid item>
                    <Image
                        src='/static/prytaneum_logo.svg' 
                        width={150}
                        height={200}
                        objectFit='contain'
                    />
                </Grid>
                <Grid item>
                    <Image
                        src='/static/ucr_tecd_logo.svg' 
                        width={450}
                        height={200}
                        objectFit='contain'
                    />
                </Grid>
            </Grid>
        </>
    );
}
