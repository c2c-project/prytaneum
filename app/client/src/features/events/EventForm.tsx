import * as React from 'react';
import { Button, TextField } from '@mui/material';
import { MobileDateTimePicker } from '@mui/lab';
import * as Yup from 'yup';

import type { CreateEvent as FormType } from '@local/graphql-types';
import { FormActions } from '@local/components/FormActions';
import { FormContent } from '@local/components/FormContent';
import { FormTitle } from '@local/components/FormTitle';
import { Form } from '@local/components/Form';
import { useForm } from '@local/core';

export interface EventFormProps {
    onSubmit: (event: TEventForm) => void;
    onCancel?: () => void;
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

export function EventForm({ onCancel, onSubmit, className, form }: EventFormProps) {
    const [state, errors, handleSubmit, handleChange, setState] = useForm<TEventForm>(
        form || initialState,
        validationSchema
    );

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={className}>
            <FormTitle title='Create Event' />
            <FormContent>
                <TextField
                    autoFocus
                    error={Boolean(errors.title)}
                    helperText={errors.title}
                    required
                    label='Title'
                    value={state.title}
                    onChange={handleChange('title')}
                />
                <TextField
                    error={Boolean(errors.topic)}
                    helperText={errors.topic}
                    required
                    label='Topic'
                    value={state.topic}
                    onChange={handleChange('topic')}
                />
                <TextField
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                    required
                    label='Description'
                    value={state.description}
                    onChange={handleChange('description')}
                />
                <MobileDateTimePicker
                    value={state.startDateTime}
                    onChange={(value) =>
                        setState((currentState) => ({ ...currentState, startDateTime: value || new Date() }))
                    }
                    renderInput={(innerProps) => (
                        <TextField
                            {...innerProps}
                            label='Start Date & Time'
                            required
                            error={Boolean(errors.startDateTime)}
                            helperText={errors.startDateTime}
                        />
                    )}
                />
                <MobileDateTimePicker
                    value={state.endDateTime}
                    onChange={(value) =>
                        setState((currentState) => ({ ...currentState, endDateTime: value || new Date() }))
                    }
                    renderInput={(innerProps) => (
                        <TextField
                            {...innerProps}
                            label='End Date & Time'
                            required
                            error={Boolean(errors.endDateTime)}
                            helperText={errors.endDateTime}
                        />
                    )}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                {onCancel && (
                    <Button color='primary' disableElevation onClick={onCancel}>
                        Cancel
                    </Button>
                )}

                <Button type='submit' variant='contained' color='primary'>
                    Create
                </Button>
            </FormActions>
        </Form>
    );
}
