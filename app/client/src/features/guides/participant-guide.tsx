import * as React from 'react';
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
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import HelpIcon from '@mui/icons-material/Help';

import { useUser } from '../accounts';
import { Loader } from '@local/components';

export default function ParticipantGuide() {
    const theme = useTheme();
    const lgUpBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));
    const [open, setOpen] = React.useState(false);
    const [infoIndex, setInfoIndex] = React.useState(0);
    const { user, isLoading } = useUser();

    if (isLoading) return <Loader />;

    const info = [
        {
            title: 'Event Window',
            text: 'You will see the event video stream or image that is set up by the event organizer.',
        },
        {
            title: 'Event Info',
            text: 'You can find the event title, duration, description and speaker(s) information here.',
        },
        {
            title: 'Upcoming Question',
            text: `You can see the next question that the moderator will present after the current discussion. 
                You can cycle through past questions with the left and right arrows.`,
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
            title: 'Search Bar',
            text: 'You can search through the participant questions using key words.',
        },
        {
            title: 'Question Card',
            // eslint-disable-next-line quotes
            text: "This is how participant questions are displayed. You can like and quote other participant's questions.",
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
        <Grid
            container
            width='100%'
            height='100%'
            textAlign='center'
            alignItems='center'
            justifyContent='center'
            paddingLeft={user ? (lgUpBreakpoint ? '250px' : 0) : lgUpBreakpoint ? '5%' : 0}
            paddingRight={user ? 0 : lgUpBreakpoint ? '5%' : 0}
            spacing={4}
            sx={{ scrollPaddingTop: '-10rem' }}
        >
            <Grid item xs={6} sm={3}>
                <img
                    style={{ objectFit: 'contain', maxWidth: '250px', minWidth: '150px' }}
                    src='/static/prytaneum_logo.svg'
                    width='100%'
                    height='100%'
                    alt='Prytaneum Logo'
                />
            </Grid>
            <Grid item xs={12} sm={9} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='h3'>
                    <BookOutlinedIcon style={{ fontSize: '2.25rem' }} /> <b>Guide to Prytaneum:</b> Participant
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    As a participant, you engange in discussion during town hall events. Participants can submit
                    questions and feedback, as well as like, reply, and quote other participant questions.
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    This article covers:
                </Typography>
                <Link href='#attendingEvents'>Attending Events</Link>
                <Link href='#participantEventView'>Participant Event View</Link>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='h4' id='attendingEvents' paddingTop='80px'>
                    Attending an Event as a Participant
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    To attend any Prytaneum event, you must be invited by the event organizer through email or a direct
                    link. You can find more information on event invites in the
                    {<Link href='/guides/organizer'>organizer user guide</Link>}.
                </Typography>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='h4' id='participantEventView' paddingTop='80px'>
                    Participant Event View
                </Typography>
                <Typography variant='body1' fontSize='large' component='span'>
                    The participant event view is one of the two views Prytaneum offers. The other view being the
                    moderator event view, which you can find more information on in the{' '}
                    {<Link href='/guides/moderator'>moderator user guide</Link>}. With the participant event view, you
                    drive discussion with submitted questions and feedback. Click on any{' '}
                    {<Chip color='secondary' icon={<HelpIcon />} label='#' />} to reveal more information about the
                    corresponding element.
                </Typography>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' alignItems='center' gap='0.5rem'>
                <div style={{ position: 'relative', width: '100%' }}>
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='1'
                        size='small'
                        style={{ position: 'absolute', top: '0.25rem', left: '-1.25rem', zIndex: 100 }}
                        onClick={() => handleClickOpen(1)}
                    />
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='2'
                        size='small'
                        style={{
                            position: 'absolute',
                            top: '67%',
                            left: '-1.25rem',
                            transform: 'translateY(-67%)',
                            zIndex: 100,
                        }}
                        onClick={() => handleClickOpen(2)}
                    />
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='3'
                        size='small'
                        style={{ position: 'absolute', right: '-1.25rem', zIndex: 100 }}
                        onClick={() => handleClickOpen(3)}
                    />
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='4'
                        size='small'
                        style={{ position: 'absolute', top: '26%', right: '-1.25rem', transform: 'translateY(-26%)' }}
                        onClick={() => handleClickOpen(4)}
                    />
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='5'
                        size='small'
                        style={{ position: 'absolute', top: '35%', right: '-1.25rem', transform: 'translateY(-35%)' }}
                        onClick={() => handleClickOpen(5)}
                    />
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='6'
                        size='small'
                        style={{ position: 'absolute', top: '44%', right: '-1.25rem', transform: 'translateY(-44%)' }}
                        onClick={() => handleClickOpen(6)}
                    />
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='7'
                        size='small'
                        style={{ position: 'absolute', top: '54%', right: '-1.25rem', transform: 'translateY(-54%)' }}
                        onClick={() => handleClickOpen(7)}
                    />
                    <img
                        src='https://storage.googleapis.com/prytaneum.io/static/guide/event-live-participant-view.png'
                        width='100%'
                        style={{ objectFit: 'contain' }}
                        alt='Event Live Participant View'
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
