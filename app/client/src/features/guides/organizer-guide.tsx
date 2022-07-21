/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { Grid, Link, Typography } from '@mui/material';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
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
    formWidth: {
        maxWidth: '560'
    },
    icon: {
        fontSize: '2.25rem',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: 425,
        padding: theme.spacing(2),
    },
    contain: {
        objectFit: 'contain'
    }
}));

export default function OrganizerGuide() {
    const classes = useStyles();

    // const [open, setOpen] = React.useState(false);
    // const [infoIndex, setInfoIndex] = React.useState(0);

    // const info = [
    //     {
    //         title: 'Meeting Window',
    //         text: 'The window where you will see the speaker(s) and moderator(s).',
    //     },
    // ];

    // const handleClickOpen = (index: number) => {
    //     setInfoIndex(index - 1);
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <Grid container alignItems='center' className={classes.root} justifyContent='center' spacing={4}>
            <Grid item xs={4} sm={3}>
                <img
                    src='/static/prytaneum_logo.svg'
                    width='100%'
                    className={classes.contain}
                    alt='Prytaneum Logo'
                />
            </Grid>
            <Grid item xs={12} sm={9} className={classes.section}>
                <Typography variant='h3'>
                    <BookOutlinedIcon className={classes.icon} /> <b>Guide to Prytaneum:</b> Organizer
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    As an organizer, you maintain and set up events for your organizations.
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    This article covers:
                </Typography>
                <Link href='#organizations-page'>Organization&#39;s Page</Link>
                <Link href='#managing-organizations'>Managing Organizations</Link>
                <Link href='#managing-events'>Managing Events/Event Settings</Link>
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='h4' id='organizations-page' className={classes.heading}>
                    Organization&#39;s Page
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    <b>My Organizations</b> is a page where you can find and view your organizations. You are also able
                    to view and manage your organization&#39;s events and members, as well as create and delete
                    organizations. To delete an organization, corresponding X to the right of the organization&#39;s
                    name.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centeredSection}>
                <img
                    src='https://storage.googleapis.com/prytaneum.io/static/guide/org-list-page.png'
                    width='100%'
                    className={classes.contain}
                    alt='Org List Page'
                />
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='body1' className={classes.paragraph}>
                    If you don&#39;t have an organization yet, you can create one by clicking the{' '}
                    <img
                        src='/static/fab.svg'
                        width={27}
                        className={classes.contain}
                        alt='Fab Icon'
                    />{' '}
                    in the bottom right corner of the page. Selecting an organization will show you the
                    organization&#39;s events and members. Here, you can create new events and invite new members.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centeredSection}>
                <img
                    src='https://storage.googleapis.com/prytaneum.io/static/guide/event-list-page.png'
                    width='100%'
                    className={classes.contain}
                    alt='Event List Page'
                />
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='h4' id='managing-organizations' className={classes.heading}>
                    Managing Organizations
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    Clicking <b>+NEW EVENT</b> in the Events card will bring up the ceate event menu. Enter your event
                    information and finalize by clicking <b>CREATE</b>. Once you&#39;ve created your event, you can
                    access and modify event information by clicking on your event in the Events card. Learn more about{' '}
                    <Link href='#managing-events'>Event Settings</Link> and controls for moderators and participants.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centeredSection}>
                <div className={classes.formWidth}>
                    <img
                        src='https://storage.googleapis.com/prytaneum.io/static/guide/create-event-form.png'
                        width='100%'
                        className={classes.contain}
                        alt='Create Event Form'
                    />
                </div>
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='body1' className={classes.paragraph}>
                    Clicking <b>+NEW MEMBER</b> in the Members card will bring up the member form menu. Enter the email
                    of the new member you want to invite and finalize by clicking <b>INVITE</b> add members to the
                    organization via email.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centeredSection}>
                <div className={classes.formWidth}>
                    <img
                        src='https://storage.googleapis.com/prytaneum.io/static/guide/org-add-member-form.png'
                        width='100%'
                        className={classes.contain}
                        alt='Org Add Member Form'
                    />
                </div>
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='h4' id='managing-events' className={classes.heading}>
                    Managing Events/Event Settings
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    Clicking on one of your organization&#39;s events will bring you to the event&#39;s settings page.
                    This is where you can modify event details, general settings, add speakers and moderators, create
                    invitations, modify the video stream, and delete the event.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centeredSection}>
                <img
                    src='https://storage.googleapis.com/prytaneum.io/static/guide/event-settings.png'
                    width='100%'
                    className={classes.contain}
                    alt='Event Settings'
                />
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='body1' className={classes.paragraph}>
                    General settings include question feed visibility, user ratings, event forums, and event
                    privatization.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centeredSection}>
                <img
                    src='https://storage.googleapis.com/prytaneum.io/static/guide/event-settings-1.png'
                    width='100%'
                    className={classes.contain}
                    alt='Event Settings'
                />
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='body1' className={classes.paragraph}>
                    Click on the respective buttons to add video streams, speakers, and moderators. Video streams
                    require a language and video link. To add a speaker, you will need their name, title, email, a
                    description ofthe speaker, and a link to a picture of the speaker. To add a moderator, you will need
                    their email associated with their Prytaneum account. After adding them, you can modify any added
                    video stream, speaker, or moderator by clicking the associated <MoreVertIcon />.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centeredSection}>
                <img
                    src='https://storage.googleapis.com/prytaneum.io/static/guide/event-settings-2.png'
                    width='100%'
                    className={classes.contain}
                    alt='Event Settings'
                />
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='body1' className={classes.paragraph}>
                    Invite participants through email or by creating an invite link. Delete your event by entering the
                    event name and confirming the deletion.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centeredSection}>
                <img
                    src='https://storage.googleapis.com/prytaneum.io/static/guide/event-settings-3.png'
                    width='100%'
                    className={classes.contain}
                    alt='Event Settings'
                />
            </Grid>
        </Grid>
    );
}
