/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Grid, Typography, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import TitleCard from '@local/components/TitleCard';
// import FadeThrough from '@local/animations/FadeThrough';
// import RequireRoles from '@local/domains/Logical/RequireRoles';
// import RoleInvite from '@local//Admin/RoleInvite';

import { graphql, useFragment } from 'react-relay';
import type { DashboardEventFragment$key } from '@local/__generated__/DashboardEventFragment.graphql';

interface DashboardEventProps {
    fragmentRef: DashboardEventFragment$key;
}

const DASHBOARD_EVENTS_FRAGMENT = graphql`
    fragment DashboardEventFragment on Event {
        id
        description
        startDateTime
        endDateTime
    }
`;

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

export function DashboardEvent({ fragmentRef }: DashboardEventProps) {
    const event_data = useFragment(DASHBOARD_EVENTS_FRAGMENT, fragmentRef);
    const classes = useStyles();
    return (
        <>
            <Grid item xs={12} sm={8} className={classes.text}>
                <Typography variant='subtitle2'>
                    {event_data.id}
                </Typography>
                <Typography variant='body2' className={classes.secondaryText}>
                    {event_data.description}
                </Typography>
            </Grid>
            <Grid item>
                <Link href={event_data.id}>
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