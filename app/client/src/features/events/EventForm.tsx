/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-curly-newline */
import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    // FormControlLabel,
    // Switch,
    // FormControl,
    // FormHelperText,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
    CreateEvent as FormType,
    useCreateEventMutation,
    Event as OrgEvent,
    useUpdateEventMutation,
} from '@local/graphql-types';
import { LoadingButton } from '@local/components/LoadingButton';
import { FormActions } from '@local/components/FormActions';
import { FormContent } from '@local/components/FormContent';
import { FormTitle } from '@local/components/FormTitle';
import { Form } from '@local/components/Form';
import { TextField } from '@local/components/TextField';
import { DateTimePicker } from '@local/components/DateTimePicker';

interface CommonProps {
    onSubmit?: (event: OrgEvent) => void;
    onCancel?: () => void;
}

interface CreateProps {
    variant: 'create';
    orgId: string;
}

interface UpdateProps {
    variant: 'update';
    eventId: string;
    form: Omit<FormType, 'orgId'>;
}

export type EventFormProps = (CreateProps | UpdateProps) & CommonProps;

type Schema = {
    [key in keyof Omit<FormType, 'orgId'>]: Yup.AnySchema;
};

const validationSchema = Yup.object().shape<Schema>({
    title: Yup.string().max(100, 'Title must be less than 100 characters').required('Please enter a title'),
    description: Yup.string(),
    startDateTime: Yup.date().required('Please enter a start date'),
    endDateTime: Yup.date(),
    topic: Yup.string().max(100, 'Topic must be less than 100 characters').required('Please enter a topic'),
});

const makeInitialState = (props: EventFormProps): Omit<FormType, 'orgId'> =>
    props.variant === 'create'
        ? {
              title: '',
              description: '',
              startDateTime: new Date(),
              endDateTime: new Date(),
              topic: '',
          }
        : props.form;

export function EventForm(props: EventFormProps) {
    const { onCancel, onSubmit } = props;

    const [createEvent, { loading: isLoadingCreate }] = useCreateEventMutation({
        onCompleted(results) {
            if (results.createEvent) onSubmit(results.createEvent);
        },
    });

    const [updateEvent, { loading: isLoadingUpdate }] = useUpdateEventMutation({
        onCompleted(results) {
            if (results.updateEvent) onSubmit(results.updateEvent);
        },
    });

    const isLoading = isLoadingCreate || isLoadingUpdate;

    const { handleSubmit, handleChange, values, errors } = useFormik<Omit<FormType, 'orgId'>>({
        initialValues: makeInitialState(props),
        validationSchema,
        onSubmit: (form) => {
            if (props.variant === 'create') {
                const createInput = { ...form, orgId: props.orgId };
                createEvent({ variables: { input: createInput } });
            } else {
                const updateInput = { ...form, eventId: props.eventId };
                updateEvent({ variables: { input: updateInput } });
            }
        },
        // validateOnChange: false,
    });

    return (
        <Form onSubmit={handleSubmit}>
            <FormTitle title='Townhall Form' />
            <FormContent>
                {/* <FormControl>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={state.private}
                                onChange={(_e, checked) =>
                                    setState({ ...state, private: checked })
                                }
                                name='private-checkbox'
                            />
                        }
                        label='Private'
                    />
                    <FormHelperText>
                        Turning on the Private Option means the Townhall will
                        NOT be listed publicly and will be invite only.
                    </FormHelperText>
                </FormControl> */}
                <TextField
                    error={Boolean(errors.title)}
                    helperText={errors.title}
                    required
                    label='Title'
                    value={values.title}
                    onChange={handleChange}
                />
                <TextField
                    error={Boolean(errors.topic)}
                    helperText={errors.topic}
                    required
                    label='Topic'
                    value={values.topic}
                    onChange={handleChange}
                />
                <DateTimePicker
                    error={Boolean(errors.startDateTime)}
                    helperText={errors.startDateTime}
                    fullWidth
                    required
                    autoComplete='off'
                    id='date'
                    label='Date & Time'
                    inputVariant='outlined'
                    value={values.startDateTime}
                    onChange={handleChange}
                />
                <TextField
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                    required
                    label='Description'
                    value={values.description}
                    onChange={handleChange}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justify: 'flex-end' }}>
                {onCancel && (
                    <Button color='primary' disableElevation onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <LoadingButton loading={isLoading}>
                    <Button type='submit' variant='contained' color='secondary'>
                        Submit
                    </Button>
                </LoadingButton>
            </FormActions>
        </Form>
    );
}

EventForm.defaultProps = {
    onSubmit: () => {},
    onCancel: null,
};

EventForm.propTypes = {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    orgId: PropTypes.string.isRequired,
};
