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
} from '@material-ui/core';
import { TextField } from '@local/components/TextField';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ReplyIcon from '@material-ui/icons/Reply';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    landing: {
        width: '100%',
        minHeight: '100vh',
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            minHeight: '90vh',
        },
    },
    root: {
        width: '100%',
        minHeight: '60vh',
        margin: '2rem 0'
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
}));

const DemoWindow = (
    <div>
        TODO
    </div>
)

export function ParticipantDemo() {
    const classes = useStyles();
    const [subViewerFeed, setSubViewerFeed] = React.useState('Feed')
    
    return (
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
                        <Grid item xs={12} lg={7}>
                            <div className={classes.windowdisplay}>
                                <Grid item xs={6}>
                                    <Image
                                        src='/static/cam1.png' 
                                        width={1146}
                                        height={648}
                                        objectFit='contain'
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Image
                                        src='/static/cam2.png' 
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
                        <Grid item xs={12} lg={5} className={classes.windowsidebar}>
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
        </div>
    );
}

export function ModeratorDemo() {
    const classes = useStyles();
    const [subModFeed, setSubModFeed] = React.useState('Queue')
    const [subModQueue, setSubModQueue] = React.useState('Upcoming')

    return (
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
                        <Grid item xs={12} lg={7}>
                            <div className={classes.windowdisplay}>
                                <Grid item xs={6}>
                                    <Image
                                        src='/static/cam1.png' 
                                        width={1146}
                                        height={648}
                                        objectFit='contain'
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Image
                                        src='/static/cam2.png' 
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
                        <Grid item xs={12} lg={5} className={classes.windowsidebar}>
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
                                    <div className={classes.desktopqueuebuttons}>
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
                                    </div>
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
                            { subModFeed === 'Queue' &&
                                <div className={classes.mobilequeuebuttons}>
                                    <SubdirectoryArrowRightIcon />
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
                                </div>
                            }
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
    );
}