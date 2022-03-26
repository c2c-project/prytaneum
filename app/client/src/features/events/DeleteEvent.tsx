import * as React from 'react';
import * as Yup from 'yup';
import {
    Typography,
    Button,
    Grid,
    TextField
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useMutation, useFragment } from 'react-relay';
import { useFormik } from 'formik';
import { graphql } from 'react-relay';

import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { useSnack } from '@local/features/core';
import { makeInitialState } from '@local/utils/ts-utils';
import type { DeleteEventMutation } from '@local/__generated__/DeleteEventMutation.graphql';
import { EventDetailsFragment$key } from '@local/__generated__/EventDetailsFragment.graphql';
import { EVENT_DETAILS_FRAGMENT } from './EventSettings/EventDetails';

const DELETE_EVENT_MUTATION = graphql`
    mutation DeleteEventMutation($input: DeleteEvent!) {
        deleteEvent(event: $input) {
            isError
            message
            body {
                id 
                title
                topic
                startDateTime
            }
        }
    }
`;

interface DeleteEventProps {
    fragmentRef: EventDetailsFragment$key;
    className?: string;
}

// used for deleting user Event
export type TDeleteEvent = {
    title: string;
    confirmTitle: string;
};

type TDeleteEventSchema = {
    [key in keyof TDeleteEvent]: Yup.AnySchema;
};
const deleteEventValidationSchema = Yup.object().shape<TDeleteEventSchema>({
    title: Yup.string(),
    confirmTitle: Yup.string(),
});

const intialDeleteEvent: TDeleteEvent = {
    title: '',
    confirmTitle: '',
};

const useStyles = makeStyles((theme) => ({
    form: {
        margin: theme.spacing(1, 0),
    },
    link: {
        paddingLeft: theme.spacing(1),
    },
    button: {
        color: theme.palette.custom.danger,
        borderColor: theme.palette.custom.danger,
    }
}));

export const DeleteEvent = ({ fragmentRef }: DeleteEventProps) => {
    // form state hooks
    const [commit] = useMutation<DeleteEventMutation>(DELETE_EVENT_MUTATION);

    const { id: eventId } = useFragment(EVENT_DETAILS_FRAGMENT, fragmentRef);
    const { title: eventTitle } = useFragment(EVENT_DETAILS_FRAGMENT, fragmentRef);

    const { displaySnack } = useSnack();

    // styling hook
    const classes = useStyles();

    function handleCommit(submittedForm: TDeleteEvent) {
        // add eventId to input passed into the commit
        if (!eventId) return; //eventId could be empty
        commit({
            variables: { input: { eventId, ...submittedForm } },
            onCompleted({ deleteEvent }) {
                if (deleteEvent.isError) {
                    displaySnack(deleteEvent.message);
                } else {
                    displaySnack('Event deleted successfully!');
                    //forces the page to reload which lets it route back to the proper page
                    window.location.reload()
                    //route to list of organizations after successfully deleting event
                    //TODO: https://github.com/c2c-project/prytaneum/issues/265#issue-1152493329
                }
            },
        });
    }

    const { handleSubmit, handleChange, values, errors } = useFormik<TDeleteEvent>({
        initialValues: makeInitialState(intialDeleteEvent),
        validationSchema: deleteEventValidationSchema,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        onSubmit: handleCommit,
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='body2'>All of your event information will be erased from Prytaneum.</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body2'>
                    <b>This action is irreversible.</b> Please enter <b>{eventTitle}</b> below twice to confirm.
                </Typography>
            </Grid>
            <Form className={classes.form} onSubmit={handleSubmit}>
                <FormContent>
                    <TextField
                        inputProps={{ 'aria-label': `Enter ${eventTitle} to delete event` }}
                        label='Enter event title'
                        helperText={errors.title}
                        error={Boolean(errors.title)}
                        required
                        variant='outlined'
                        value={values.title}
                        onChange={handleChange('title')}
                        spellCheck={false}
                    />
                    <TextField
                        inputProps={{ 'aria-label': `Enter ${eventTitle} again` }}
                        label='Confirm your event title to DELETE your event'
                        helperText={errors.confirmTitle}
                        error={Boolean(errors.confirmTitle)}
                        required
                        variant='outlined'
                        value={values.confirmTitle}
                        onChange={handleChange('confirmTitle')}
                        spellCheck={false}
                    />
                </FormContent>
                <Grid item xs={12}>
                    <Button className={classes.button} type='submit' variant='outlined'>
                        Delete Event
                    </Button>
                </Grid>
            </Form>
        </Grid>
    );
}