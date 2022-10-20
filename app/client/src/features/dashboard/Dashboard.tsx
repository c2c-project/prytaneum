import * as React from 'react';
import { fetchQuery, graphql, useQueryLoader } from 'react-relay';
import { useRouter } from 'next/router';
import { Card, CardContent, Grid, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Add } from '@mui/icons-material';
import type { DashboardQuery } from '@local/__generated__/DashboardQuery.graphql';
import { DashboardEventList } from './DashboardEventList';
import { useEnvironment } from '@local/core';
import { ConditionalRender } from '../../components/ConditionalRender';

const useStyles = makeStyles(() => ({
    addIcon: {
        fontSize: 32,
        color: 'black',
    },
    addIconTitle: {
        marginTop: 8,
    },
}));

export const DASHBOARD_QUERY = graphql`
    query DashboardQuery {
        me {
            events {
                __id
                edges {
                    node {
                        id
                        title
                        description
                        startDateTime
                        endDateTime
                        isViewerModerator
                        organization {
                            name
                        }
                    }
                }
            }
        }
    }
`;

export function Dashboard() {
    const [queryRef, loadQuery] = useQueryLoader<DashboardQuery>(DASHBOARD_QUERY);
    const classes = useStyles();
    const router = useRouter();
    const handleNav = (path: string) => () => router.push(path);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const { env } = useEnvironment();
    const REFRESH_INTERVAL = 10000; // 10 seconds

    const refresh = React.useCallback(() => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        fetchQuery(env, DASHBOARD_QUERY, {}).subscribe({
            complete: () => {
                setIsRefreshing(false);
                loadQuery({}, { fetchPolicy: 'store-or-network' });
            },
            error: () => {
                setIsRefreshing(false);
            },
        });
    }, [env, isRefreshing, loadQuery]);

    React.useEffect(() => {
        if (!queryRef) loadQuery({});
    }, [queryRef, loadQuery]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            refresh();
        }, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    });

    return (
        <ConditionalRender client>
            <React.Suspense fallback={<div>Loading...</div>}>
                <Grid container>
                    {queryRef ? <DashboardEventList queryRef={queryRef} /> : <></>}
                    <Grid item>
                        <Card>
                            <CardContent style={{ display: 'flex', justifyContent: 'center', padding: 12 }}>
                                <IconButton aria-label='view future event' onClick={handleNav('/organizations/me')}>
                                    <Add className={classes.addIcon} />
                                </IconButton>
                            </CardContent>
                        </Card>
                        <Typography variant='subtitle2' className={classes.addIconTitle}>
                            Create Event
                        </Typography>
                    </Grid>
                </Grid>
            </React.Suspense>
        </ConditionalRender>
    );
}
