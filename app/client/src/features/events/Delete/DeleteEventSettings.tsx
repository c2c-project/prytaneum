import * as React from 'react';
import {
    Typography,
    Button,
    Grid,
    Link as MUILink,
} from '@material-ui/core';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { TextField } from '@local/components/TextField';
import { useSnack } from '@local/features/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from 'react-relay';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFragment } from 'react-relay';
import { makeInitialState } from '@local/utils/ts-utils';
import { EventDetailsFragment$key } from '@local/__generated__/EventDetailsFragment.graphql';
import { EVENT_DETAILS_FRAGMENT } from '../EventSettings/EventDetails';
import { DeleteEvent } from '../DeleteEvent';

interface EventSettingsProps {
    fragmentRef: EventDetailsFragment$key;
    className?: string;
}

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


export interface SelectedEvent {
    readonly id: string,
    readonly title: string | null
}

export const DeleteEventSettings = ({ fragmentRef, className }: EventSettingsProps) => {

    const { title: eventTitle } = useFragment(EVENT_DETAILS_FRAGMENT, fragmentRef);

    // styling hook
    const classes = useStyles();

    // const { handleSubmit, handleChange, values, errors, resetForm } = useFormik<TDeleteEventForm>({
    //     initialValues: makeInitialState(intiialDeleteEvent),
    //     validationSchema: deleteEventValidationSchema,
    //     // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //     onSubmit: handleCommit
    // });
    // function handleCommit(submittedForm: TDeleteEventForm) {
    //     //const userEmail = user.email ? user.email : ''
    //     const completeForm = { ...submittedForm }
    //     commit({
    //         variables: { input: completeForm },
    //         onCompleted({ deleteEvent }) {
    //             if (deleteEvent.isError) {
    //                 displaySnack(deleteEvent.message);
    //             } else {
    //                 displaySnack('Event deleted successfully!');
    //                 resetForm();
    //                 // route to login after successfully deleting Event
    //                 router.push('/events');
    //             }
    //         },
    //     });
    // }

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
            <Form className={classes.form}>
                <FormContent>
                    <TextField
                        inputProps={{ 'aria-label': 'Enter your event title' }}
                        label='Enter your event title'
                        // helperText={errors.event}
                        // error={Boolean(errors.event)}
                        required
                        variant='outlined'
                        type='password'
                        // value={values.event}
                        // onChange={handleChange('event')}
                        spellCheck={false}
                    />
                    <TextField
                        inputProps={{ 'aria-label': 'Enter your event title again' }}
                        label='Confirm your event title to DELETE your Event'
                        // helperText={errors.confirmEvent}
                        // error={Boolean(errors.confirmEvent)}
                        required
                        variant='outlined'
                        type='password'
                        // value={values.confirmEvent}
                        // onChange={handleChange('confirmEvent')}
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



