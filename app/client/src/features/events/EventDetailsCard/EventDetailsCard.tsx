import * as React from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/styles';

import { formatDate } from '@local/utils/format';
import { useEventDetailsFragment$data } from '@local/__generated__/useEventDetailsFragment.graphql';

interface Props {
    eventData: useEventDetailsFragment$data;
}

export function EventDetailsCard({ eventData }: Props) {
    const theme = useTheme();
    const { title, topic, description, startDateTime, endDateTime } = eventData;

    const startTime = React.useMemo(
        () => formatDate(startDateTime ? new Date(startDateTime) : new Date(), 'h:mmaa'),
        [startDateTime]
    );
    const endTime = React.useMemo(
        () => formatDate(endDateTime ? new Date(endDateTime) : new Date(), 'h:mmaa'),
        [endDateTime]
    );

    return (
        <Grid container direction='column'>
            <Typography variant='h5' marginTop={theme.spacing(1)} fontWeight={700}>
                {title}
            </Typography>
            <Typography color='textSecondary' variant='body1' marginBottom={theme.spacing(1)}>
                {startTime} - {endTime} • {topic} • {description}
            </Typography>
            <Divider style={{ background: 'black' }} />
        </Grid>
    );
}
