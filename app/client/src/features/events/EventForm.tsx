import * as React from 'react';
import { Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import type { CreateEvent as FormType } from '@local/graphql-types';
import { FormActions } from '@local/components/FormActions';
import { FormContent } from '@local/components/FormContent';
import { FormTitle } from '@local/components/FormTitle';
import { Form } from '@local/components/Form';
import { TextField } from '@local/components/TextField';
import { DateTimePicker } from '@local/components/DateTimePicker';
import { makeInitialState } from '@local/utils/ts-utils';

export interface EventFormProps {
    onSubmit: (event: TEventForm) => void;
    onCancel?: () => void;
    title?: boolean;
    className?: string;
    form?: TEventForm;
}

export type TEventForm = Omit<FormType, 'orgId'>;

// convenience type helper for the schema below it
type TSchema = {
    [key in keyof TEventForm]: Yup.AnySchema;
};
const validationSchema = Yup.object().shape<TSchema>({
    title: Yup.string().max(100, 'Title must be less than 100 characters').required('Please enter a title'),
    description: Yup.string(),
    startDateTime: Yup.date()
        .max(Yup.ref('endDateTime'), 'Start date & time must be less than end date & time!')
        .required('Please enter a start date'),
    endDateTime: Yup.date()
        .min(Yup.ref('startDateTime'), 'End date & time must be greater than start date & time!')
        .required(),
    topic: Yup.string().max(100, 'Topic must be less than 100 characters').required('Please enter a topic'),
});

const initialState: TEventForm = {
    title: '',
    description: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    topic: '',
};

export function EventForm(props: EventFormProps) {
    const { onCancel, onSubmit, title, className, form } = props;

    const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik<TEventForm>({
        initialValues: makeInitialState(initialState, form),
        validationSchema,
        onSubmit,
        // not sure how I feel about this
        // validateOnChange: false,
    });

    return (
        <Form onSubmit={handleSubmit} className={className}>
            {title && <FormTitle title='Townhall Form' />}
            <FormContent>
                <TextField
                    autoFocus
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
                <TextField
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                    required
                    label='Description'
                    value={values.description}
                    onChange={handleChange}
                />
                <DateTimePicker
                    error={Boolean(errors.startDateTime)}
                    helperText={errors.startDateTime}
                    fullWidth
                    required
                    autoComplete='off'
                    id='date'
                    label='Start Date & Time'
                    inputVariant='outlined'
                    value={values.startDateTime}
                    onChange={(value) => setFieldValue('startDateTime', value)}
                />
                <DateTimePicker
                    error={Boolean(errors.endDateTime)}
                    helperText={errors.endDateTime}
                    fullWidth
                    required
                    autoComplete='off'
                    id='date'
                    label='End Date & Time'
                    inputVariant='outlined'
                    value={values.endDateTime}
                    onChange={(value) => setFieldValue('endDateTime', value)}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justify: 'flex-end' }}>
                {onCancel && (
                    <Button color='primary' disableElevation onClick={onCancel}>
                        Cancel
                    </Button>
                )}

                <Button type='submit' variant='contained' color='secondary'>
                    Submit
                </Button>
            </FormActions>
        </Form>
    );
}
