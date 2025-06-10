import { useEffect, useMemo } from 'react';
import {
    Button,
    TextField,
    Radio,
    RadioGroup,
    Typography,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@mui/material';

import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { useForm } from '@local/core';
import Grid from '@mui/material/Grid';
import { Prompt } from '../useLiveFeedbackPrompt';
import { FEEDBACK_PROMPT_RESPONSE_MAX_LENGTH } from '@local/utils/rules';

export type TLiveFeedbackPromptResponseFormState = {
    response: string;
    vote: string;
    promptId: string;
    multipleChoiceResponse: string;
};

export interface LiveFeedbackPromptResponseFormProps {
    onSubmit?: (state: TLiveFeedbackPromptResponseFormState) => void;
    onCancel?: () => void;
    prompt: Prompt; // Optional prop to pass the prompt directly
    isFlow?: boolean; // Optional prop to indicate if this is part of a flow
    isLastFlowPrompt?: boolean; // Optional prop to indicate if this is the last prompt in a flow
    initialState?: TLiveFeedbackPromptResponseFormState; // Optional initial state for the form
    promptIndex?: number; // Optional index of the prompt in a flow, used for callbacks
    onFormUpdate?: (state: TLiveFeedbackPromptResponseFormState, promptIndex: number) => void; // Optional callback for form updates
    onValidityChange?: (isValid: boolean) => void; // Optional callback for validity changes
}

export function LiveFeedbackPromptResponseForm({
    onSubmit,
    onCancel,
    prompt,
    isFlow,
    isLastFlowPrompt = false,
    initialState = {
        promptId: prompt.id,
        response: '',
        vote: '',
        multipleChoiceResponse: '',
    },
    promptIndex = 0,
    onFormUpdate,
    onValidityChange,
}: LiveFeedbackPromptResponseFormProps) {
    // form related hooks
    const [form, errors, handleSubmit, handleChange] = useForm(initialState);
    const currentPrompt = prompt;

    const isFeedbackValid = useMemo(() => {
        const trimmedResponse = form.response.trim();
        if (currentPrompt.reasoningType === 'REQUIRED') {
            return trimmedResponse.length <= FEEDBACK_PROMPT_RESPONSE_MAX_LENGTH && trimmedResponse.length > 0;
        }
        if (currentPrompt.isOpenEnded) {
            return trimmedResponse.length <= FEEDBACK_PROMPT_RESPONSE_MAX_LENGTH && trimmedResponse.length > 0;
        }
        return trimmedResponse.length <= FEEDBACK_PROMPT_RESPONSE_MAX_LENGTH;
    }, [form.response, currentPrompt]);

    const isValid = useMemo(() => {
        if (currentPrompt.isVote) {
            return form.vote !== '' && isFeedbackValid;
        }
        if (currentPrompt.isMultipleChoice) {
            return form.multipleChoiceResponse !== '';
        }
        return isFeedbackValid;
    }, [form, currentPrompt, isFeedbackValid]);

    const reasoningType = useMemo(() => {
        if (currentPrompt.isOpenEnded) return true; // always include reasoning for open ended
        return currentPrompt.reasoningType;
    }, [currentPrompt]);

    const responseBoxLabel = useMemo(() => {
        if (currentPrompt.isOpenEnded) return 'Write your response here...';
        if (reasoningType === 'REQUIRED') return 'Write your reasoning here...';
        return 'Feel free to write more here...';
    }, [currentPrompt, reasoningType]);

    useEffect(() => {
        if (onValidityChange) {
            onValidityChange(isValid);
        }
    }, [isValid, onValidityChange]);

    useEffect(() => {
        if (onFormUpdate) {
            // The 'form' state from useForm already contains promptId if set correctly in initialState
            onFormUpdate(form, promptIndex);
        }
    }, [form, promptIndex, onFormUpdate]); // Dependency array includes form, promptIndex, and the callback

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {!isFlow && <FormTitle title='Feedback Response' />}
            <FormContent>
                <Grid container>
                    <Grid item xs>
                        <Typography style={{ overflowWrap: 'break-word' }}>{currentPrompt.prompt}</Typography>
                    </Grid>
                </Grid>
                {currentPrompt.isVote && (
                    <Grid container alignItems='center' justifyContent='space-around'>
                        <RadioGroup
                            row
                            aria-label='feedback-prompt-vote'
                            name='feedback-prompt-vote'
                            value={form.vote}
                            onChange={handleChange('vote')}
                        >
                            <FormControlLabel value='FOR' control={<Radio />} label='For' />
                            <FormControlLabel value='AGAINST' control={<Radio />} label='Against' />
                            <FormControlLabel value='CONFLICTED' control={<Radio />} label='Conflicted' />
                        </RadioGroup>
                    </Grid>
                )}
                {currentPrompt.isMultipleChoice && (
                    <FormControl>
                        <FormLabel component='legend'>Choose one:</FormLabel>
                        <RadioGroup
                            aria-label='feedback-prompt-multiple-choice'
                            name='feedback-prompt-multiple-choice'
                            value={form.multipleChoiceResponse}
                            onChange={handleChange('multipleChoiceResponse')}
                        >
                            {currentPrompt.multipleChoiceOptions.map((option, index) => (
                                <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                )}
                {reasoningType === 'DISABLED' ? null : (
                    <div>
                        <TextField
                            id='feedback-prompt-response-field'
                            name='feedback-prompt-response'
                            label={responseBoxLabel}
                            autoFocus
                            error={Boolean(errors.response)}
                            helperText={errors.response}
                            required={reasoningType === 'REQUIRED'}
                            multiline
                            value={form.response}
                            onChange={handleChange('response')}
                        />

                        <Typography
                            variant='caption'
                            color={form.response.length > FEEDBACK_PROMPT_RESPONSE_MAX_LENGTH ? 'red' : 'black'}
                            sx={{ display: 'block', textAlign: 'right' }}
                        >
                            {form.response.length}/500
                        </Typography>
                    </div>
                )}
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                {onCancel && (
                    <Button color='primary' onClick={onCancel}>
                        I wish not to answer
                    </Button>
                )}
                {!isLastFlowPrompt ? (
                    <Button disabled={!isValid} type='submit' variant='contained' color='primary'>
                        {isFlow ? 'Next' : 'Submit'}
                    </Button>
                ) : null}
            </FormActions>
        </Form>
    );
}
