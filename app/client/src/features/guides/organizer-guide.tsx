import * as React from 'react';
import { Grid, Link, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useUser } from '../accounts';
import { Loader } from '@local/components';

export default function OrganizerGuide() {
    const theme = useTheme();
    const lgUpBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));
    const { user, isLoading } = useUser();

    if (isLoading) return <Loader />;

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
                    style={{ objectFit: 'contain', maxWidth: '250px', minWidth: '150px' }}
                    src='/static/prytaneum_logo.svg'
                    width='100%'
                    height='100%'
                    alt='Prytaneum Logo'
                />
            </Grid>
            <Grid item xs={12} sm={9} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='h3'>
                    <BookOutlinedIcon style={{ fontSize: '2.25rem' }} /> <b>Guide to Prytaneum:</b> Organizer
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    As an organizer, you maintain and set up events for your organizations.
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    This article covers:
                </Typography>
                <Link href='#organizations-page'>Organization&#39;s Page</Link>
                <Link href='#managing-organizations'>Managing Organizations</Link>
                <Link href='#managing-events'>Managing Events/Event Settings</Link>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='h4' id='organizations-page' paddingTop='80px'>
                    Organization&#39;s Page
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    <b>My Organizations</b> is a page where you can find and view your organizations. You are also able
                    to view and manage your organization&#39;s events and members, as well as create and delete
                    organizations. To delete an organization, corresponding X to the right of the organization&#39;s
                    name.
                </Typography>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' alignItems='center' gap='0.5rem'>
                <img
                    src='https://storage.googleapis.com/prytaneum.io/static/guide/org-list-page.png'
                    width='100%'
                    style={{ objectFit: 'contain' }}
                    alt='Org List Page'
                />
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='body1' fontSize='large'>
                    If you don&#39;t have an organization yet, you can create one by clicking the{' '}
                    <img src='/static/fab.svg' width={27} style={{ objectFit: 'contain' }} alt='Fab Icon' /> in the
                    bottom right corner of the page. Selecting an organization will show you the organization&#39;s
                    events and members. Here, you can create new events and invite new members.
                </Typography>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' alignItems='center' gap='0.5rem'>
                <img
                    src='https://storage.googleapis.com/prytaneum.io/static/guide/event-list-page.png'
                    width='100%'
                    style={{ objectFit: 'contain' }}
                    alt='Event List Page'
                />
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='h4' id='managing-organizations' paddingTop='80px'>
                    Managing Organizations
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    Clicking <b>+NEW EVENT</b> in the Events card will bring up the ceate event menu. Enter your event
                    information and finalize by clicking <b>CREATE</b>. Once you&#39;ve created your event, you can
                    access and modify event information by clicking on your event in the Events card. Learn more about{' '}
                    <Link href='#managing-events'>Event Settings</Link> and controls for moderators and participants.
                </Typography>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' alignItems='center' gap='0.5rem'>
                <div style={{ maxWidth: '560px' }}>
                    <img
                        src='https://storage.googleapis.com/prytaneum.io/static/guide/create-event-form.png'
                        width='100%'
                        style={{ objectFit: 'contain' }}
                        alt='Create Event Form'
                    />
                </div>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='body1' fontSize='large'>
                    Clicking <b>+NEW MEMBER</b> in the Members card will bring up the member form menu. Enter the email
                    of the new member you want to invite and finalize by clicking <b>INVITE</b> add members to the
                    organization via email.
                </Typography>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' alignItems='center' gap='0.5rem'>
                <div style={{ maxWidth: '560px' }}>
                    <img
                        style={{ objectFit: 'contain' }}
                        src='https://storage.googleapis.com/prytaneum.io/static/guide/org-add-member-form.png'
                        width='100%'
                        alt='Org Add Member Form'
                    />
                </div>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='h4' id='managing-events' paddingTop='80px'>
                    Managing Events/Event Settings
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    Clicking on one of your organization&#39;s events will bring you to the event&#39;s settings page.
                    This is where you can modify event details, general settings, add speakers and moderators, create
                    invitations, modify the video stream, and delete the event.
                </Typography>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' alignItems='center' gap='0.5rem'>
                <img
                    style={{ objectFit: 'contain' }}
                    src='https://storage.googleapis.com/prytaneum.io/static/guide/event-settings.png'
                    width='100%'
                    alt='Event Settings'
                />
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='body1' fontSize='large'>
                    General settings include question feed visibility, user ratings, event forums, and event
                    privatization.
                </Typography>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' alignItems='center' gap='0.5rem'>
                <img
                    style={{ objectFit: 'contain' }}
                    src='https://storage.googleapis.com/prytaneum.io/static/guide/event-settings-1.png'
                    width='100%'
                    alt='Event Settings'
                />
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='body1' fontSize='large'>
                    Click on the respective buttons to add video streams, speakers, and moderators. Video streams
                    require a language and video link. To add a speaker, you will need their name, title, email, a
                    description ofthe speaker, and a link to a picture of the speaker. To add a moderator, you will need
                    their email associated with their Prytaneum account. After adding them, you can modify any added
                    video stream, speaker, or moderator by clicking the associated <MoreVertIcon />.
                </Typography>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' alignItems='center' gap='0.5rem'>
                <img
                    style={{ objectFit: 'contain' }}
                    src='https://storage.googleapis.com/prytaneum.io/static/guide/event-settings-2.png'
                    width='100%'
                    alt='Event Settings'
                />
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='body1' fontSize='large'>
                    Invite participants through email or by creating an invite link. Delete your event by entering the
                    event name and confirming the deletion.
                </Typography>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' alignItems='center' gap='0.5rem'>
                <img
                    style={{ objectFit: 'contain' }}
                    src='https://storage.googleapis.com/prytaneum.io/static/guide/event-settings-3.png'
                    width='100%'
                    alt='Event Settings'
                />
            </Grid>
        </Grid>
    );
}
