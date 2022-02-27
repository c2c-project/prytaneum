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
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ReplyIcon from '@mui/icons-material/Reply';
import HelpIcon from '@mui/icons-material/Help';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '85vh',
        paddingLeft: '1rem',
    },
    subtitle: {
        color: 'gray',
    },
    icon: {
        fontSize: '2.25rem',
    },
    window: {
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
        [theme.breakpoints.down('md')]: {
            minHeight: '70vh',
        },
        [theme.breakpoints.down('sm')]: {
            minHeight: '50vh',
        },
    },
    windowsidebar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        [theme.breakpoints.down('lg')]: {
            alignItems: 'center',
        },
    },
    paragraph: {
        fontSize: '18px',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    subsection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
    },
    subsectiontext: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        [theme.breakpoints.down('lg')]: {
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
        [theme.breakpoints.down('lg')]: {
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
    },
    relative: {
        position: 'relative',
        width: '100%',
    },
    topleft: {
        position: 'absolute',
        top: '-0.75rem',
        left: '-1.25rem',
        zIndex: 100,
    },
    topright: {
        position: 'absolute',
        top: '-0.75rem',
        right: '-1.25rem',
        zIndex: 100,
    },
    topmid: {
        position: 'absolute',
        top: '-0.75rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
    },
}));

export default function UserGuide() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [infoIndex, setInfoIndex] = React.useState(0);

    const info = [
        {
            title: 'Meeting Window',
            text: 'The window where you will see the speaker(s) and moderator(s).',
        },
        {
            title: 'Meeting Information',
            text: 'Click the down arrow to see more info about the town hall. See below for more information when you interact with it.',
        },
        {
            title: 'Ask a Question',
            text: 'Click the "Ask a Question" button to write and submit a question to the town hall. See below for more information when you interact with it.',
        },
        {
            title: 'Search Bar',
            text: 'Use the search bar to look through participant questions.',
        },
        {
            title: 'Like Button',
            text: 'Click the Like button to like any question you find agreeable.',
        },
        {
            title: 'Quote Button',
            // eslint-disable-next-line quotes
            text: "Click the Quote button to add to another's question by writing and submitting a quoted question to the town hall. See below for more information when you interact with it.",
        },
    ];

    const handleClickOpen = (index: number) => {
        setInfoIndex(index - 1);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container alignItems='center' className={classes.root} justifyContent='center' spacing={4}>
            <Grid item xs={4} sm={3}>
                <Image
                    src='https://i.ibb.co/qmXt8Fw/prytaneum-logo-filled.png'
                    width={1107}
                    height={1108}
                    objectFit='contain'
                    alt='Prytaneum Logo'
                />
            </Grid>
            <Grid item xs={12} sm={9} className={classes.section}>
                <Typography variant='h3'>
                    <BookOutlinedIcon className={classes.icon} /> <b>Guide to Prytaneum:</b> Participant
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    Participants are the residents who want to engage in discussion on a policy topic. In Prytaneum,
                    participants can type in questions to add to a question list; they can like, reply and quote another
                    participant`&#39`s question to follow up on one another`&#39`s questions.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='h4'>Attending a Town Hall</Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    To attend a town hall event, you must be invited to the event by the organizer through email or a
                    direct link.
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    Clicking on a Prytaneum invite link will direct you to the event where you can interact with the
                    town hall through participant actions.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='h4'>Participant Town Hall Interactions</Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    Clicking on any <Chip color='secondary' icon={<HelpIcon />} label='#' size='small' /> will reveal
                    more information about the corresponding element.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.window}>
                    <Grid item xs={12} md={7} lg={8} className={classes.windowdisplay}>
                        <Grid item xs={6} className={classes.relative}>
                            <Chip
                                color='secondary'
                                icon={<HelpIcon />}
                                label='1'
                                size='small'
                                className={classes.topleft}
                                onClick={() => handleClickOpen(1)}
                            />
                            <Image
                                src='https://i.ibb.co/cNvfQC8/cam1.png'
                                width={1146}
                                height={648}
                                objectFit='contain'
                                alt='Cam 1'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Image
                                src='https://i.ibb.co/xG0SYBT/cam2.png'
                                width={1146}
                                height={648}
                                objectFit='contain'
                                alt='Cam 2'
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={5} lg={4} className={classes.windowsidebar}>
                        <Paper elevation={5} className={classes.paperdropdown}>
                            <div className={classes.relative}>
                                <Chip
                                    color='secondary'
                                    icon={<HelpIcon />}
                                    label='2'
                                    size='small'
                                    className={classes.topright}
                                    onClick={() => handleClickOpen(2)}
                                />
                                <div className={classes.dropdown}>
                                    <div>
                                        <Typography variant='h6'>Town Hall Meeting</Typography>
                                    </div>
                                    <div>
                                        <IconButton size='large'>
                                            <KeyboardArrowDownIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                        <div className={classes.relative}>
                            <Chip
                                color='secondary'
                                icon={<HelpIcon />}
                                label='3'
                                size='small'
                                className={classes.topright}
                                onClick={() => handleClickOpen(3)}
                            />
                            <Button fullWidth variant='contained' color='primary' startIcon={<QuestionAnswerIcon />}>
                                Ask a Question
                            </Button>
                        </div>
                        <div className={classes.searchcontainer}>
                            <div className={classes.searchwrapper}>
                                <div className={classes.relative}>
                                    <Chip
                                        color='secondary'
                                        icon={<HelpIcon />}
                                        label='4'
                                        size='small'
                                        className={classes.topright}
                                        onClick={() => handleClickOpen(4)}
                                    />
                                    <TextField
                                        label='Search'
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        edge='end'
                                                        size='large'
                                                    >
                                                        <SearchIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <IconButton size='large'>
                                    <FilterListIcon />
                                </IconButton>
                                <IconButton disabled size='large'>
                                    <RefreshIcon />
                                </IconButton>
                            </div>
                            <Typography variant='caption'>20 Results Displayed</Typography>
                        </div>
                        <Paper elevation={5} className={classes.pinnedpaper}>
                            <div className={classes.pinheader}>
                                <Chip
                                    color='secondary'
                                    icon={<BookmarkIcon />}
                                    label='Current Question'
                                    className={classes.chip}
                                />
                            </div>
                            <div className={classes.userheader}>
                                <div>
                                    <Avatar>A</Avatar>
                                </div>
                                <div>
                                    <Typography variant='subtitle2'>Antonetta Weissnat</Typography>
                                    <Typography variant='caption'>2:28 PM · 10/11/2021</Typography>
                                </div>
                            </div>
                            <Typography variant='subtitle2'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. At erat pellentesque adipiscing commodo
                                elit at. Tellus molestie nunc non blandit.
                            </Typography>
                        </Paper>
                        <Paper elevation={5} className={classes.paper}>
                            <div className={classes.userheader}>
                                <div>
                                    <Avatar>F</Avatar>
                                </div>
                                <div>
                                    <Typography variant='subtitle2'>Florian</Typography>
                                    <Typography variant='caption'>2:35 PM · 10/11/2021</Typography>
                                </div>
                            </div>
                            <Typography variant='subtitle2'>Interactivity is important!</Typography>
                            <ButtonGroup fullWidth variant='contained' color='primary'>
                                <Button endIcon={<ThumbUpIcon />} className={classes.relative}>
                                    <Chip
                                        color='secondary'
                                        icon={<HelpIcon />}
                                        label='5'
                                        size='small'
                                        className={classes.topleft}
                                        onClick={() => handleClickOpen(5)}
                                    />
                                    Like
                                </Button>
                                <Button endIcon={<FormatQuoteIcon />} className={classes.relative}>
                                    <Chip
                                        color='secondary'
                                        icon={<HelpIcon />}
                                        label='6'
                                        size='small'
                                        className={classes.topmid}
                                        onClick={() => handleClickOpen(6)}
                                    />
                                    Quote
                                </Button>
                                <Button endIcon={<ReplyIcon />}>Reply</Button>
                            </ButtonGroup>
                        </Paper>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} className={classes.subsection}>
                <Paper className={classes.paper}>
                    <div className={classes.dropdown}>
                        <div>
                            <Typography variant='h5'>Town Hall Meeting</Typography>
                            <Typography variant='subtitle2' className={classes.subtitle}>
                                Demonstrating features and updates
                            </Typography>
                        </div>
                        <div>
                            <IconButton size='large'>
                                <KeyboardArrowUpIcon />
                            </IconButton>
                        </div>
                    </div>
                    <Typography variant='subtitle2'>More details can be found here!</Typography>
                    <Button fullWidth variant='contained' color='primary' startIcon={<QuestionAnswerIcon />}>
                        Ask a Question
                    </Button>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} className={classes.subsectiontext}>
                <Typography variant='body1' className={classes.paragraph}>
                    <sup>2</sup> Clicking the down arrow toggles the visibility of the event`&#39`s description
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.subsection}>
                <Paper className={classes.paper}>
                    <Typography variant='h5'>Question Form</Typography>
                    <TextField label='Your Question' fullWidth />
                    <div className={classes.buttonwrapper}>
                        <Button color='primary'>Cancel</Button>
                        <Button variant='contained' color='primary'>
                            Ask
                        </Button>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} className={classes.subsectiontext}>
                <Typography variant='body1' className={classes.paragraph}>
                    <sup>3</sup> This prompt will appear after pressing the button, it will ask you to write in your
                    question and submit it to the town hall
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.subsection}>
                <Paper className={classes.paper}>
                    <Typography variant='h5'>Question Form</Typography>
                    <Paper className={classes.subpaper}>
                        <Typography variant='subtitle2'>Florian</Typography>
                        <Typography variant='caption'>2:35 PM · 10/11/2021</Typography>
                        <Typography variant='subtitle2'>Interactivity is important!</Typography>
                    </Paper>
                    <TextField label='Your Question' fullWidth />
                    <div className={classes.buttonwrapper}>
                        <Button color='primary'>Cancel</Button>
                        <Button variant='contained' color='primary'>
                            Ask
                        </Button>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} className={classes.subsectiontext}>
                <Typography variant='body1' className={classes.paragraph}>
                    <sup>6</sup> Similar to pressing the &quot;Ask a Question&quot; button, you will be asked to write
                    in your question with the question you want to quote
                </Typography>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{info[infoIndex].title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{info[infoIndex].text}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
