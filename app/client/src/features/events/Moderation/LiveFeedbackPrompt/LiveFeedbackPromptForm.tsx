import * as React from 'react';
import { Button, TextField, Radio, RadioGroup, Typography, FormControlLabel } from '@mui/material';

import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { useForm } from '@local/core';
import Grid from '@mui/material/Grid';

export type TLiveFeedbackPromptFormState = { prompt: string; feedbackType: string };

export interface LiveFeedbackPromptFormProps {
    onSubmit?: (state: TLiveFeedbackPromptFormState) => void;
    onCancel?: () => void;
}

export function LiveFeedbackPromptForm({ onSubmit, onCancel }: LiveFeedbackPromptFormProps) {
    // form related hooks
    const [form, errors, handleSubmit, handleChange] = useForm({
        prompt: '',
        feedbackType: 'open-ended',
    });

    const isFeedbackPromptValid = React.useMemo(() => form.prompt.trim().length !== 0, [form]);

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
                    error={Boolean(errors.prompt)}
                    helperText={errors.prompt}
                    required
                    multiline
                    value={form.prompt}
                    onChange={handleChange('prompt')}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                {onCancel && (
                    <Button color='primary' onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button disabled={!isFeedbackPromptValid} type='submit' variant='contained' color='primary'>
                    Create
                </Button>
            </FormActions>
        </Form>
    );
}
