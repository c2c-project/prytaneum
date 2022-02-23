/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Grid, Typography, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

interface DashboardEventProps {
    id: string,
    title: string,
    description: string,
    live: boolean,
}

export function DashboardEvent(props: DashboardEventProps) {
    // const event_data = useFragment(DASHBOARD_EVENT_FRAGMENT, fragmentRef);
    const classes = useStyles();

    if (props.live) {
        return (
            <>
                <Grid item xs={12} sm={8} className={classes.text}>
                    <Typography variant='subtitle2'>
                        {props.title}
                    </Typography>
                    <Typography variant='body2' className={classes.secondaryText}>
                        {props.description}
                    </Typography>
                </Grid>
                <Grid item>
                    <Link href={props.id}>
                        <Button
                            aria-label='view live feed of current event'
                            variant='contained'
                            color='primary'
                        >
                            Live Feed
                        </Button>
                    </Link>
                </Grid>
            </>
        );
    }

    return (
        <>
            <Grid item xs={12} sm={8} className={classes.text}>
                <Typography variant='subtitle2'>
                    {props.title}
                </Typography>
                <Typography variant='body2' className={classes.secondaryText}>
                    {props.description}
                </Typography>
            </Grid>
        </>
    );
}