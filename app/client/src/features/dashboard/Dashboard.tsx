import * as React from 'react';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { Card, CardContent, Grid, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Add } from '@mui/icons-material';

import { Loader } from '@local/components/Loader';
import { useUser } from '@local/features/accounts';
import type { DashboardQuery } from '@local/__generated__/DashboardQuery.graphql';
import { DashboardEventList } from './DashboardEventList';

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
            ...useDashboardEventsFragment
        }
    }
`;

interface Props {
    queryRef: PreloadedQuery<DashboardQuery>;
}

export function Dashboard({ queryRef }: Props) {
    const { me } = usePreloadedQuery<DashboardQuery>(DASHBOARD_QUERY, queryRef);
    const classes = useStyles();
    const router = useRouter();
    const [user, , isLoading] = useUser();
    const handleNav = (path: string) => () => router.push(path);

    // Verify user is logged in
    React.useEffect(() => {
        if (!isLoading && !user) router.push('/');
    }, [user, router, isLoading]);

    if (!me) return <Loader />;

    return (
        <Grid container>
            <DashboardEventList fragmentRef={me} />
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
    );
}
