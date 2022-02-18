import { graphql, useMutation } from 'react-relay';

import type {
    DeleteEventMutation,
    DeleteEventMutationResponse,
} from '@local/__generated__/DeleteEventMutation.graphql';
import { useSnack } from '@local/features/core/useSnack';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useFragment } from 'react-relay';
import * as Yup from 'yup';
import { makeInitialState } from '@local/utils/ts-utils';
import {
    Typography,
    Button,
    Grid,
    Link as MUILink,
} from '@material-ui/core';
import { Form } from '@local/components/Form';
import { makeStyles } from '@material-ui/core/styles';
import { FormContent } from '@local/components/FormContent';
import { TextField } from '@local/components/TextField';
import { ConfirmationDialog, ConfirmationDialogProps } from '@local/components/ConfirmationDialog';
import { ConnectionHandler, RecordSourceSelectorProxy } from 'relay-runtime';
import { EventDetailsFragment$key } from '@local/__generated__/EventDetailsFragment.graphql';
import { EVENT_DETAILS_FRAGMENT } from './EventSettings/EventDetails';

export const DELETE_EVENT_MUTATION = graphql`
    mutation DeleteEventMutation($input: DeleteEvent!, $connections: [ID!]!) {
        deleteEvent(event: $input) {
            isError
            message
            body {
                id @deleteEdge(connections: $connections)
            }
        }
    }
`;

//export type TDeletedEvent = NonNullable<DeleteEventMutationResponse['deleteEvent']>;
interface EventSettingsProps {
    fragmentRef: EventDetailsFragment$key;
    className?: string;
}

export type DeleteEventProps = ConfirmationDialogProps & {
    orgId: string;
    eventId: string;
    connections?: string[];
}

export type TDeleteEvent = {
    eventTitle: string,
    confirmEventTitle: string,
};

type TDeleteEventSchema = {
    [key in keyof TDeleteEvent]: Yup.AnySchema;
};
const deleteEventValidationSchema = Yup.object().shape<TDeleteEventSchema>({
    eventTitle: Yup.string(),
    confirmEventTitle: Yup.string(),
});

const initialDeleteEvent: TDeleteEvent = {
    eventTitle: '',
    confirmEventTitle: '',
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

export const DeleteEvent = ({ fragmentRef, className }: EventSettingsProps) => {
    const [commit] = useMutation<DeleteEventMutation>(DELETE_EVENT_MUTATION);
    const { title: eventTitle } = useFragment(EVENT_DETAILS_FRAGMENT, fragmentRef);

    const router = useRouter();

    const classes = useStyles();

    const { handleSubmit, handleChange, values, errors, resetForm } = useFormik<TDeleteEvent>({
        initialValues: makeInitialState(initialDeleteEvent),
        validationSchema: deleteEventValidationSchema,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        onSubmit: handleCommit
    });
    const { displaySnack } = useSnack();

    function handleCommit(submittedForm: TDeleteEvent) {
        const completeForm = { ...submittedForm };
        commit({
            variables: { input: completeForm },
            onCompleted({ deleteEvent }) {
                if (deleteEvent.isError) {
                    displaySnack(deleteEvent.message);
                } else {
                    displaySnack('Event deleted successfully!');
                    resetForm();
                    // route to login after successfully deleting event
                    router.push('/events');
                }
            },
        });

    }

    return (
        <Grid container spacing={2}>
            <Grid component='span' item xs={12}>
                <Typography variant='body2'>
                    All of your event information will be erased from Prytaneum.
                </Typography>
            </Grid>
            <Grid component='span' item xs={12}>
                <Typography variant='body2'>
                    <b>This action is irreversible.</b> Please enter your event title below
                    twice to confirm.
                </Typography>
            </Grid>
            <Form className={classes.form} onSubmit={handleSubmit}>
                <FormContent>
                    <TextField
                        inputProps={{ 'aria-label': 'Enter your event title' }}
                        label='Enter your event title'
                        helperText={errors.eventTitle}
                        error={Boolean(errors.eventTitle)}
                        required
                        variant='outlined'
                        // type='password'
                        value={values.eventTitle}
                        onChange={handleChange('eventTitle')}
                        spellCheck={false}
                    />
                    <TextField
                        inputProps={{ 'aria-label': 'Enter your event title again' }}
                        label='Confirm your event title to DELETE your Event'
                        helperText={errors.confirmEventTitle}
                        error={Boolean(errors.confirmEventTitle)}
                        required
                        variant='outlined'
                        // type='password'
                        value={values.confirmEventTitle}
                        onChange={handleChange('confirmEventTitle')}
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
    )
}



