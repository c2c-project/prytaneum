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
    ButtonGroup,
} from '@material-ui/core';
import { TextField } from '@local/components/TextField';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import FilterListIcon from '@material-ui/icons/FilterList';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import ReplyIcon from '@material-ui/icons/Reply';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { useUser } from '@local/features/accounts';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '85vh',
        paddingLeft: '1rem',
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
        [theme.breakpoints.down('sm')]: {
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
        [theme.breakpoints.down('xs')]: {
            minWidth: 0,
            width: '100%',
            fontSize: 20,
        },
        [theme.breakpoints.down('sm')]: {
            alignSelf: 'center'
        },
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
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
    },
    user: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        fontWeight: 700,
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
        height: '75%',
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
        gap: '1.25rem',
        [theme.breakpoints.down('md')]: {
            alignItems: 'center',
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: 425,
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
        gap: '1rem',
        width: '100%',
        maxWidth: 425,
        padding: theme.spacing(2),
        paddingTop: theme.spacing(3),
    },
    pinheader: {
        position: 'absolute',
        top: '-1rem',
        left: '50%',
        whiteSpace: 'nowrap',
        transform: 'translateX(-50%)',
    },
    chip: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 800,
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
        margin: '1rem 0',
    },
}));

export default function Home() {
    const classes = useStyles();
    const router = useRouter();

    const [user] = useUser();

    React.useEffect(() => {
        if (user) router.push('/organizations/me');
    }, [user, router]);

    return (
        <>
            <Grid container alignItems='center' justify='center' spacing={2} className={classes.root}>
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
                    <Paper square className={classes.window}>
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
                            <Grid item xs={12} md={7} lg={8}>
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
                            <Grid item xs={12} md={5} lg={4} className={classes.windowsidebar}>
                                <Paper elevation={3} className={classes.pinnedpaper}>
                                    <div className={classes.pinheader}>
                                        <Chip 
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
                                    <Typography variant='subtitle2'>
                                        What are your calls to action concerning the 
                                        homelessness in the city? What decisions will you be 
                                        making to attend to the matter?
                                    </Typography>
                                </Paper>
                                <Button
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    startIcon={<QuestionAnswerIcon/>}
                                    className={classes.userbutton}
                                >
                                    Ask a Question
                                </Button>
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
                                    <Typography variant='subtitle2'>
                                        What are your calls to action concerning the 
                                        homelessness in the city? What decisions will you be 
                                        making to attend to the matter?
                                    </Typography>
                                    <ButtonGroup fullWidth>
                                        <Button endIcon={<ThumbUpIcon/>}>
                                            Like
                                        </Button>
                                        <Button endIcon={<FormatQuoteIcon/>}>
                                            Quote
                                        </Button>
                                    </ButtonGroup>
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
                                                10:15 PM · 11/20/2021
                                            </Typography>
                                        </div>
                                    </div>
                                    <Typography variant='subtitle2'>
                                        What do you think is the best way to tackle the issue
                                        with providing equal opportunities for education for 
                                        underrepresented communities in the city?
                                    </Typography>
                                    <ButtonGroup fullWidth>
                                        <Button endIcon={<ThumbUpIcon/>}>
                                            Like
                                        </Button>
                                        <Button endIcon={<FormatQuoteIcon/>}>
                                            Quote
                                        </Button>
                                    </ButtonGroup>
                                </Paper>
                            </Grid>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container alignItems='center' justify='center' spacing={2} className={classes.root}>
                <Grid item xs={12} className={classes.section}>
                    <Typography variant='h4'>
                        A better solution for remote public engagement.
                    </Typography>
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
                </Grid>
            </Grid>
        </>
    );
}
