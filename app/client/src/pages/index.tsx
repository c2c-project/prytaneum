import * as React from 'react';
import Image from 'next/image';
import {
    Grid,
    Typography,
    Paper,
    Button,
    IconButton,
    Avatar,
    InputAdornment,
    Chip,
    MobileStepper
} from '@material-ui/core';
import { TextField } from '@local/components/TextField';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ReplyIcon from '@material-ui/icons/Reply';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { useUser } from '@local/features/accounts';

const useStyles = makeStyles((theme) => ({
    landing: {
        width: '100%',
        minHeight: '90vh',
        margin: 0
    },
    root: {
        width: '100%',
        minHeight: '60vh',
        margin: '2rem 0',
    },
    header: {
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center'
        },
    },
    title: {
        [theme.breakpoints.down('md')]: {
            marginTop: 50,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: 35,
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 20,
        },
    },
    subtitle: {
        textAlign: 'right',
        color: '#272C6C',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 18
        },
    },
    button: {
        marginTop: 20,
        minWidth: 300,
        alignSelf: 'flex-start',
        fontSize: 24,
        [theme.breakpoints.down('md')]: {
            alignSelf: 'center'
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: 0,
            width: '100%',
            fontSize: 20,
        },
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        textAlign: 'center',
    },
    paragraph: {
        fontSize: '18px',
    },
    window: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        overflow: 'hidden',
    },
    windowheader: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: theme.spacing(1),
        background: 'white',
        boxShadow: '0 5px 7px rgba(0,0,0,0.1)'
    },
    logo: {
        marginTop: '0.25rem',
        marginLeft: '0.25rem',
        width: 30,
        cursor: 'pointer',
    },
    tabs: {
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center',
        fontWeight: 700,
        textTransform: 'uppercase',
        '& > div': {
            cursor: 'pointer',
        },
        [theme.breakpoints.down('xs')]: {
            '& > div': {
                display: 'none',
            },
            '& > div:nth-of-type(1)': {
                display: 'flex',
            },
        },
    },
    user: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        fontWeight: 700,
        cursor: 'pointer',
    },
    avatar: {
        width: 30,
        height: 30,
    },
    windowcontent: {
        display: 'flex',
        gap: '1rem',
        padding: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
    windowdisplay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1),
        backgroundColor: 'black',
        height: '65%',
        [theme.breakpoints.down('md')]: {
            minHeight: '70vh',
        },
        [theme.breakpoints.down('xs')]: {
            minHeight: '50vh',
        },
    },
    windowsidebar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        [theme.breakpoints.down('md')]: {
            alignItems: 'center',
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        width: '100%',
        padding: theme.spacing(2),
    },
    buttonwrapper: {
        display: 'flex',
        gap: '0.5rem',
        alignSelf: 'end',
    },
    userheader: {
        display: 'flex',
        gap: '0.5rem',
    },
    searchcontainer: {
        width: '100%',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    searchwrapper: {
        display: 'flex',
        gap: '0.5rem',
        width: '100%',
    },
    pinnedpaper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        width: '100%',
        padding: theme.spacing(2),
        paddingTop: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            marginTop: '1rem',
        },
    },
    pinheader: {
        position: 'absolute',
        top: '-1rem',
        left: '50%',
        display: 'flex',
        gap: '2.5rem',
        whiteSpace: 'nowrap',
        transform: 'translateX(-50%)',
    },
    chip: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        background: '#F5C64F',
        textTransform: 'uppercase',
        fontWeight: 600,
    },
    arrow: {
        fontSize: '18px',
    },
    windowtitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '0.5rem',
    },
    userbutton: {
        fontSize: '12px',
    },
    papertext: {
        fontSize: '13px',
    },
    selectbuttons: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    subview: {
        textAlign: 'left',
    },
    feedbackwrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    feedbuttons: {
        display: 'flex',
        '& > *': {
            width: '50%',
        }
    },
    pinnedbuttons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    modfeedrow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modfeedrowqueue: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    likes: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        fontSize: '1rem',
        '& > *:nth-of-type(1)': {
            fontSize: '1.25rem',
            color: '#8eafff'
        }
    },
    filler: {
        visibility: 'hidden',
    },
    queuebuttonactive: {
        background: '#8eafff',
        '&:hover': {
            background: '#7ea0f2',
        }
    },
    queuebuttoninactive: {
        background: '#c4d5ff',
        '&:hover': {
            background: '#aec2f2',
        }
    },
    queuecaption: {
        marginTop: '-0.5rem',
        marginBottom: '1rem',
        textAlign: 'center',
        fontWeight: 600,
        color: 'grey',
        [theme.breakpoints.down('md')]: {
            marginTop: 0,
            marginBottom: 0,
        },
    },
    desktopqueuebuttons: {
        display: 'flex',
        gap: '0.5rem',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    mobilequeuebuttons: {
        display: 'flex',
        gap: '0.5rem',
        width: '100%',
        marginTop: '-0.5rem',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    yellowshadow: {
        boxShadow: '10px 10px 0 0 #f5c64f',
    },
    blueshadow: {
        boxShadow: '10px 10px 0 0 #4056a1'
    },
    lightblueshadow: {
        boxShadow: '10px 10px 0 0 #8eafff'
    },
    smallscale: {
        transform: 'scale(0.85)',
        margin: '-3.5rem 0',
        [theme.breakpoints.down('md')]: {
            margin: '-5.5rem 0'
        },
    },
    roleicon: {
        fontSize: '5.5rem',
    },
    partners: {
        display: 'flex',
        gap: '4rem',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            gap: '3rem',
        },
        [theme.breakpoints.down('sm')]: {
            gap: '2rem',
        },
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        textAlign: 'center',
    },
    paragraph: {
        fontSize: '18px',
    },
    window: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        overflow: 'hidden',
    },
    windowheader: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: theme.spacing(1),
        background: 'white',
        boxShadow: '0 5px 7px rgba(0,0,0,0.1)'
    },
    logo: {
        marginTop: '0.25rem',
        marginLeft: '0.25rem',
        width: 30,
        cursor: 'pointer',
    },
    tabs: {
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center',
        fontWeight: 700,
        textTransform: 'uppercase',
        '& > div': {
            cursor: 'pointer',
        }
    },
    user: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        fontWeight: 700,
        cursor: 'pointer',
    },
    avatar: {
        width: 30,
        height: 30,
    },
    windowcontent: {
        display: 'flex',
        gap: '1rem',
        padding: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    windowdisplay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1),
        backgroundColor: 'black',
        height: '65%',
        [theme.breakpoints.down('sm')]: {
            minHeight: '70vh',
        },
        [theme.breakpoints.down('xs')]: {
            minHeight: '50vh',
        },
    },
    windowsidebar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        [theme.breakpoints.down('md')]: {
            alignItems: 'center',
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        width: '100%',
        // maxWidth: 425,
        padding: theme.spacing(2),
    },
    subpaper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: theme.spacing(2),
    },
    buttonwrapper: {
        display: 'flex',
        gap: '0.5rem',
        alignSelf: 'end',
    },
    dropdown: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userheader: {
        display: 'flex',
        gap: '0.5rem',
    },
    paperdropdown: {
        borderRadius: '9999px',
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    searchcontainer: {
        width: '100%',
    },
    searchwrapper: {
        display: 'flex',
        gap: '0.5rem',
        width: '100%',
    },
    pinnedpaper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        width: '100%',
        // maxWidth: 425,
        padding: theme.spacing(2),
        paddingTop: theme.spacing(3),
    },
    pinheader: {
        position: 'absolute',
        top: '-1rem',
        left: '50%',
        display: 'flex',
        gap: '2.5rem',
        whiteSpace: 'nowrap',
        transform: 'translateX(-50%)',
    },
    chip: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        background: '#F5C64F',
        textTransform: 'uppercase',
        fontWeight: 600,
    },
    arrow: {
        fontSize: '18px',
    },
    windowtitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '0.5rem',
    },
    userbutton: {
        fontSize: '12px',
    },
    papertext: {
        fontSize: '13px',
    },
    yellowshadow: {
        boxShadow: '10px 10px 0 0 #f5c64f'
    },
    blueshadow: {
        boxShadow: '10px 10px 0 0 #4056a1'
    },
    lightblueshadow: {
        boxShadow: '10px 10px 0 0 #8eafff'
    },
    selectbuttons: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
    },
    partners: {
        display: 'flex',
        gap: '4rem',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            gap: '3rem',
        },
        [theme.breakpoints.down('sm')]: {
            gap: '2rem',
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            gap: '1rem',
        },
    },
    roleicon: {
        fontSize: '5.5rem',
    },
    smallscale: {
        // transform: 'scale(0.8)',
        // margin: '-4rem 0'
    },
    subview: {
        textAlign: 'left',
    },
    feedbackwrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    feedbuttons: {
        display: 'flex',
        '& > *': {
            width: '50%',
        }
    },
    pinnedbuttons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    modfeedrow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modfeedrowqueue: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    likes: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        fontSize: '1rem',
        '& > *:nth-of-type(1)': {
            fontSize: '1.25rem',
            color: '#8eafff'
        }
    },
    filler: {
        visibility: 'hidden',
    },
    queuebuttonactive: {
        background: '#8eafff',
        '&:hover': {
            background: '#7ea0f2',
        }
    },
    queuebuttoninactive: {
        background: '#c4d5ff',
        '&:hover': {
            background: '#aec2f2',
        }
    },
    queuecaption: {
        marginTop: '-0.5rem',
        marginBottom: '1rem',
        textAlign: 'center',
        fontWeight: 600,
        color: 'grey',
    },
}));

export default function Home() {
    const classes = useStyles();
    const router = useRouter();
    const [viewerFeed, setViewerFeed] = React.useState('Feed')
    const [subViewerFeed, setSubViewerFeed] = React.useState('Feed')
    const [subModFeed, setSubModFeed] = React.useState('Queue')
    const [subModQueue, setSubModQueue] = React.useState('Upcoming')
    const [activeRole, setActiveRole] = React.useState(0);
    const [activeView, setActiveView] = React.useState(0);
  
    const handleNextRole = () => {
        setActiveRole((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBackRole = () => {
        setActiveRole((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNextView = () => {
        setActiveView((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBackView = () => {
        setActiveView((prevActiveStep) => prevActiveStep - 1);
    };

    const roles = [
        <>
            <Typography variant='h4'>
                Partcipant Role
            </Typography>
            <div>
                <PeopleAltOutlinedIcon className={classes.roleicon}/>
            </div>
            <Typography variant='body1' className={classes.paragraph}>
                The residents who want to engage in discussion on a policy topic. Participants 
                can type and ask questions; they can like, quote, and reply to other 
                participant&apos;s questions; they can participate in breakout rooms.
            </Typography>
        </>,
        <>
            <Typography variant='h4'>
                Moderator Role
            </Typography>
            <div>
                <SupervisedUserCircleOutlinedIcon className={classes.roleicon}/>
            </div>
            <Typography variant='body1' className={classes.paragraph}>
                The mediators who handle participants&apos; questions to be answered by the
                speaker. Moderators see the full question list and the question queue that was 
                curated by the moderator assistants; they select which question to ask next; 
                they ask the question on the video call for the speaker to respond.
                Moderators interact with the speaker via a streaming service of
                the organizer&apos;s choice.
            </Typography>
        </>,
        <>
            <Typography variant='h4'>
                Speaker Role
            </Typography>
            <div>
                <RecordVoiceOverOutlinedIcon className={classes.roleicon}/>
            </div>
            <Typography variant='body1' className={classes.paragraph}>
                The main speaker of a discussion. The speaker does not see the question list or 
                the question queue. Instead, meetings appear like an ordinary video call with 
                the moderator. The speaker interacts with the moderators via a streaming service 
                of the organizer&apos;s choice.
            </Typography>
        </>
    ]

    const views = [
        <div className={`${classes.subview} ${classes.smallscale}`}>
            <Typography variant='body1'>
                Participant View
            </Typography>
            <div className={classes.blueshadow}>
                <Paper elevation={3} square className={classes.window}>
                    <Grid item xs={12} className={classes.windowheader}>
                        <div className={classes.tabs}>
                            <div className={classes.logo}>
                                <Image
                                    src='/static/prytaneum_logo.svg' 
                                    width={50}
                                    height={49}
                                    objectFit='contain'
                                />
                            </div>
                            <div>Home</div>
                            <div>Dashboard</div>
                            <div>About Us</div>
                        </div>
                        <div className={classes.user}>
                            <div>
                                <Avatar className={classes.avatar}>L</Avatar>
                            </div>
                            <div>
                                Lorem Ipsum
                            </div>
                            <KeyboardArrowDownIcon className={classes.arrow}/>
                        </div>
                    </Grid>
                    <div className={classes.windowcontent}>
                        <Grid item xs={12} md={7} >
                            <div className={classes.windowdisplay}>
                                <Grid item xs={6}>
                                    <Image
                                        src='https://i.ibb.co/cNvfQC8/cam1.png' 
                                        width={1146}
                                        height={648}
                                        objectFit='contain'
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Image
                                        src='https://i.ibb.co/xG0SYBT/cam2.png' 
                                        width={1146}
                                        height={648}
                                        objectFit='contain'
                                    />
                                </Grid>
                            </div>
                            <div className={classes.windowtitle}>
                                <div>
                                    <Typography variant='h6'>
                                        Town Hall Meeting
                                    </Typography>
                                    <Typography variant='caption'>
                                        Concerns within the city
                                    </Typography>
                                </div>
                                <div className={classes.userheader}>
                                    <div>
                                        <Avatar>E</Avatar>
                                    </div>
                                    <div>
                                        <Typography variant='h6'>
                                            Elias Dagmar
                                        </Typography>
                                        <Typography variant='caption'>
                                            Town Official
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={5}  className={classes.windowsidebar}>
                            <Paper elevation={3} className={classes.pinnedpaper}>
                                <div className={classes.pinheader}>
                                    <Chip 
                                        size='small'
                                        color='secondary'
                                        icon={<BookmarkIcon/>}
                                        label='Answering Now'
                                        className={classes.chip}
                                    />
                                </div>
                                <div className={classes.userheader}>
                                    <div>
                                        <Avatar>A</Avatar>
                                    </div>
                                    <div>
                                        <Typography variant='subtitle2'>
                                            Asami Gisela
                                        </Typography>
                                        <Typography variant='caption'>
                                            10:12 AM · 11/20/2021
                                        </Typography>
                                    </div>
                                </div>
                                <Typography variant='subtitle2' className={classes.papertext}>
                                    What are your calls to action concerning the 
                                    homelessness in the city? What decisions will you be 
                                    making to attend to the matter?
                                </Typography>
                            </Paper>
                            <div className={classes.selectbuttons}>
                                <Button
                                    variant={subViewerFeed === 'Feed' ? 'contained' : 'outlined'}
                                    color='primary'
                                    onClick={() => setSubViewerFeed('Feed')}
                                >
                                    Feed
                                </Button>
                                <Button
                                    variant={subViewerFeed === 'Feedback' ? 'contained' : 'outlined'}
                                    color='primary'
                                    onClick={() => setSubViewerFeed('Feedback')}
                                >
                                    Feedback
                                </Button>
                            </div>
                            <div className={classes.searchcontainer}>
                                <div className={classes.searchwrapper}>
                                    <TextField
                                        label='Search'
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        edge='end'
                                                    >
                                                        <SearchIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <IconButton disabled>
                                        <RefreshIcon />
                                    </IconButton>
                                </div>
                                <Typography variant='caption'>
                                    10 Results Displayed
                                </Typography>
                            </div>
                            { subViewerFeed  === 'Feed' ?
                                <>
                                    <Button
                                        fullWidth
                                        variant='contained'
                                        color='primary'
                                        startIcon={<QuestionAnswerIcon/>}
                                        className={classes.userbutton}
                                    >
                                        Ask a Question
                                    </Button>
                                    <Paper elevation={3} className={classes.paper}>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>A</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Asami Gisela
                                                </Typography>
                                                <Typography variant='caption'>
                                                    10:12 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <Typography variant='subtitle2' className={classes.papertext}>
                                            What are your calls to action concerning the 
                                            homelessness in the city? What decisions will you be 
                                            making to attend to the matter?
                                        </Typography>
                                        <div className={classes.feedbuttons}>
                                            <Button size='small' endIcon={<ThumbUpIcon/>}>
                                                Like
                                            </Button>
                                            <Button size='small' endIcon={<FormatQuoteIcon/>}>
                                                Quote
                                            </Button>
                                        </div>
                                    </Paper>
                                    <Paper elevation={3} className={classes.paper}>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>R</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Raul Aditya
                                                </Typography>
                                                <Typography variant='caption'>
                                                    10:15 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <Typography variant='subtitle2' className={classes.papertext}>
                                            What do you think is the best way to tackle the issue
                                            with providing equal opportunities for education for 
                                            underrepresented communities in the city?
                                        </Typography>
                                        <div className={classes.feedbuttons}>
                                            <Button size='small' endIcon={<ThumbUpIcon/>}>
                                                Like
                                            </Button>
                                            <Button size='small' endIcon={<FormatQuoteIcon/>}>
                                                Quote
                                            </Button>
                                        </div>
                                    </Paper>
                                </>
                                :
                                <>
                                    <Button
                                        fullWidth
                                        variant='contained'
                                        color='primary'
                                        startIcon={<QuestionAnswerIcon/>}
                                        className={classes.userbutton}
                                    >
                                        Give Feedback
                                    </Button>
                                    <Paper elevation={3} className={classes.paper}>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>L</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Yourself
                                                </Typography>
                                                <Typography variant='caption'>
                                                    10:05 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <Typography variant='subtitle2' className={classes.papertext}>
                                            Perhaps a more ideal solution would be...
                                        </Typography>
                                    </Paper>
                                    <Paper elevation={3} className={classes.paper}>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>L</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Yourself
                                                </Typography>
                                                <Typography variant='caption'>
                                                    10:02 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <Typography variant='subtitle2' className={classes.papertext}>
                                            I think a better follow-up would be...
                                        </Typography>
                                    </Paper>
                                    <Paper elevation={3} className={classes.paper}>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>L</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Yourself
                                                </Typography>
                                                <Typography variant='caption'>
                                                    10:01 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <Typography variant='subtitle2' className={classes.papertext}>
                                            I think you make a good point regarding...
                                        </Typography>
                                    </Paper>
                                </>
                            }
                            
                        </Grid>
                    </div>
                </Paper>
            </div>
        </div>,
        <div className={`${classes.subview} ${classes.smallscale}`}>
            <Typography variant='body1'>
                Moderator View
            </Typography>
            <div className={classes.lightblueshadow}>
                <Paper elevation={3} square className={classes.window}>
                    <Grid item xs={12} className={classes.windowheader}>
                        <div className={classes.tabs}>
                            <div className={classes.logo}>
                                <Image
                                    src='/static/prytaneum_logo.svg' 
                                    width={50}
                                    height={49}
                                    objectFit='contain'
                                />
                            </div>
                            <div>Home</div>
                            <div>Dashboard</div>
                            <div>About Us</div>
                        </div>
                        <div className={classes.user}>
                            <div>
                                <Avatar className={classes.avatar}>I</Avatar>
                            </div>
                            <div>
                                Ipsum Dolor
                            </div>
                            <KeyboardArrowDownIcon className={classes.arrow}/>
                        </div>
                    </Grid>
                    <div className={classes.windowcontent}>
                        <Grid item xs={12} md={7} >
                            <div className={classes.windowdisplay}>
                                <Grid item xs={6}>
                                    <Image
                                        src='https://i.ibb.co/cNvfQC8/cam1.png' 
                                        width={1146}
                                        height={648}
                                        objectFit='contain'
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Image
                                        src='https://i.ibb.co/xG0SYBT/cam2.png' 
                                        width={1146}
                                        height={648}
                                        objectFit='contain'
                                    />
                                </Grid>
                            </div>
                            <div className={classes.windowtitle}>
                                <div>
                                    <Typography variant='h6'>
                                        Town Hall Meeting
                                    </Typography>
                                    <Typography variant='caption'>
                                        Concerns within the city
                                    </Typography>
                                </div>
                                <div className={classes.userheader}>
                                    <div>
                                        <Avatar>E</Avatar>
                                    </div>
                                    <div>
                                        <Typography variant='h6'>
                                            Elias Dagmar
                                        </Typography>
                                        <Typography variant='caption'>
                                            Town Official
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={5}  className={classes.windowsidebar}>
                            <Paper elevation={3} className={classes.pinnedpaper}>
                                <div className={classes.pinheader}>
                                    <Chip 
                                        size='small'
                                        color='secondary'
                                        icon={<BookmarkIcon/>}
                                        label='Answering Now'
                                        className={classes.chip}
                                    />
                                </div>
                                <div className={classes.userheader}>
                                    <div>
                                        <Avatar>A</Avatar>
                                    </div>
                                    <div>
                                        <Typography variant='subtitle2'>
                                            Asami Gisela
                                        </Typography>
                                        <Typography variant='caption'>
                                            10:12 AM · 11/20/2021
                                        </Typography>
                                    </div>
                                </div>
                                <Typography variant='subtitle2' className={classes.papertext}>
                                    What are your calls to action concerning the 
                                    homelessness in the city? What decisions will you be 
                                    making to attend to the matter?
                                </Typography>
                                <div className={classes.pinnedbuttons}>
                                    <Button
                                        size='small'
                                        startIcon={<SkipPreviousIcon />}
                                    >
                                        Previous Question
                                    </Button>
                                    <Button
                                        size='small'
                                        endIcon={<SkipNextIcon />}
                                    >
                                        Next Question
                                    </Button>
                                </div>
                            </Paper>
                            <div className={classes.selectbuttons}>
                                <Button
                                    variant={subModFeed === 'Queue' ? 'contained' : 'outlined'}
                                    color='primary'
                                    onClick={() => setSubModFeed('Queue')}
                                >
                                    Queue
                                </Button>
                                { subModFeed === 'Queue' &&
                                    <>
                                        <Button
                                            size='small'
                                            variant='contained'
                                            color='primary'
                                            onClick={() => setSubModQueue('Upcoming')}
                                            className={subModQueue === 'Upcoming' ? `${classes.queuebuttonactive}` : `${classes.queuebuttoninactive}`}
                                        >
                                            Upcoming
                                        </Button>
                                        <Button
                                            size='small'
                                            variant='contained'
                                            color='primary'
                                            onClick={() => setSubModQueue('Past')}
                                            className={subModQueue === 'Past' ? `${classes.queuebuttonactive}` : `${classes.queuebuttoninactive}`}
                                        >
                                            Past
                                        </Button>
                                    </>
                                }
                                <Button
                                    variant={subModFeed === 'Feed' ? 'contained' : 'outlined'}
                                    color='primary'
                                    onClick={() => setSubModFeed('Feed')}
                                >
                                    Feed
                                </Button>
                                <Button
                                    variant={subModFeed === 'Feedback' ? 'contained' : 'outlined'}
                                    color='primary'
                                    onClick={() => setSubModFeed('Feedback')}
                                >
                                    Feedback
                                </Button>
                            </div>
                            <div className={classes.searchcontainer}>
                                <div className={classes.searchwrapper}>
                                    <TextField
                                        label='Search'
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        edge='end'
                                                    >
                                                        <SearchIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <IconButton disabled>
                                        <RefreshIcon />
                                    </IconButton>
                                </div>
                                <Typography variant='caption'>
                                    10 Results Displayed
                                </Typography>
                            </div>
                            { subModFeed  === 'Queue' && subModQueue === 'Upcoming' &&
                                <>
                                    <Typography variant='caption' className={classes.queuecaption}>
                                        Drag and drop questions to re-order queue
                                    </Typography>
                                    <Paper elevation={3} className={classes.pinnedpaper}>
                                        <div className={classes.pinheader}>
                                            <Chip 
                                                size='small'
                                                color='secondary'
                                                icon={<BookmarkIcon/>}
                                                label='Next Question'
                                                className={classes.chip}
                                            />
                                        </div>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>T</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Theresa Young
                                                </Typography>
                                                <Typography variant='caption'>
                                                    10:09 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <Typography variant='subtitle2' className={classes.papertext}>
                                            When do you believe decisions regarding solving
                                            this concern will have an impact in the future?
                                        </Typography>
                                        <div className={classes.modfeedrowqueue}>
                                            <Button size='small' endIcon={<RemoveCircleIcon/>}>
                                                Dequeue
                                            </Button>
                                        </div>
                                    </Paper>
                                    <Paper elevation={3} className={classes.paper}>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>S</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Simon Turner
                                                </Typography>
                                                <Typography variant='caption'>
                                                    10:11 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <Typography variant='subtitle2' className={classes.papertext}>
                                            How would you bring this certain concern to attention,
                                            and what are your steps to solving this issue?
                                        </Typography>
                                        <div className={classes.modfeedrowqueue}>
                                            <Button size='small' endIcon={<RemoveCircleIcon/>}>
                                                Dequeue
                                            </Button>
                                        </div>
                                    </Paper>
                                </>
                            }
                            { subModFeed  === 'Queue' && subModQueue === 'Past' &&
                                <>
                                    <Paper elevation={3} className={classes.paper}>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>O</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Olivia Powell
                                                </Typography>
                                                <Typography variant='caption'>
                                                    10:05 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <Typography variant='subtitle2' className={classes.papertext}>
                                            What is your approach regarding concerns within the city?
                                        </Typography>
                                    </Paper>
                                    <Paper elevation={3} className={classes.paper}>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>J</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Jasmine Payne
                                                </Typography>
                                                <Typography variant='caption'>
                                                    10:02 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <Typography variant='subtitle2' className={classes.papertext}>
                                            How do you believe the recent actions towards 
                                            solving homelessness in the city will actually help?
                                        </Typography>
                                    </Paper>
                                    <Paper elevation={3} className={classes.paper}>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>D</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Dominic Baker
                                                </Typography>
                                                <Typography variant='caption'>
                                                    9:59 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <Typography variant='subtitle2' className={classes.papertext}>
                                            What are your priorities regarding providing
                                            education to underrepresented minorities in the city?
                                        </Typography>
                                    </Paper>
                                </>
                            }
                            { subModFeed  === 'Feed' &&
                                <>
                                    <Paper elevation={3} className={classes.paper}>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>A</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Asami Gisela
                                                </Typography>
                                                <Typography variant='caption'>
                                                    10:12 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <Typography variant='subtitle2' className={classes.papertext}>
                                            What are your calls to action concerning the 
                                            homelessness in the city? What decisions will you be 
                                            making to attend to the matter?
                                        </Typography>
                                        <div className={classes.modfeedrow}>
                                            <div className={classes.likes}>
                                                <ThumbUpIcon/> 14
                                            </div>
                                            <Button size='small' endIcon={<AddCircleIcon/>}>
                                                Enqueue
                                            </Button>
                                            <div className={`${classes.likes} ${classes.filler}`}>
                                                <ThumbUpIcon/> 14
                                            </div>
                                        </div>
                                    </Paper>
                                    <Paper elevation={3} className={classes.paper}>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>R</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Raul Aditya
                                                </Typography>
                                                <Typography variant='caption'>
                                                    10:15 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <Typography variant='subtitle2' className={classes.papertext}>
                                            What do you think is the best way to tackle the issue
                                            with providing equal opportunities for education for 
                                            underrepresented communities in the city?
                                        </Typography>
                                        <div className={classes.modfeedrow}>
                                            <div className={classes.likes}>
                                                <ThumbUpIcon/> 11
                                            </div>
                                            <Button size='small' endIcon={<AddCircleIcon/>}>
                                                Enqueue
                                            </Button>
                                            <div className={`${classes.likes} ${classes.filler}`}>
                                                <ThumbUpIcon/> 11
                                            </div>
                                        </div>
                                    </Paper>
                                </>
                            }
                            { subModFeed  === 'Feedback' &&
                                <>
                                    <Paper elevation={3} className={classes.paper}>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>L</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Lorem Ipsum
                                                </Typography>
                                                <Typography variant='caption'>
                                                    10:05 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.feedbackwrapper}>
                                            <Typography variant='subtitle2' className={classes.papertext}>
                                                Perhaps a more ideal solution would be...
                                            </Typography>
                                            <Button
                                                variant='text'
                                                startIcon={<ReplyIcon/>}
                                                className={classes.userbutton}
                                            >
                                                Reply
                                            </Button>
                                        </div>
                                    </Paper>
                                    <Paper elevation={3} className={classes.paper}>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>L</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Lorem Ipsum
                                                </Typography>
                                                <Typography variant='caption'>
                                                    10:02 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.feedbackwrapper}>
                                            <Typography variant='subtitle2' className={classes.papertext}>
                                                I think a better follow-up would be...
                                            </Typography>
                                            <Button
                                                variant='text'
                                                startIcon={<ReplyIcon/>}
                                                className={classes.userbutton}
                                            >
                                                Reply
                                            </Button>
                                        </div>
                                    </Paper>
                                    <Paper elevation={3} className={classes.paper}>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>L</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Lorem Ipsum
                                                </Typography>
                                                <Typography variant='caption'>
                                                    10:01 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={classes.feedbackwrapper}>
                                            <Typography variant='subtitle2' className={classes.papertext}>
                                                I think you make a good point regarding...
                                            </Typography>
                                            <Button
                                                variant='text'
                                                startIcon={<ReplyIcon/>}
                                                className={classes.userbutton}
                                            >
                                                Reply
                                            </Button>
                                        </div>
                                    </Paper>
                                </>
                            }
                            
                        </Grid>
                    </div>
                </Paper>
            </div>
        </div>
    ]

    const [user] = useUser();

    React.useEffect(() => {
        if (user) router.push('/organizations/me');
    }, [user, router]);

    return (
        <>
            <Grid container alignItems='center' justify='center' spacing={2} className={classes.landing}>
                <Grid item xs={12} md={6} className={classes.header}>
                    <div className={classes.title}>
                        <Image
                            src='/static/prytaneum_logo2.svg' 
                            width={3483}
                            height={665}
                            objectFit='contain'
                        />
                    </div>
                    <Typography variant='h5' className={classes.subtitle}>
                        A crucial tool for a better democracy.
                    </Typography>
                    {user ? 
                        <Button variant='contained' color='secondary' className={classes.button} onClick={() => router.push('/app/home')}>
                            Go to Dashboard
                        </Button>
                        : 
                        <Button variant='contained' color='secondary' className={classes.button} onClick={() => router.push('/register')}>
                            Register
                        </Button>
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <Image
                        src='/static/prytaneum_landing_graphic.svg' 
                        width={3292}
                        height={2097}
                        objectFit='contain'
                        alt='Prytaneum Logo'
                    />
                </Grid>
            </Grid>
            <Grid container alignItems='center' justify='center' spacing={2} className={classes.root}>
                <Grid item xs={12} className={classes.section}>
                    <Typography variant='h4'>
                        What is Prytaneum?
                    </Typography>
                    <Typography variant='body1' className={classes.paragraph}>
                        Prytaneum is an open-source, highly-interactive online
                        town hall platform powered by artificial intelligence and
                        an innovative user interface.
                    </Typography>
                    <Typography variant='body1' className={classes.paragraph}>
                        Our town hall platform enables constructive, virtual dialogue
                        between government officials and their constituents - creating
                        opportunities for democratic engagement that is not available
                        through commercially available webinar or streaming platforms.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.yellowshadow}>
                        <Paper elevation={3} square className={classes.window}>
                            <Grid item xs={12} className={classes.windowheader}>
                                <div className={classes.tabs}>
                                    <div className={classes.logo}>
                                        <Image
                                            src='/static/prytaneum_logo.svg' 
                                            width={50}
                                            height={49}
                                            objectFit='contain'
                                        />
                                    </div>
                                    <div>Home</div>
                                    <div>Dashboard</div>
                                    <div>About Us</div>
                                </div>
                                <div className={classes.user}>
                                    <div>
                                        <Avatar className={classes.avatar}>L</Avatar>
                                    </div>
                                    <div>
                                        Lorem Ipsum
                                    </div>
                                    <KeyboardArrowDownIcon className={classes.arrow}/>
                                </div>
                            </Grid>
                            <div className={classes.windowcontent}>
                                <Grid item xs={12} md={7} >
                                    <div className={classes.windowdisplay}>
                                        <Grid item xs={6}>
                                            <Image
                                                src='https://i.ibb.co/cNvfQC8/cam1.png' 
                                                width={1146}
                                                height={648}
                                                objectFit='contain'
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Image
                                                src='https://i.ibb.co/xG0SYBT/cam2.png' 
                                                width={1146}
                                                height={648}
                                                objectFit='contain'
                                            />
                                        </Grid>
                                    </div>
                                    <div className={classes.windowtitle}>
                                        <div>
                                            <Typography variant='h6'>
                                                Town Hall Meeting
                                            </Typography>
                                            <Typography variant='caption'>
                                                Concerns within the city
                                            </Typography>
                                        </div>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>E</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='h6'>
                                                    Elias Dagmar
                                                </Typography>
                                                <Typography variant='caption'>
                                                    Town Official
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={5}  className={classes.windowsidebar}>
                                    <Paper elevation={3} className={classes.pinnedpaper}>
                                        <div className={classes.pinheader}>
                                            <Chip 
                                                size='small'
                                                color='secondary'
                                                icon={<BookmarkIcon/>}
                                                label='Answering Now'
                                                className={classes.chip}
                                            />
                                        </div>
                                        <div className={classes.userheader}>
                                            <div>
                                                <Avatar>A</Avatar>
                                            </div>
                                            <div>
                                                <Typography variant='subtitle2'>
                                                    Asami Gisela
                                                </Typography>
                                                <Typography variant='caption'>
                                                    10:12 AM · 11/20/2021
                                                </Typography>
                                            </div>
                                        </div>
                                        <Typography variant='subtitle2' className={classes.papertext}>
                                            What are your calls to action concerning the 
                                            homelessness in the city? What decisions will you be 
                                            making to attend to the matter?
                                        </Typography>
                                    </Paper>
                                    <div className={classes.selectbuttons}>
                                        <Button
                                            variant={viewerFeed === 'Feed' ? 'contained' : 'outlined'}
                                            color='primary'
                                            onClick={() => setViewerFeed('Feed')}
                                        >
                                            Feed
                                        </Button>
                                        <Button
                                            variant={viewerFeed === 'Feedback' ? 'contained' : 'outlined'}
                                            color='primary'
                                            onClick={() => setViewerFeed('Feedback')}
                                        >
                                            Feedback
                                        </Button>
                                    </div>
                                    <div className={classes.searchcontainer}>
                                        <div className={classes.searchwrapper}>
                                            <TextField
                                                label='Search'
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <IconButton
                                                                aria-label='toggle password visibility'
                                                                edge='end'
                                                            >
                                                                <SearchIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <IconButton disabled>
                                                <RefreshIcon />
                                            </IconButton>
                                        </div>
                                        <Typography variant='caption'>
                                            10 Results Displayed
                                        </Typography>
                                    </div>
                                    { viewerFeed  === 'Feed' ?
                                        <>
                                            <Button
                                                fullWidth
                                                variant='contained'
                                                color='primary'
                                                startIcon={<QuestionAnswerIcon/>}
                                                className={classes.userbutton}
                                            >
                                                Ask a Question
                                            </Button>
                                            <Paper elevation={3} className={classes.paper}>
                                                <div className={classes.userheader}>
                                                    <div>
                                                        <Avatar>A</Avatar>
                                                    </div>
                                                    <div>
                                                        <Typography variant='subtitle2'>
                                                            Asami Gisela
                                                        </Typography>
                                                        <Typography variant='caption'>
                                                            10:12 AM · 11/20/2021
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <Typography variant='subtitle2' className={classes.papertext}>
                                                    What are your calls to action concerning the 
                                                    homelessness in the city? What decisions will you be 
                                                    making to attend to the matter?
                                                </Typography>
                                                <div className={classes.feedbuttons}>
                                                    <Button size='small' endIcon={<ThumbUpIcon/>}>
                                                        Like
                                                    </Button>
                                                    <Button size='small' endIcon={<FormatQuoteIcon/>}>
                                                        Quote
                                                    </Button>
                                                </div>
                                            </Paper>
                                            <Paper elevation={3} className={classes.paper}>
                                                <div className={classes.userheader}>
                                                    <div>
                                                        <Avatar>R</Avatar>
                                                    </div>
                                                    <div>
                                                        <Typography variant='subtitle2'>
                                                            Raul Aditya
                                                        </Typography>
                                                        <Typography variant='caption'>
                                                            10:15 AM · 11/20/2021
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <Typography variant='subtitle2' className={classes.papertext}>
                                                    What do you think is the best way to tackle the issue
                                                    with providing equal opportunities for education for 
                                                    underrepresented communities in the city?
                                                </Typography>
                                                <div className={classes.feedbuttons}>
                                                    <Button size='small' endIcon={<ThumbUpIcon/>}>
                                                        Like
                                                    </Button>
                                                    <Button size='small' endIcon={<FormatQuoteIcon/>}>
                                                        Quote
                                                    </Button>
                                                </div>
                                            </Paper>
                                        </>
                                        :
                                        <>
                                            <Button
                                                fullWidth
                                                variant='contained'
                                                color='primary'
                                                startIcon={<QuestionAnswerIcon/>}
                                                className={classes.userbutton}
                                            >
                                                Give Feedback
                                            </Button>
                                            <Paper elevation={3} className={classes.paper}>
                                                <div className={classes.userheader}>
                                                    <div>
                                                        <Avatar>L</Avatar>
                                                    </div>
                                                    <div>
                                                        <Typography variant='subtitle2'>
                                                            Yourself
                                                        </Typography>
                                                        <Typography variant='caption'>
                                                            10:05 AM · 11/20/2021
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <Typography variant='subtitle2' className={classes.papertext}>
                                                    Perhaps a more ideal solution would be...
                                                </Typography>
                                            </Paper>
                                            <Paper elevation={3} className={classes.paper}>
                                                <div className={classes.userheader}>
                                                    <div>
                                                        <Avatar>L</Avatar>
                                                    </div>
                                                    <div>
                                                        <Typography variant='subtitle2'>
                                                            Yourself
                                                        </Typography>
                                                        <Typography variant='caption'>
                                                            10:02 AM · 11/20/2021
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <Typography variant='subtitle2' className={classes.papertext}>
                                                    I think a better follow-up would be...
                                                </Typography>
                                            </Paper>
                                            <Paper elevation={3} className={classes.paper}>
                                                <div className={classes.userheader}>
                                                    <div>
                                                        <Avatar>L</Avatar>
                                                    </div>
                                                    <div>
                                                        <Typography variant='subtitle2'>
                                                            Yourself
                                                        </Typography>
                                                        <Typography variant='caption'>
                                                            10:01 AM · 11/20/2021
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <Typography variant='subtitle2' className={classes.papertext}>
                                                    I think you make a good point regarding...
                                                </Typography>
                                            </Paper>
                                        </>
                                    }
                                    
                                </Grid>
                            </div>
                        </Paper>
                    </div>
                </Grid>
            </Grid>
            <Grid container alignItems='center' justify='center' spacing={2} className={classes.root}>
                <Grid item xs={12} className={classes.section}>
                    <Typography variant='h4'>
                        A better solution for remote public engagement.
                    </Typography>
                    {views[activeView]}
                    <MobileStepper
                        variant='dots'
                        steps={2}
                        position='static'
                        activeStep={activeView}
                        nextButton={
                            <Button size='small' onClick={handleNextView} disabled={activeView === 1}>
                                Next
                                <KeyboardArrowRightIcon />
                            </Button>
                        }
                        backButton={
                            <Button size='small' onClick={handleBackView} disabled={activeView === 0}>
                                <KeyboardArrowLeftIcon />
                                Back
                            </Button>
                        }
                    />
                </Grid>
            </Grid>
            <Grid container alignItems='center' justify='center' spacing={2} className={classes.root}>
                <Grid item xs={12} className={classes.section}>
                    <Typography variant='body1' className={classes.paragraph}>
                        Just like any town hall, Prytaneum offers roles to fit the needs of 
                        any attendee: organizer, speaker, moderator, moderator assistant, and 
                        participant. Prytaneum complements these roles by promoting 
                        constructive engagement through the user interface and “pro-social” 
                        algorithm.
                    </Typography>
                    {roles[activeRole]}
                    <MobileStepper
                        variant='dots'
                        steps={3}
                        position='static'
                        activeStep={activeRole}
                        nextButton={
                            <Button size='small' onClick={handleNextRole} disabled={activeRole === 2}>
                                Next
                                <KeyboardArrowRightIcon />
                            </Button>
                        }
                        backButton={
                            <Button size='small' onClick={handleBackRole} disabled={activeRole === 0}>
                                <KeyboardArrowLeftIcon />
                                Back
                            </Button>
                        }
                    />
                </Grid>
            </Grid>
            <Grid container alignItems='center' justify='center' spacing={2} className={classes.root}>
                <Grid item xs={12} className={classes.partners}>
                    <Image
                        src='/static/democracy_fund_logo.svg' 
                        width={280}
                        height={200}
                        objectFit='contain'
                    />
                    <Image
                        src='/static/prytaneum_logo.svg' 
                        width={150}
                        height={200}
                        objectFit='contain'
                    />
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
