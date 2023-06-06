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

export default function ModeratorGuide() {
    const theme = useTheme();
    const lgUpBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));
    const [open, setOpen] = React.useState(false);
    const [infoIndex, setInfoIndex] = React.useState(0);
    const { user, isLoading } = useUser();

    if (isLoading) return <Loader />;

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
            <Grid item xs={4} sm={3}>
                <img
                    style={{ objectFit: 'contain' }}
                    src='/static/prytaneum_logo.svg'
                    width='100%'
                    height='100%'
                    alt='Prytaneum Logo'
                />
            </Grid>
            <Grid item xs={12} sm={9} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='h3'>
                    <BookOutlinedIcon style={{ fontSize: '2.25rem' }} /> <b>Guide to Prytaneum:</b> Moderator
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    Being a moderator for an event means you are leading the discussion and are curating participant
                    questions.
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    This article covers:
                </Typography>
                <Link href='#becomingAModerator'>Becoming a Moderator</Link>
                <Link href='#moderatorEventView'>ModeratorEventView</Link>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='h4' id='becomingAModerator' paddingTop='80px'>
                    Becoming a Moderator
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    You first become a moderator by being assigned as one by an event organizer. More information on how
                    to assign moderators can be found in the{' '}
                    {<Link href='/guides/organizer'>organizer user guide</Link>}.
                </Typography>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='h4' id='moderatorEventView' paddingTop='80px'>
                    Moderator Event View
                </Typography>
                <Typography variant='body1' fontSize='large' component='span'>
                    The moderator event view is one of the two views Prytaneum offers. The other view being the
                    participant event view, which you can find more information on in the{' '}
                    {<Link href='/guides/participant'>participant user guide</Link>}. With the moderator event view, you
                    manage the questions queue by enqueuing participant questions and reordering them. Click on any{' '}
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
                        style={{ position: 'absolute', top: '1.25rem', left: '-1.25rem', zIndex: 100 }}
                        onClick={() => handleClickOpen(1)}
                    />
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='2'
                        size='small'
                        style={{
                            position: 'absolute',
                            top: '69%',
                            left: '-1.25rem',
                            transform: 'translateY(-69%)',
                            zIndex: 100,
                        }}
                        onClick={() => handleClickOpen(2)}
                    />
                    <Chip
                        color='secondary'
                        icon={<HelpIcon />}
                        label='3'
                        size='small'
                        style={{ position: 'absolute', top: '4%', right: '-1.25rem', transform: 'translateY(-4%)' }}
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
                        style={{ position: 'absolute', top: '59%', right: '-1.25rem', transform: 'translateY(-59%)' }}
                        onClick={() => handleClickOpen(7)}
                    />
                    <img
                        style={{ objectFit: 'contain' }}
                        width='100%'
                        src='https://storage.googleapis.com/prytaneum.io/static/guide/event-live-mod-view-queue.png'
                        alt='Event Live Moderator View'
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
