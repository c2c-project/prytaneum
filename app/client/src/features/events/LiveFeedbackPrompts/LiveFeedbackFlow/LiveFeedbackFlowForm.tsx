import * as React from 'react';
import {
    Button,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    IconButton,
    Box,
    Grid,
    Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save'; // Icon for Save Draft
import SendIcon from '@mui/icons-material/Send'; // Icon for Prompt

import { LiveFeedbackPromptForm, TLiveFeedbackPromptFormState } from '../LiveFeedbackPrompt/LiveFeedbackPromptForm';
import { STARTING_CHOICE_AMOUNT } from '@local/utils/rules';

export interface TLiveFeedbackFlowFormData {
    name: string;
    description: string;
    prompts: TLiveFeedbackPromptFormState[];
}

export interface LiveFeedbackFlowFormProps {
    onSubmit: (flowData: TLiveFeedbackFlowFormData) => void;
    onCancel: () => void;
    onSaveDraft: (flowData: TLiveFeedbackFlowFormData) => void;
    initialState?: Partial<TLiveFeedbackFlowFormData>; // For potential editing functionality later
}

const createDefaultPromptState = (): TLiveFeedbackPromptFormState => ({
    prompt: '',
    feedbackType: 'open-ended',
    choices: new Array(STARTING_CHOICE_AMOUNT).fill('', 0, STARTING_CHOICE_AMOUNT),
    reasoningType: 'optional',
});

export function LiveFeedbackFlowForm({ onSubmit, onCancel, onSaveDraft, initialState }: LiveFeedbackFlowFormProps) {
    const [flowName, setFlowName] = React.useState<string>(initialState?.name ?? '');
    const [flowDescription, setFlowDescription] = React.useState<string>(initialState?.description ?? '');

    const [prompts, setPrompts] = React.useState<TLiveFeedbackPromptFormState[]>(
        initialState?.prompts ?? [createDefaultPromptState()]
    );

    // --- Handlers ---
    const handleFlowNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFlowName(event.target.value);
    };

    const handleFlowDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFlowDescription(event.target.value);
    };

    const handleAddPrompt = () => {
        setPrompts([...prompts, createDefaultPromptState()]);
    };

    const handleRemovePrompt = (indexToRemove: number) => () => {
        if (prompts.length <= 1) {
            console.warn('Cannot remove the last prompt.');
            return;
        }
        setPrompts(prompts.filter((_, index) => index !== indexToRemove));
    };

    const handlePromptChange = (indexToUpdate: number, newState: TLiveFeedbackPromptFormState) => {
        const updatedPrompts = prompts.map((prompt, index) => (index === indexToUpdate ? newState : prompt));
        setPrompts(updatedPrompts);
    };

    const getFlowData = (): TLiveFeedbackFlowFormData => ({
        name: flowName,
        description: flowDescription,
        prompts: prompts,
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(getFlowData());
    };

    const handleSaveDraft = () => {
        onSaveDraft(getFlowData());
    };

    const isFlowInfoValid = flowName.length > 0 && flowDescription.length > 0;
    const arePromptsValid = prompts.every((p) => p.prompt.length > 0); // Simplified check
    const canSubmit = isFlowInfoValid && arePromptsValid;

    return (
        <Box component='form' onSubmit={handleSubmit} sx={{ width: '100%', height: '100%' }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                    <TextField
                        id='flow-name'
                        label='Survey Name'
                        value={flowName}
                        onChange={handleFlowNameChange}
                        fullWidth
                        required
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='flow-description'
                        label='Survey Description'
                        value={flowDescription}
                        onChange={handleFlowDescriptionChange}
                        fullWidth
                        required
                        multiline
                        rows={3}
                        variant='outlined'
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />
            <Typography variant='h6' gutterBottom sx={{ mb: 2 }}>
                Prompts
            </Typography>

            <Box sx={{ mb: 2 }}>
                {prompts.map((promptState, index) => (
                    <Accordion key={index} defaultExpanded={index === 0} sx={{ mb: 1 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Typography sx={{ flexGrow: 1, mr: 1 }}>
                                    {`Prompt ${index + 1}: ${promptState.prompt.substring(0, 30) || 'New Prompt'}${
                                        promptState.prompt.length > 30 ? '...' : ''
                                    }`}
                                </Typography>
                                {prompts.length > 1 && (
                                    <IconButton
                                        aria-label='delete prompt'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemovePrompt(index)();
                                        }}
                                        size='small'
                                        color='error'
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <LiveFeedbackPromptForm
                                intialState={promptState}
                                onChange={(newState) => handlePromptChange(index, newState)}
                                hideTitle={true}
                                hideActions={true}
                            />
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Button variant='outlined' onClick={handleAddPrompt} startIcon={<AddCircleOutlineIcon />}>
                    Add Prompt
                </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button variant='outlined' color='secondary' onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleSaveDraft}
                    startIcon={<SaveIcon />}
                    disabled={!isFlowInfoValid}
                >
                    Save as Draft
                </Button>
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    startIcon={<SendIcon />}
                    disabled={!canSubmit}
                >
                    Prompt Survey
                </Button>
            </Box>
        </Box>
    );
}
