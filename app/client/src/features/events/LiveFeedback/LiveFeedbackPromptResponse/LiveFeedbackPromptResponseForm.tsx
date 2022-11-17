import * as React from 'react';
import { Button, TextField, Radio, RadioGroup, Typography, FormControlLabel } from '@mui/material';

import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { useForm } from '@local/core';
import Grid from '@mui/material/Grid';

export type TLiveFeedbackPromptResponseFormState = { message: string; feedbackType: string };

export interface LiveFeedbackPromptResponseFormProps {
    onSubmit?: (state: TLiveFeedbackPromptResponseFormState) => void;
    onCancel?: () => void;
}

export function LiveFeedbackPromptResponseForm({ onSubmit, onCancel }: LiveFeedbackPromptResponseFormProps) {
    // form related hooks
    const [form, errors, handleSubmit, handleChange] = useForm({
        message: '',
        feedbackType: 'open-ended',
    });

    const isFeedbackValid = React.useMemo(() => form.message.trim().length !== 0, [form]);

    React.useEffect(() => {
        console.log(form);
    }, [form]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle title='Feedback Prompt' />
            <FormContent>
                <Grid container alignItems='center' justifyContent='space-around'>
                    <Typography>Type of Feedback:</Typography>
                    <RadioGroup
                        row
                        aria-label='feedback-prompt'
                        name='feedback-prompt'
                        value={form.feedbackType}
                        onChange={handleChange('feedbackType')}
                    >
                        <FormControlLabel value='open-ended' control={<Radio />} label='Open Ended' />
                        <FormControlLabel value='vote' control={<Radio />} label='Vote' />
                    </RadioGroup>
                </Grid>
                <TextField
                    id='feedback-prompt-field'
                    name='feedback-prompt'
                    label='Write your feedback prompt here...'
                    autoFocus
                    error={Boolean(errors.message)}
                    helperText={errors.message}
                    required
                    multiline
                    value={form.message}
                    onChange={handleChange('message')}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                {onCancel && (
                    <Button color='primary' onClick={onCancel}>
                        I wish not to answer
                    </Button>
                )}
                <Button disabled={!isFeedbackValid} type='submit' variant='contained' color='primary'>
                    Submit
                </Button>
            </FormActions>
        </Form>
    );
}
