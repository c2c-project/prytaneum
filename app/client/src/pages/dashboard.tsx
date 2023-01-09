/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Card, CardContent, Grid, Typography, Divider, Button, Link, IconButton } from '@mui/material';
import { ChevronRight, Add } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';

// import TitleCard from '@local/components/TitleCard';
// import FadeThrough from '@local/animations/FadeThrough';
// import RequireRoles from '@local/domains/Logical/RequireRoles';
// import RoleInvite from '@local//Admin/RoleInvite';

const useStyles = makeStyles((theme) => ({
    item: {
        margin: theme.spacing(0, 0, 4, 0),
    },
    card: {
        padding: theme.spacing(1, 1, 1, 1),
    },
    title: {
        marginBottom: theme.spacing(1),
    },
    text: {
        marginLeft: theme.spacing(1),
    },
    secondaryText: {
        color: theme.palette.text.secondary,
    },
}));

const dummyCurrentEvents = [
    {
        title: 'Event 1',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        link: '/dashboard',
    },
    {
        title: 'Event 2',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        link: '/dashboard',
    },
];

const dummyFutureEvents = [
    {
        title: 'Event 1',
        date: 'Monday, July 12th',
        link: '/dashboard',
    },
    {
        title: 'Event 2',
        date: 'Friday, July 17th',
        link: '/dashboard',
    },
    {
        title: 'Event 3',
        date: 'Friday, July 31st',
        link: '/dashboard',
    },
];

export default function Dashboard() {
    const classes = useStyles();
    return (
        // <FadeThrough animKey='dashboard-page'>
        // </FadeThrough>
        <Grid container>
            <Grid item xs={12} className={classes.item}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant='h6' className={classes.title}>
                            Current Events
                        </Typography>
                        <Grid container justifyContent='space-between' alignItems='center' spacing={1}>
                            {dummyCurrentEvents.map(({ title, description, link }, idx) => (
                                <>
                                    <Grid item xs={12} sm={8} className={classes.text}>
                                        <Typography variant='subtitle2'>{title}</Typography>
                                        <Typography variant='body2' className={classes.secondaryText}>
                                            {description}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Link href={link} underline='hover'>
                                            <Button
                                                aria-label='view live feed of current event'
                                                variant='contained'
                                                color='primary'
                                            >
                                                Live Feed
                                            </Button>
                                        </Link>
                                    </Grid>
                                    {idx !== dummyCurrentEvents.length - 1 && (
                                        <Grid item xs={12} style={{ marginTop: 2 }}>
                                            <Divider />
                                        </Grid>
                                    )}
                                </>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} className={classes.item}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant='h6' className={classes.title}>
                            Upcoming Events
                        </Typography>
                        <Grid container justifyContent='space-between' alignItems='center' spacing={1}>
                            {dummyFutureEvents.map(({ title, date, link }, idx) => (
                                <>
                                    <Grid item className={classes.text}>
                                        <Typography variant='subtitle2'>{title}</Typography>
                                        <Typography variant='body2' className={classes.secondaryText}>
                                            {date}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Link href={link} underline='hover'>
                                            <IconButton aria-label='view future event' size='large'>
                                                <ChevronRight />
                                            </IconButton>
                                        </Link>
                                    </Grid>
                                    {idx !== dummyFutureEvents.length - 1 && (
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                    )}
                                </>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <Card>
                    <CardContent style={{ display: 'flex', justifyContent: 'center', padding: 12 }}>
                        <IconButton aria-label='view future event' size='large'>
                            <Add style={{ fontSize: 32, color: 'black' }} />
                        </IconButton>
                    </CardContent>
                </Card>
                <Typography variant='subtitle2' style={{ marginTop: 8 }}>
                    Create Event
                </Typography>
            </Grid>
            {/* <RequireRoles requiredRoles={['admin']} redirect={false}> */}
            {/* <Grid className={classes.item} item xs={12}>
                <RoleInvite />
            </Grid> */}
            {/* </RequireRoles> */}
        </Grid>
    );
}
