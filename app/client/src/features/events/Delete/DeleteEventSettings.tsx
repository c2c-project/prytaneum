import * as React from 'react';
import {
    Typography,
    Button,
    Grid
} from '@material-ui/core';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { TextField } from '@local/components/TextField';
import { useFragment } from 'react-relay';
import { useSnack } from '@local/features/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from 'react-relay';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { makeInitialState } from '@local/utils/ts-utils';
import type { DeleteEventMutation } from '@local/__generated__/DeleteEventMutation.graphql';
import { EventDetailsFragment$key } from '@local/__generated__/EventDetailsFragment.graphql';
import { EVENT_DETAILS_FRAGMENT } from '../EventSettings/EventDetails';
import { DELETE_EVENT_MUTATION } from '../DeleteEvent';
import { ConnectionHandler, RecordSourceSelectorProxy } from 'relay-runtime';

interface DeleteEventSettingsProps {
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
    // indent: {
    //     paddingLeft: theme.spacing(4),
    // },
    // fullWidth: {
    //     width: '100%',
    // },
    form: {
        margin: theme.spacing(0, 1, 0, 1),
    },
    link: {
        paddingLeft: theme.spacing(1),
    },
}));

export const DeleteEventSettings = ({ fragmentRef, className }: DeleteEventSettingsProps) => {
    // form state hooks
    const [commit] = useMutation<DeleteEventMutation>(DELETE_EVENT_MUTATION);

    const { id: eventId } = useFragment(EVENT_DETAILS_FRAGMENT, fragmentRef);
    const { title: eventTitle } = useFragment(EVENT_DETAILS_FRAGMENT, fragmentRef);

    // user feedback
    const { displaySnack } = useSnack();

    // routing hook
    const router = useRouter();

    // styling hook
    const classes = useStyles();

    const { handleSubmit, handleChange, values, errors, resetForm } = useFormik<TDeleteEvent>({
        initialValues: makeInitialState(intialDeleteEvent),
        validationSchema: deleteEventValidationSchema,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        onSubmit: handleCommit,
    });
    function handleCommit(submittedForm: TDeleteEvent) {
        // add user email to input passed into the commit
        const eventI = eventId ? eventId : '';
        const completeForm = { eventId: eventI, ...submittedForm };
        commit({
            variables: { input: completeForm },
            onCompleted({ deleteEvent }) {
                if (deleteEvent.isError) {
                    displaySnack(deleteEvent.message);
                } else {
                    displaySnack('Event deleted successfully!');
                    //forces the page to reload which lets it route back to the proper page
                    window.location.reload()
                    //resetForm();
                    //route to list of organizations after successfully deleting event
                    //IMPROVEMENT: routing back to organization event list instead of lists of organizations
                    //for some reason, it routes back to the proper organization page??
                    //router.push(`/organizations/me`);
                }
            },
        });
    }

    return (
        <Grid container spacing={2}>
            <Grid component='span' item xs={12}>
                <Typography variant='body2'>All of your event information will be erased from Prytaneum.</Typography>
            </Grid>
            <Grid component='span' item xs={12}>
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
                        // type='password'
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
                        // type='password'
                        value={values.confirmTitle}
                        onChange={handleChange('confirmTitle')}
                        spellCheck={false}
                    />
                </FormContent>
                <Grid component='span' item xs={12}>
                    <Button type='submit' variant='outlined' style={{ color: 'red', borderColor: 'red' }}>
                        Delete Event
                    </Button>
                </Grid>
            </Form>
        </Grid>
    );
}
