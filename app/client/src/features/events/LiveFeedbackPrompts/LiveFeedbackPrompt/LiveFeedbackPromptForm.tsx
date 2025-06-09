import * as React from 'react';
import {
    Button,
    TextField,
    Radio,
    RadioGroup,
    Typography,
    FormControlLabel,
    IconButton,
    Tooltip,
    ToggleButtonGroup,
    ToggleButton,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import SendIcon from '@mui/icons-material/Send';

import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { useForm } from '@local/core';
import Grid from '@mui/material/Grid';
import {
    FEEDBACK_PROMPT_MAX_LENGTH,
    CHOICE_MAX_LENGTH,
    CHOICES_MAX_AMOUNT,
    STARTING_CHOICE_AMOUNT,
} from '@local/utils/rules';
import { FeedbackDashboardTab } from './LiveFeedbackPromptList';

export type TLiveFeedbackPromptFormState = {
    prompt: string;
    feedbackType: string;
    choices: string[];
    reasoningType: string;
};

export interface LiveFeedbackPromptFormProps {
    intialState?: TLiveFeedbackPromptFormState;
    onChange?: (state: TLiveFeedbackPromptFormState) => void;
    onSubmit?: (state: TLiveFeedbackPromptFormState, isDraft: boolean) => void;
    onCancel?: () => void;
    selectedTab?: FeedbackDashboardTab;
    hideActions?: boolean;
    hideTitle?: boolean;
}

export function LiveFeedbackPromptForm({
    intialState,
    onChange,
    onSubmit,
    onCancel,
    selectedTab,
    hideActions = false,
    hideTitle = false,
}: LiveFeedbackPromptFormProps) {
    const [choices, setChoices] = React.useState<string[]>(
        new Array(STARTING_CHOICE_AMOUNT).fill('', 0, STARTING_CHOICE_AMOUNT)
    );
    // form related hooks
    const [form, errors, handleSubmit, handleChange, setState] = useForm<TLiveFeedbackPromptFormState>(
        intialState ?? {
            prompt: '',
            feedbackType: selectedTab ?? 'open-ended',
            choices: choices,
            reasoningType: 'optional',
        }
    );

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

    const maxChoicesReached = React.useMemo(() => choices.length >= CHOICES_MAX_AMOUNT, [choices]);

    const handleAddChoice = () => {
        if (choices.length >= CHOICES_MAX_AMOUNT) return;
        setChoices([...choices, '']);
    };

    const handleRemoveChoice = (index: number) => () => {
        const newChoices = [...choices];
        newChoices.splice(index, 1);
        setChoices(newChoices);
        form.choices = newChoices;
    };

    const isPromptValidForSubmission = () => {
        if (!isFeedbackPromptValid) {
            return false;
        }
        if (form.feedbackType === 'multiple-choice' && !isMultipleChoiceOptionsValid) {
            return false;
        }
        return true;
    };

    const onSaveDraft = () => {
        const isDraft = true;
        if (onSubmit) onSubmit(form, isDraft);
    };

    const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        handleChange('prompt')(event);
        const newPrompt = event.target.value;
        if (onChange) onChange({ ...form, prompt: newPrompt });
    };

    const handleFeedbackTypeChange = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const newFeedbackType = (event.target as HTMLButtonElement).value;
        form.feedbackType = newFeedbackType;
        setState((prev) => ({ ...prev, feedbackType: newFeedbackType }));
        if (onChange) onChange({ ...form, feedbackType: newFeedbackType });
    };

    return (
        <Form
            onSubmit={handleSubmit((_form) => {
                const isDraft = false;
                if (onSubmit) onSubmit(_form, isDraft);
            })}
        >
            {!hideTitle && <FormTitle title='Feedback Prompt' />}
            <FormContent>
                <Grid container alignItems='center' justifyContent='space-around' direction='column'>
                    <Typography>Feedback Type:</Typography>
                    <ToggleButtonGroup
                        color='primary'
                        value={form.feedbackType}
                        exclusive
                        onChange={handleFeedbackTypeChange}
                        aria-label='Platform'
                    >
                        <ToggleButton value='open-ended'>Open Ended</ToggleButton>
                        <ToggleButton value='vote'>Vote</ToggleButton>
                        <ToggleButton value='multiple-choice'>Multiple Choice</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                {form.feedbackType === 'open-ended' ? null : (
                    <Grid container alignItems='center' justifyContent='space-around' direction='column'>
                        <Typography>Reasoning:</Typography>
                        <RadioGroup
                            row
                            aria-label='reasoning-type'
                            name='reasoning-type'
                            value={form.reasoningType}
                            onChange={handleChange('reasoningType')}
                        >
                            <FormControlLabel
                                value='disabled'
                                label='Disabled'
                                control={
                                    <Tooltip
                                        placement='top'
                                        title='Participants will not be asked to provide reasoning for their responses.'
                                    >
                                        <Radio color='error' />
                                    </Tooltip>
                                }
                            />
                            <FormControlLabel
                                value='optional'
                                label='Optional'
                                control={
                                    <Tooltip
                                        placement='top'
                                        title='Participants will have the option to provide reasoning for their responses.'
                                    >
                                        <Radio color='warning' />
                                    </Tooltip>
                                }
                            />
                            <FormControlLabel
                                value='required'
                                label='Required'
                                control={
                                    <Tooltip
                                        placement='top'
                                        title='Participants will be required to provide reasoning for their responses.'
                                    >
                                        <Radio />
                                    </Tooltip>
                                }
                            />
                        </RadioGroup>
                    </Grid>
                )}
                <Grid item container justifyContent='center'>
                    {form.feedbackType === 'open-ended' && (
                        <Typography>Ask participants to provide open ended feedback on a topic.</Typography>
                    )}
                    {form.feedbackType === 'vote' && (
                        <Typography>
                            Ask participants if they are <b>FOR</b>, <b>AGAINST</b>, or <b>CONFLICTED</b> about
                            something and give their reasoning.
                        </Typography>
                    )}
                    {form.feedbackType === 'multiple-choice' && (
                        <Typography>
                            Ask participants to choose from a list of options and give their reasoning.
                        </Typography>
                    )}
                </Grid>
                <TextField
                    id='feedback-prompt-field'
                    name='feedback-prompt'
                    label='Write your feedback prompt here...'
                    error={Boolean(errors.prompt)}
                    helperText={errors.prompt}
                    required
                    multiline
                    value={form.prompt}
                    onChange={handlePromptChange}
                />
                <Typography
                    variant='caption'
                    color={form.prompt.length > FEEDBACK_PROMPT_MAX_LENGTH ? 'red' : 'black'}
                    sx={{ display: 'block', textAlign: 'right' }}
                >
                    {form.prompt.length}/500
                </Typography>
                {form.feedbackType === 'multiple-choice' && (
                    <Grid container direction='row' alignItems='center' justifyContent='center' width='100%'>
                        {choices.map((choice, index) => (
                            <Grid container key={`choice-${index}`} alignItems='center'>
                                <Grid item>
                                    <IconButton onClick={handleRemoveChoice(index)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                    {/* Padding to align icon with text box */}
                                    <Grid item height='20px' />
                                </Grid>
                                <Grid item></Grid>
                                <Grid item container flex='1'>
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
                                    <Grid item container justifyContent='right'>
                                        <Typography
                                            variant='caption'
                                            color={choice.length > CHOICE_MAX_LENGTH ? 'red' : 'black'}
                                            sx={{ display: 'block', textAlign: 'right' }}
                                        >
                                            {choice.length}/{CHOICE_MAX_LENGTH}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                        <Grid item>
                            {maxChoicesReached ? (
                                <Typography color='red'>Max choices reached</Typography>
                            ) : (
                                <Button disabled={maxChoicesReached} onClick={handleAddChoice}>
                                    Add Choice
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                )}
            </FormContent>
            {!hideActions && (
                <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                    {onCancel && (
                        <Button variant='outlined' color='primary' onClick={onCancel}>
                            Cancel
                        </Button>
                    )}
                    <Button
                        disabled={!isPromptValidForSubmission()}
                        onClick={onSaveDraft}
                        variant='contained'
                        color='primary'
                        startIcon={<ScheduleSendIcon />}
                    >
                        Save as Draft
                    </Button>
                    <Button
                        disabled={!isPromptValidForSubmission()}
                        type='submit'
                        variant='contained'
                        color='primary'
                        startIcon={<SendIcon />}
                    >
                        Prompt
                    </Button>
                </FormActions>
            )}
        </Form>
    );
}
