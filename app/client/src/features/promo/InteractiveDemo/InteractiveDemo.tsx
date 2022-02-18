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
import ReplyIcon from '@material-ui/icons/Reply';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    window: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
        overflow: 'hidden',
    },
    windowheader: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(1),
        boxShadow: '0 5px 7px rgba(0,0,0,0.1)'
    },
    logo: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        width: 30,
        cursor: 'pointer',
    },
    tabs: {
        display: 'flex',
        gap: theme.spacing(2),
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
        gap: theme.spacing(1),
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
        gap: theme.spacing(2),
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
        gap: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            alignItems: 'center',
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
        width: '100%',
        padding: theme.spacing(2),
    },
    userheader: {
        display: 'flex',
        gap: theme.spacing(1),
    },
    searchcontainer: {
        width: '100%',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    searchwrapper: {
        display: 'flex',
        gap: theme.spacing(1),
        width: '100%',
    },
    pinnedpaper: {
        position: 'relative',
        paddingTop: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(2),
        },
    },
    pinheader: {
        position: 'absolute',
        top: '-1rem',
        left: '50%',
        display: 'flex',
        gap: theme.spacing(3),
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
        marginTop: theme.spacing(1),
    },
    userbutton: {
        fontSize: '12px',
    },
    papertext: {
        fontSize: '13px',
    },
    selectbuttons: {
        display: 'flex',
        gap: theme.spacing(1),
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
        gap: theme.spacing(1),
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
        marginTop: theme.spacing(-1),
        marginBottom: theme.spacing(2),
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
        gap: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    mobilequeuebuttons: {
        display: 'flex',
        gap: theme.spacing(1),
        width: '100%',
        marginTop: theme.spacing(-1),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

interface WindowProps {
    children: React.ReactNode | React.ReactNodeArray;
    title?: string;
    shadow?: string;
    scale?: string;
}

interface DemoProps {
    title?: string;
    shadow?: string;
    scale?: string;
}

interface QuestionProps {
    pinned?: boolean;
    name: string;
    date: string;
    question: string;
}

interface ModQuestionProps {
    pinned?: boolean;
    past?: boolean;
    enqueued?: boolean;
    likes?: number;
    name: string;
    date: string;
    question: string;
}

interface FeedbackProps {
    me?: boolean;
    name: string;
    date: string;
    feedback: string;
}

function DemoWindow({children, title, shadow, scale}: WindowProps) {
    const classes = useStyles();
    return (
        <div style={{ transform: scale }} className={`${classes.subview}`}>
            <Typography variant='body1'>
                {title}
            </Typography>
            <div style={{ boxShadow: shadow }}>
                <Paper elevation={3} square className={classes.window}>
                    {children}
                </Paper>
            </div>
        </div>
    );
}

function Tabs() {
    const classes = useStyles();
    return (
        <Grid container item xs={12} className={classes.windowheader}>
            <div className={classes.tabs}>
                <div className={classes.logo}>
                    <Image
                        alt='Prytaneum Logo'
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
    );
}

function MeetingDisplay() {
    const classes = useStyles();
    return (
        <Grid item xs={12} lg={7}>
            <div className={classes.windowdisplay}>
                <Grid item xs={6}>
                    <Image
                        alt='Speaker Camera'
                        src='/static/cam1.png' 
                        width={1146}
                        height={648}
                        objectFit='contain'
                    />
                </Grid>
                <Grid item xs={6}>
                    <Image
                        alt='Speaker Camera'
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
    );
}

function SearchBar() {
    const classes = useStyles();
    return (
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
    );
}

function Question({pinned, name, date, question}: QuestionProps) {
    const classes = useStyles();
    return (
        <Paper elevation={3} className={`${classes.paper} ${pinned && classes.pinnedpaper}`}>
            {
                pinned &&
                <div className={classes.pinheader}>
                    <Chip 
                        size='small'
                        color='secondary'
                        icon={<BookmarkIcon/>}
                        label='Answering Now'
                        className={classes.chip}
                    />
                </div>
            }
            <div className={classes.userheader}>
                <div>
                    <Avatar>{name[0]}</Avatar>
                </div>
                <div>
                    <Typography variant='subtitle2'>
                        {name}
                    </Typography>
                    <Typography variant='caption'>
                        {date}
                    </Typography>
                </div>
            </div>
            <Typography variant='subtitle2' className={classes.papertext}>
                {question}
            </Typography>
            {   
                !pinned &&
                <div className={classes.feedbuttons}>
                    <Button size='small' endIcon={<ThumbUpIcon/>}>
                        Like
                    </Button>
                    <Button size='small' endIcon={<FormatQuoteIcon/>}>
                        Quote
                    </Button>
                </div>
            }
        </Paper>
    );
}

function Feedback({me, name, date, feedback}: FeedbackProps) {
    const classes = useStyles();
    return (
        <Paper elevation={3} className={classes.paper}>
            <div className={classes.userheader}>
                <div>
                    <Avatar>{name[0]}</Avatar>
                </div>
                <div>
                    <Typography variant='subtitle2'>
                        {me ? 'Yourself' : name}
                    </Typography>
                    <Typography variant='caption'>
                        {date}
                    </Typography>
                </div>
            </div>
            <div className={classes.feedbackwrapper}>
                <Typography variant='subtitle2' className={classes.papertext}>
                    {feedback}
                </Typography>
                { 
                    !me &&
                    <Button
                        variant='text'
                        startIcon={<ReplyIcon/>}
                        className={classes.userbutton}
                    >
                        Reply
                    </Button>
                }
            </div>
        </Paper>
    );
}

function ModQuestion({pinned, past, enqueued, likes, name, date, question}: ModQuestionProps) {
    const classes = useStyles();
    return (
        <Paper elevation={3} className={`${classes.paper} ${pinned && classes.pinnedpaper}`}>
            {
                pinned &&
                <div className={classes.pinheader}>
                    <Chip 
                        size='small'
                        color='secondary'
                        icon={<BookmarkIcon/>}
                        label='Next Question'
                        className={classes.chip}
                    />
                </div>
            }
            <div className={classes.userheader}>
                <div>
                    <Avatar>{name[0]}</Avatar>
                </div>
                <div>
                    <Typography variant='subtitle2'>
                        {name}
                    </Typography>
                    <Typography variant='caption'>
                        {date}
                    </Typography>
                </div>
            </div>
            <Typography variant='subtitle2' className={classes.papertext}>
                {question}
            </Typography>
            {
                !past && (enqueued ?
                    <div className={classes.modfeedrowqueue}>
                        <Button size='small' endIcon={<RemoveCircleIcon/>}>
                            Dequeue
                        </Button>
                    </div>
                    :
                    <div className={classes.modfeedrow}>
                        <div className={classes.likes}>
                            <ThumbUpIcon/> {likes}
                        </div>
                        <Button size='small' endIcon={<AddCircleIcon/>}>
                            Enqueue
                        </Button>
                        <div className={`${classes.likes} ${classes.filler}`}>
                            <ThumbUpIcon/> {likes}
                        </div>
                    </div>
                )
            }
        </Paper>
    );
}

export function ParticipantDemo({title, shadow, scale}: DemoProps) {
    const classes = useStyles();
    const [subViewerFeed, setSubViewerFeed] = React.useState('Feed')
    return (
        <DemoWindow title={title} shadow={shadow} scale={scale}>
            <Tabs/>
            <div className={classes.windowcontent}>
                <MeetingDisplay/>
                <Grid item xs={12} lg={5} className={classes.windowsidebar}>
                    <Question
                        pinned={Boolean(true)}
                        name='Asami Gisela'
                        date='10:12 AM · 11/20/2021'
                        question='What are your calls to action concerning the homelessness in the city? What decisions will you be making to attend to the matter?'
                    />
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
                    <SearchBar/>
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
                            <Question
                                name='Asami Gisela'
                                date='10:12 AM · 11/20/2021'
                                question='What are your calls to action concerning the homelessness in the city? What decisions will you be making to attend to the matter?'
                            />
                            <Question
                                name='Raul Aditya'
                                date='10:15 AM · 11/20/2021'
                                question='What do you think is the best way to tackle the issue with providing equal opportunities for education for  underrepresented communities in the city?'
                            />
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
                            <Feedback
                                me={Boolean(true)}
                                name='Lorem Ipsum'
                                date='10:05 AM · 11/20/2021'
                                feedback='Perhaps a more ideal solution would be...'
                            />
                            <Feedback
                                me={Boolean(true)}
                                name='Lorem Ipsum'
                                date='10:02 AM · 11/20/2021'
                                feedback='I think a better follow-up would be...'
                            />
                            <Feedback
                                me={Boolean(true)}
                                name='Lorem Ipsum'
                                date='10:01 AM · 11/20/2021'
                                feedback='I think you make a good point regarding...'
                            />
                        </>
                    }
                </Grid>
            </div>
        </DemoWindow>
    );
}

export function ModeratorDemo({title, shadow, scale}: DemoProps) {
    const classes = useStyles();
    const [subModFeed, setSubModFeed] = React.useState('Queue')
    const [subModQueue, setSubModQueue] = React.useState('Upcoming')

    return (
        <DemoWindow title={title} shadow={shadow} scale={scale}>
            <Tabs/>
            <div className={classes.windowcontent}>
                <MeetingDisplay/>
                <Grid item xs={12} lg={5} className={classes.windowsidebar}>
                    <Question
                        pinned={Boolean(true)}
                        name='Asami Gisela'
                        date='10:12 AM · 11/20/2021'
                        question='What are your calls to action concerning the homelessness in the city? What decisions will you be making to attend to the matter?'
                    />
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
                    <SearchBar/>
                    { subModFeed  === 'Queue' && subModQueue === 'Upcoming' &&
                        <>
                            <Typography variant='caption' className={classes.queuecaption}>
                                Drag and drop questions to re-order queue
                            </Typography>
                            <ModQuestion
                                pinned={Boolean(true)}
                                enqueued={Boolean(true)}
                                name='Theresa Young'
                                date='10:09 AM · 11/20/2021'
                                question='When do you believe decisions regarding solving this concern will have an impact in the future?'
                            />
                            <ModQuestion
                                enqueued={Boolean(true)}
                                name='Simon Turner'
                                date='10:11 AM · 11/20/2021'
                                question='How would you bring this certain concern to attention, and what are your steps to solving this issue?'
                            />
                        </>
                    }
                    { subModFeed  === 'Queue' && subModQueue === 'Past' &&
                        <>
                            <ModQuestion
                                past={Boolean(true)}
                                name='Olivia Powell'
                                date='10:05 AM · 11/20/2021'
                                question='What is your approach regarding concerns within the city?'
                            />
                            <ModQuestion
                                past={Boolean(true)}
                                name='Jasmine Payne'
                                date='10:02 AM · 11/20/2021'
                                question='How do you believe the recent actions towards solving homelessness in the city will actually help?'
                            />
                            <ModQuestion
                                past={Boolean(true)}
                                name='Dominic Baker'
                                date='9:59 AM · 11/20/2021'
                                question='What are your priorities regarding providing education to underrepresented minorities in the city?'
                            />
                        </>
                    }
                    { subModFeed  === 'Feed' &&
                        <>
                            <ModQuestion
                                past={Boolean(false)}
                                enqueued={Boolean(false)}
                                likes={14}
                                name='Asami Gisela'
                                date='10:12 AM · 11/20/2021'
                                question='What are your calls to action concerning the  homelessness in the city? What decisions will you be  making to attend to the matter?'
                            />
                            <ModQuestion
                                past={Boolean(false)}
                                enqueued={Boolean(false)}
                                likes={11}
                                name='Raul Aditya'
                                date='10:15 AM · 11/20/2021'
                                question='What do you think is the best way to tackle the issue with providing equal opportunities for education for  underrepresented communities in the city?'
                            />
                        </>
                    }
                    { subModFeed  === 'Feedback' &&
                        <>
                            <Feedback
                                name='Lorem Ipsum'
                                date='10:05 AM · 11/20/2021'
                                feedback='Perhaps a more ideal solution would be...'
                            />
                            <Feedback
                                name='Lorem Ipsum'
                                date='10:02 AM · 11/20/2021'
                                feedback='I think a better follow-up would be...'
                            />
                            <Feedback
                                name='Lorem Ipsum'
                                date='10:01 AM · 11/20/2021'
                                feedback='I think you make a good point regarding...'
                            />
                        </>
                    }
                </Grid>
            </div>
        </DemoWindow>
    );
}
