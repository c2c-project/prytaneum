import * as React from 'react';

import { Card, CardContent, Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { DashboardEvent } from '@local/features/dashboard/DashboardEvent';
import type { DashboardQuery } from '@local/__generated__/DashboardQuery.graphql';

import { Loader } from '@local/components/Loader';

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

export const DASHBOARD_QUERY = graphql`
    query DashboardQuery {
        me {
            events {
                edges {
                    node {
                        id
                        ...DashboardEventFragment
                    }
                }
            }
        }
    }
`;

interface Props {
    queryRef: PreloadedQuery<DashboardQuery>;
}

export function Dashboard({ queryRef }: Props) {
    const data = usePreloadedQuery<DashboardQuery>(DASHBOARD_QUERY, queryRef);
    const listOfEvents = React.useMemo(() => data.me?.events?.edges ?? [], [data.me]);
    const classes = useStyles();
    
    if(!data) return <Loader />;

    if (listOfEvents.length === 0) {
        return (
            // <FadeThrough animKey='dashboard-page'>
            <Grid container>
                <Grid item xs={12} className={classes.item}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant='h6' className={classes.title}>
                                Current Events
                            </Typography>
                            <Grid container justify='space-between' alignItems='center' spacing={1}>
                                <Grid item xs={12} sm={8} className={classes.text}>
                                    <Typography variant='subtitle2'>
                                        No Events To Display
                                    </Typography>
                                </Grid>
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
                            <Grid container justify='space-between' alignItems='center' spacing={1}>
                                <Grid item className={classes.text}>
                                    <Typography variant='subtitle2'>
                                        No Events To Display
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <CardContent style={{ display: 'flex', justifyContent: 'center', padding: 12, }}>
                            <IconButton
                                aria-label='view future event'
                            >
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
        // </FadeThrough>
        );
    }

    return (
        // <FadeThrough animKey='dashboard-page'>
        <Grid container>
            <Grid item xs={12} className={classes.item}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant='h6' className={classes.title}>
                            Current Events
                        </Typography>
                        <Grid container justify='space-between' alignItems='center' spacing={1}>
                            {listOfEvents.map(({ node }) =>
                                <>
                                    <DashboardEvent fragmentRef = {node} />
                                </>
                            )}
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
                        <Grid container justify='space-between' alignItems='center' spacing={1}>
                            {listOfEvents.map(({ node }) =>
                                <>
                                    <DashboardEvent fragmentRef = {node} />
                                </>
                            )}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <Card>
                    <CardContent style={{ display: 'flex', justifyContent: 'center', padding: 12, }}>
                        <IconButton
                            aria-label='view future event'
                        >
                            <Add style={{ fontSize: 32, color: 'black' }}/>
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
        // </FadeThrough>
    );
}