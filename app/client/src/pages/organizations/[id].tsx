import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Grid, Paper, Typography, List, ListItem, ListItemText, Button, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

import { Loader } from '@local/components/Loader';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { EventForm, EventFormProps } from '@local/features/events';
import { useOrgInfoQuery, Organization, Event as OrgEvent } from '@local/graphql-types';
import { formatDate } from '@local/utils/format';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        '& > *': {
            margin: theme.spacing(2, 0),
        },
    },
    section: {
        padding: theme.spacing(3),
    },
    listRoot: {
        width: '100%',
    },
}));

const NewEvent = ({ onSubmit: _onSubmit, ...rest }: EventFormProps) => {
    const [isOpen, open, close] = useResponsiveDialog(false);

    // wraps the onSubmit so that we close the dialog when the form is submitted too
    const onSubmit: typeof _onSubmit = (...params) => {
        close();
        _onSubmit(...params);
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

const Page: NextPage = () => {
    const router = useRouter();
    const classes = useStyles();
    const { id } = router.query as { id: string }; // guaranteed as part of the file name
    const [org, setOrg] = React.useState<Organization>();
    const { loading } = useOrgInfoQuery({
        variables: { id },
        onCompleted(results) {
            if (results.orgById) setOrg(results.orgById);
        },
    });

    const prependEvent = (event: OrgEvent) => {
        setOrg((prev) => ({
            ...prev,
            events: [event, ...prev.events],
        }));
    };

    const handleNav = (path: string) => () => router.push(path);

    if (loading || !org) return <Loader />;

    return (
        <Grid container className={classes.root} alignItems='flex-start' alignContent='flex-start'>
            <Typography variant='h4'>{org.name}</Typography>
            <Grid component={Paper} container item direction='column' className={classes.section}>
                <Typography variant='h5'>Events</Typography>
                <Grid item className={classes.listRoot}>
                    <List>
                        {org.events.length > 0 ? (
                            org.events.map(({ eventId, title, startDateTime }) => (
                                <ListItem
                                    button
                                    key={eventId}
                                    divider
                                    onClick={handleNav(`/events/${eventId}/settings`)}
                                >
                                    <ListItemText primary={title} secondary={formatDate(startDateTime)} />
                                </ListItem>
                            ))
                        ) : (
                            <Typography align='center' variant='body2'>
                                No events to display
                            </Typography>
                        )}
                    </List>
                </Grid>
                <Grid container justify='flex-end'>
                    <NewEvent variant='create' onSubmit={prependEvent} orgId={id} />
                </Grid>
            </Grid>
            <Grid component={Paper} container item direction='column' className={classes.section}>
                <Typography variant='h5'>Members</Typography>
                <Grid item className={classes.listRoot}>
                    <List>
                        {org.members.length > 0 ? (
                            org.members.map(({ userId, firstName, lastName }) => (
                                <ListItem button key={userId} divider>
                                    <ListItemText primary={`${firstName} ${lastName}`} />
                                </ListItem>
                            ))
                        ) : (
                            <Typography align='center' variant='body2'>
                                No members to display
                            </Typography>
                        )}
                    </List>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Page;
