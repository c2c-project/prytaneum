import { useMemo } from 'react';
import { Typography, Grid, Button, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFragment, graphql } from 'react-relay';
import { Edit } from '@material-ui/icons';
import clsx from 'clsx';

import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import type { EventDetailsFragment$key } from '@local/__generated__/EventDetailsFragment.graphql';
import { formatDate } from '@local/utils/format';
import { UpdateEvent } from '@local/features/events';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(1),
        },
    },
    indent: {
        marginLeft: theme.spacing(2),
    },
}));

export interface EventDetailsProps {
    fragmentRef: EventDetailsFragment$key;
    className?: string;
}

export const EVENT_DETAILS_FRAGMENT = graphql`
    fragment EventDetailsFragment on Event {
        id
        title
        topic
        description
        startDateTime
        endDateTime
    }
`;

// dates are actually strings when passed in, javascript shenanigans...
const formatDates = (dates: (string | Date | null)[]) =>
    dates.map((date) => formatDate(date || new Date(), 'MMM do, yyyy @ h:mm a'));

export function EventDetails({ fragmentRef, className }: EventDetailsProps) {
    const classes = useStyles();
    const [isOpen, open, close] = useResponsiveDialog();
    const {
        id,
        startDateTime: startStr,
        endDateTime: endStr,
        ...data
    } = useFragment(EVENT_DETAILS_FRAGMENT, fragmentRef);

    // https://github.com/facebook/relay/issues/91
    const [startDateTime, endDateTime] = useMemo(() => formatDates([startStr, endStr]), [startStr, endStr]);

    const formattedData = useMemo(() => ({ ...data, startDateTime, endDateTime }), [data, startDateTime, endDateTime]);

    const entries = useMemo(() => Object.entries(formattedData), [formattedData]);

    return (
        <Grid container className={clsx(classes.root, className)}>
            <ResponsiveDialog open={isOpen} onClose={close} title='Event Details'>
                <DialogContent>
                    <UpdateEvent
                        form={{
                            title: formattedData.title ?? '',
                            topic: formattedData.topic ?? '',
                            description: formattedData.description ?? '',
                            startDateTime: startStr ? new Date(startStr) : new Date(),
                            endDateTime: endStr ? new Date(endStr) : new Date(),
                        }}
                        eventId={id}
                        onSubmit={close}
                        onCancel={close}
                    />
                </DialogContent>
            </ResponsiveDialog>
            {entries.map(([key, value]) => (
                <Grid item xs={12} key={key}>
                    <Typography variant='overline'>{key}</Typography>
                    <Typography className={classes.indent}>{value}</Typography>
                </Grid>
            ))}
            <Grid item xs={12} container justify='flex-end'>
                <Grid item>
                    <Button variant='outlined' onClick={open} startIcon={<Edit />}>
                        Modify Details
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
