import * as React from 'react';
import { Button, TextField, Typography } from '@mui/material';

import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { useForm } from '@local/core';
import { FEEDBACK_MAX_LENGTH } from '@local/utils/rules';

export type TLiveFeedbackFormState = { message: string };

export interface LiveFeedbackFormProps {
    reply?: React.ReactNode;
    onSubmit?: (state: TLiveFeedbackFormState) => void;
    onCancel?: () => void;
}

export function LiveFeedbackForm({ reply, onSubmit, onCancel }: LiveFeedbackFormProps) {
    // form related hooks
    const [form, errors, handleSubmit, handleChange] = useForm({
        message: '',
    });

    const isFeedbackValid = React.useMemo(() => form.message.trim().length !== 0, [form]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle title={reply ? 'Live Feedback Reply Form' : 'Live Feedback Form'} />
            {reply}
            <FormContent>
                <TextField
                    id='feedback-field'
                    name={reply ? 'feedback-reply' : 'feedback'}
                    label={reply ? 'Feedback Reply...' : 'Send your feedback directly to the moderators'}
                    autoFocus
                    error={Boolean(errors.message)}
                    helperText={errors.message}
                    required
                    multiline
                    value={form.message}
                    onChange={handleChange('message')}
                />
                <Typography
                    variant='caption'
                    color={form.message.length > FEEDBACK_MAX_LENGTH ? 'red' : 'black'}
                    sx={{ display: 'block', textAlign: 'right' }}
                >
                    {form.message.length}/500
                </Typography>
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                {onCancel && (
                    <Button color='primary' onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button disabled={!isFeedbackValid} type='submit' variant='contained' color='primary'>
                    {reply ? 'Reply' : 'Ask'}
                </Button>
            </FormActions>
        </Form>
    );
}
