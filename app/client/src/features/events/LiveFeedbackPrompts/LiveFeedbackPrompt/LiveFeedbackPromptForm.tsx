import * as React from 'react';
import { Button, TextField, Radio, RadioGroup, Typography, FormControlLabel } from '@mui/material';

import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { useForm } from '@local/core';
import Grid from '@mui/material/Grid';
import { FEEDBACK_PROMPT_MAX_LENGTH, CHOICE_MAX_LENGTH } from '@local/utils/rules';

export type TLiveFeedbackPromptFormState = {
    prompt: string;
    feedbackType: string;
    choices: string[];
};

export interface LiveFeedbackPromptFormProps {
    onSubmit?: (state: TLiveFeedbackPromptFormState) => void;
    onCancel?: () => void;
}

export function LiveFeedbackPromptForm({ onSubmit, onCancel }: LiveFeedbackPromptFormProps) {
    const [choices, setChoices] = React.useState<string[]>(new Array(3).fill('', 0, 3));
    // form related hooks
    const [form, errors, handleSubmit, handleChange] = useForm({
        prompt: '',
        feedbackType: 'open-ended',
        choices: choices,
    });

    const handleMultipleChoiceChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChoices = [...choices];
        newChoices[index] = event.target.value;
        setChoices(newChoices);
        form.choices = newChoices;
    };

    const isFeedbackPromptValid = React.useMemo(() => form.prompt.trim().length !== 0, [form]);
    const isMultipleChoiceOptionsValid = React.useMemo(
        () => choices.every((choice) => choice.trim().length !== 0 && choice.length <= CHOICE_MAX_LENGTH),
        [choices]
    );
    const isMultipleChoiceOptionValid = React.useMemo(
        () => (index: number) => choices[index].length <= CHOICE_MAX_LENGTH,
        [choices]
    );

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
                        <FormControlLabel value='multiple-choice' control={<Radio />} label='Multiple Choice' />
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
                <Typography
                    variant='caption'
                    color={form.prompt.length > FEEDBACK_PROMPT_MAX_LENGTH ? 'red' : 'black'}
                    sx={{ display: 'block', textAlign: 'right' }}
                >
                    {form.prompt.length}/500
                </Typography>
                {form.feedbackType === 'multiple-choice' && (
                    <React.Fragment>
                        {choices.map((choice, index) => (
                            <React.Fragment key={`choice-${index}`}>
                                <TextField
                                    key={`choice-${index}`}
                                    id={`choice-${index}`}
                                    name={`feedback-multiple-choice-${index}`}
                                    label={`Choice ${index + 1}`}
                                    error={!isMultipleChoiceOptionValid(index)}
                                    required
                                    value={choice}
                                    onChange={handleMultipleChoiceChange(index)}
                                />
                                <Typography
                                    variant='caption'
                                    color={choice.length > CHOICE_MAX_LENGTH ? 'red' : 'black'}
                                    sx={{ display: 'block', textAlign: 'right' }}
                                >
                                    {choice.length}/{CHOICE_MAX_LENGTH}
                                </Typography>
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                )}
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                {onCancel && (
                    <Button color='primary' onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button
                    disabled={!isFeedbackPromptValid || !isMultipleChoiceOptionsValid}
                    type='submit'
                    variant='contained'
                    color='primary'
                >
                    Create
                </Button>
            </FormActions>
        </Form>
    );
}
