import * as React from 'react';
import Image from 'next/image';
import {
    Button,
    Chip,
    Grid,
    Link,
    Typography,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import makeStyles from '@mui/styles/makeStyles';
import HelpIcon from '@mui/icons-material/Help';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        minHeight: '85vh',
        paddingLeft: '1rem',
        scrollPaddingTop: '-10rem',
    },
    heading: {
        paddingTop: '80px',
    },
    paragraph: {
        fontSize: '18px',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    centeredSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
    },
    icon: {
        fontSize: '2.25rem',
    },
    relative: {
        position: 'relative',
        width: '100%',
    },
    videoInfo: {
        position: 'absolute',
        top: '1.25rem',
        left: '-1.25rem',
        zIndex: 100,
    },
    eventInfo: {
        position: 'absolute',
        top: '69%',
        left: '-1.25rem',
        transform: 'translateY(-69%)',
        zIndex: 100,
    },
    answeringNowInfo: {
        position: 'absolute',
        top: '4%',
        right: '-1.25rem',
        transform: 'translateY(-4%)',
        zIndex: 100,
    },
    modeSelectInfo: {
        position: 'absolute',
        top: '26%',
        right: '-1.25rem',
        transform: 'translateY(-26%)',
        zIndex: 100,
    },
    askQuestionButtonInfo: {
        position: 'absolute',
        top: '35%',
        right: '-1.25rem',
        transform: 'translateY(-35%)',
        zIndex: 100,
    },
    toolbarInfo: {
        position: 'absolute',
        top: '44%',
        right: '-1.25rem',
        transform: 'translateY(-44%)',
        zIndex: 100,
    },
    questionCardInfo: {
        position: 'absolute',
        top: '59%',
        right: '-1.25rem',
        transform: 'translateY(-59%)',
        zIndex: 100,
    },
}));

export default function ModeratorGuide() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [infoIndex, setInfoIndex] = React.useState(0);

    const info = [
        {
            title: 'Event Window',
            text: `You will see the event video stream or image that can be added/changed in the event settings. 
                If no image/stream links are added then this space will default to a placeholder grey box.`,
        },
        {
            title: 'Event Info',
            text: 'You can find the event title, duration, description and speaker(s) information here.',
        },
        {
            title: 'Answering Now',
            text: `Here you can see the current question that is being asked. 
                As the moderator you can progress the question queue with the NEXT QUESTION button (if there are upcoming questions enqueued)
                as well as move it back with the PREVIOUS QUESTION button.`,
        },
        {
            title: 'Mode Selection',
            text: `This bar lets you switch between the participant questions and your feedback. 
                While in the questions tab, you can submit questions to the event using the ASK MY QUESTION button and see and like other participant questions.
                While in the feedback tab, you can write and submit event feedback that a moderator can reply to.`,
        },
        {
            title: 'Ask My Question Button',
            text: `Clicking on this button will bring up a text box where you can write questions. 
                Upon submitting they will be added to the question list.`,
        },
        {
            title: 'Toolbar',
            text: `When on the QUEUE tab you can sort questions in the queue by Upcoming or Previously asked. 
                You can search through the questions in the selected list (upcoming queue, previous queue, asked questions).`,
        },
        {
            title: 'Question Card',
            text: `This is how participant questions are displayed. As a moderator you can enqueue and dequeue asked questions.
                Moderators can also see how many likes a questions has (denoted by the number beside the blue thumbs up icon).
                Once a question is in the queue it can be dragged around to be re-ordered and moved to the Answering Now section
                by hitting NEXT QUESTION`,
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
                    src='/static/prytaneum_logo.svg'
                    width={1107}
                    height={1108}
                    objectFit='contain'
                    alt='Prytaneum Logo'
                />
            </Grid>
            <Grid item xs={12} sm={9} className={classes.section}>
                <Typography variant='h3'>
                    <BookOutlinedIcon className={classes.icon} /> <b>Guide to Prytaneum:</b> Moderator
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    Being a moderator for an event means you are leading the discussion and are curating participant
                    questions.
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    This article covers:
                </Typography>
                <Link href='#becomingAModerator'>Becoming a Moderator</Link>
                <Link href='#moderatorEventView'>ModeratorEventView</Link>
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='h4' id='becomingAModerator' className={classes.heading}>
                    Becoming a Moderator
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    You first become a moderator by being assigned as one by an event organizer. More information on how
                    to assign moderators can be found in the{' '}
                    {<Link href='/guides/organizer'>organizer user guide</Link>}.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='h4' id='moderatorEventView' className={classes.heading}>
                    Moderator Event View
                </Typography>
                <Typography variant='body1' className={classes.paragraph} component='span'>
                    The moderator event view is one of the two views Prytaneum offers. The other view being the
                    participant event view, which you can find more information on in the{' '}
                    {<Link href='/guides/participant'>participant user guide</Link>}. With the moderator event view, you
                    manage the questions queue by enqueuing participant questions and reordering them. Click on any{' '}
                    {<Chip color='secondary' icon={<HelpIcon />} label='#' />} to reveal more information about the
                    corresponding element.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centeredSection}>
                <div className={classes.relative}>
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='1'
                        size='small'
                        className={classes.videoInfo}
                        onClick={() => handleClickOpen(1)}
                    />
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='2'
                        size='small'
                        className={classes.eventInfo}
                        onClick={() => handleClickOpen(2)}
                    />
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='3'
                        size='small'
                        className={classes.answeringNowInfo}
                        onClick={() => handleClickOpen(3)}
                    />
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='4'
                        size='small'
                        className={classes.modeSelectInfo}
                        onClick={() => handleClickOpen(4)}
                    />
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='5'
                        size='small'
                        className={classes.askQuestionButtonInfo}
                        onClick={() => handleClickOpen(5)}
                    />
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='6'
                        size='small'
                        className={classes.toolbarInfo}
                        onClick={() => handleClickOpen(6)}
                    />
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='7'
                        size='small'
                        className={classes.questionCardInfo}
                        onClick={() => handleClickOpen(7)}
                    />
                    <Image
                        src='https://storage.googleapis.com/prytaneum.io/static/guide/event-live-mod-view-queue.png'
                        width={1469}
                        height={827}
                        objectFit='contain'
                        alt='dashboard'
                        priority={true}
                    />
                </div>
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
