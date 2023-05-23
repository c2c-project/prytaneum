import * as React from 'react';
import { Button, TextField, Typography } from '@mui/material';

import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { useForm } from '@local/core';
import { FEEDBACK_MAX_LENGTH } from '@local/utils/rules';

export type TPostEventFeedbackFormState = { feedback: string };

export interface PostEventFeedbackFormProps {
    quote?: React.ReactNode;
    onSubmit?: (state: TPostEventFeedbackFormState) => void;
    onCancel?: () => void;
}

export function PostEventFeedbackForm({ quote, onSubmit, onCancel }: PostEventFeedbackFormProps) {
    // form related hooks
    const [form, errors, handleSubmit, handleChange] = useForm({
        feedback: '',
    });

    const isQuestionValid = React.useMemo(() => form.feedback.trim().length !== 0, [form]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle title='Feedback Form' />
            {quote}
            <FormContent>
                <TextField
                    id='feedback-field'
                    name='feedback'
                    label='Submit your feedback for the event here'
                    autoFocus
                    error={Boolean(errors.feedback)}
                    helperText={errors.feedback}
                    required
                    multiline
                    value={form.feedback}
                    onChange={handleChange('feedback')}
                />
                <Typography
                    variant='caption'
                    color={form.feedback.length > FEEDBACK_MAX_LENGTH ? 'red' : 'black'}
                    sx={{
                        display: 'block',
                        textAlign: 'right',
                    }}
                >
                    {form.feedback.length}/500
                </Typography>
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                {onCancel && (
                    <Button color='primary' onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button disabled={!isQuestionValid} type='submit' variant='contained' color='primary'>
                    Submit
                </Button>
            </FormActions>
        </Form>
    );
}
