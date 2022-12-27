import * as React from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { graphql, useRefetchableFragment } from 'react-relay';
import { formatDate } from '@local/utils/format';
import { useRouter } from 'next/router';

import { EventDetailsCardFragment$key } from '@local/__generated__/EventDetailsCardFragment.graphql';
import { useRefresh } from '@local/features/core';

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(1),
        fontWeight: 700,
    },
    description: {
        marginBottom: theme.spacing(1),
    },
    divider: {
        background: 'black',
    },
}));

export const EVENT_DETAILS_CARD_FRAGMENT = graphql`
    fragment EventDetailsCardFragment on Event @refetchable(queryName: "EventDetailsCardRefetchQuery") {
        id
        title
        description
        startDateTime
        endDateTime
        isActive
        isViewerModerator
    }
`;

interface Props {
    fragmentRef: EventDetailsCardFragment$key;
}

export function EventDetailsCard({ fragmentRef }: Props) {
    const classes = useStyles();
    const [data, refetch] = useRefetchableFragment(EVENT_DETAILS_CARD_FRAGMENT, fragmentRef);
    const { title, description, startDateTime, endDateTime } = data;
    const router = useRouter();
    const eventId = router.query.id as string;
    const REFRESH_INTERVAL = 30000; // 30 seconds
    const refresh = React.useCallback(() => {
        refetch({}, { fetchPolicy: 'store-and-network' });
    }, [refetch]);

    useRefresh({ refreshInterval: REFRESH_INTERVAL, callback: refresh });

    const startTime = React.useMemo(
        () => formatDate(startDateTime ? new Date(startDateTime) : new Date(), 'h:mmaa'),
        [startDateTime]
    );
    const endTime = React.useMemo(
        () => formatDate(endDateTime ? new Date(endDateTime) : new Date(), 'h:mmaa'),
        [endDateTime]
    );

    React.useEffect(() => {
        if (!data.isActive && !data.isViewerModerator) router.push('/events/' + eventId + '/pre');
    }, [eventId, data.isActive, data.isViewerModerator, router]);

    return (
        <Grid container direction='column'>
            <Typography variant='h5' className={classes.title}>
                {title}
            </Typography>
            <Typography color='textSecondary' variant='body1' className={classes.description}>
                {startTime} - {endTime} • {description}
            </Typography>
            <Divider className={classes.divider} />
        </Grid>
    );
}
