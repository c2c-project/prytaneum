import * as React from 'react';
import { List, ListItem, ListItemText, Typography, Grid, Button, DialogContent } from '@material-ui/core';
import { useRouter } from 'next/router';
import { Add } from '@material-ui/icons';
import { graphql, useFragment } from 'react-relay';

import type { OrgEventListFragment$key } from '@local/__generated__/OrgEventListFragment.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { Event } from '@local/graphql-types';
import { formatDate } from '@local/utils/format';
import { EventForm, EventFormProps } from '@local/features/events';

const NewEvent = ({ onSubmit: _onSubmit, ...rest }: EventFormProps) => {
    const [isOpen, open, close] = useResponsiveDialog(false);

    // wraps the onSubmit so that we close the dialog when the form is submitted too
    const onSubmit: typeof _onSubmit = (...params) => {
        close();
        if (_onSubmit) _onSubmit(...params);
    };

    return (
        <>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <EventForm onCancel={close} onSubmit={onSubmit} {...rest} />
                </DialogContent>
            </ResponsiveDialog>
            <Button onClick={open} startIcon={<Add />}>
                New Event
            </Button>
        </>
    );
};

interface OrgEventListProps {
    fragementRef: OrgEventListFragment$key;
    className?: string;
    orgId: string;
}

const EVENT_FRAGEMENT = graphql`
    fragment OrgEventListFragment on Organization {
        events {
            id
            title
            topic
            startDateTime
        }
    }
`;

export function OrgEventList({ fragementRef, className, orgId }: OrgEventListProps) {
    const data = useFragment(EVENT_FRAGEMENT, fragementRef);
    const [events, setEvents] = React.useState(data.events ?? []);
    const router = useRouter();
    const handleNav = (path: string) => () => router.push(path);

    const prependEvent = (event: Event) => {
        setEvents((prev) => ({
            ...prev,
            event,
        }));
    };

    return (
        <Grid container item direction='column' className={className}>
            <Grid item xs={12}>
                <List>
                    {events.length > 0 ? (
                        events.map(({ id, title, startDateTime }, idx) => (
                            <ListItem
                                button
                                key={id}
                                divider={idx !== events.length - 1}
                                onClick={handleNav(`/events/${id}/settings`)}
                            >
                                <ListItemText primary={title} secondary={startDateTime && formatDate(startDateTime)} />
                            </ListItem>
                        ))
                    ) : (
                        <Typography align='center' variant='body2' color='textSecondary'>
                            No events to display
                        </Typography>
                    )}
                </List>
            </Grid>
            <Grid container justify='flex-end'>
                <NewEvent variant='create' onSubmit={prependEvent} orgId={orgId} />
            </Grid>
        </Grid>
    );
}
