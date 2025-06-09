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

// Assuming LiveFeedbackPromptForm is adjusted to accept these props:
// - initialState: TLiveFeedbackPromptFormState
// - onChange: (newState: TLiveFeedbackPromptFormState) => void
// - hideActions: boolean
import { LiveFeedbackPromptForm, TLiveFeedbackPromptFormState } from '../LiveFeedbackPrompt/LiveFeedbackPromptForm';
import { STARTING_CHOICE_AMOUNT } from '@local/utils/rules'; // Assuming this is accessible

// Define the structure for the entire flow data
export interface TLiveFeedbackFlowFormData {
    name: string;
    description: string;
    prompts: TLiveFeedbackPromptFormState[];
}

// Define the props for the Flow Form
export interface LiveFeedbackFlowFormProps {
    onSubmit: (flowData: TLiveFeedbackFlowFormData) => void;
    onCancel: () => void;
    onSaveDraft: (flowData: TLiveFeedbackFlowFormData) => void;
    initialState?: Partial<TLiveFeedbackFlowFormData>; // For potential editing functionality later
}

// Default state for a new prompt
const createDefaultPromptState = (): TLiveFeedbackPromptFormState => ({
    prompt: '',
    feedbackType: 'open-ended', // Default type
    choices: new Array(STARTING_CHOICE_AMOUNT).fill('', 0, STARTING_CHOICE_AMOUNT),
    reasoningType: 'optional', // Default reasoning
});

export function LiveFeedbackFlowForm({ onSubmit, onCancel, onSaveDraft, initialState }: LiveFeedbackFlowFormProps) {
    // State for flow name and description
    const [flowName, setFlowName] = React.useState<string>(initialState?.name ?? '');
    const [flowDescription, setFlowDescription] = React.useState<string>(initialState?.description ?? '');

    // State for the list of prompts within the flow
    const [prompts, setPrompts] = React.useState<TLiveFeedbackPromptFormState[]>(
        initialState?.prompts ?? [createDefaultPromptState()] // Start with one default prompt if no initial state
    );

    // --- Handlers ---

    const handleFlowNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFlowName(event.target.value);
    };

    const handleFlowDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFlowDescription(event.target.value);
    };

    // Add a new prompt with default values to the list
    const handleAddPrompt = () => {
        setPrompts([...prompts, createDefaultPromptState()]);
    };

    // Remove a prompt from the list by its index
    const handleRemovePrompt = (indexToRemove: number) => () => {
        // Prevent removing the last prompt
        if (prompts.length <= 1) {
            // Optionally, show a snackbar message here
            console.warn('Cannot remove the last prompt.');
            return;
        }
        setPrompts(prompts.filter((_, index) => index !== indexToRemove));
    };

    // Update the state of a specific prompt when its form changes
    const handlePromptChange = (indexToUpdate: number, newState: TLiveFeedbackPromptFormState) => {
        const updatedPrompts = prompts.map((prompt, index) => (index === indexToUpdate ? newState : prompt));
        setPrompts(updatedPrompts);
    };

    // --- Submission Logic ---

    // Prepare the final data structure
    const getFlowData = (): TLiveFeedbackFlowFormData => ({
        name: flowName,
        description: flowDescription,
        prompts: prompts,
    });

    // Handle the final submission (Prompt button)
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(getFlowData());
    };

    // Handle saving as a draft
    const handleSaveDraft = () => {
        onSaveDraft(getFlowData());
    };

    // --- Validation (Basic) ---
    // Check if flow name and description are filled
    const isFlowInfoValid = flowName.length > 0 && flowDescription.length > 0;
    // Check if all prompts are individually valid (requires validation logic within LiveFeedbackPromptForm or here)
    // For now, we'll assume basic validity is enough (e.g., prompt text exists)
    const arePromptsValid = prompts.every((p) => p.prompt.length > 0); // Simplified check
    const canSubmit = isFlowInfoValid && arePromptsValid;

    return (
        <Box component='form' onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Typography variant='h5' gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                Create Feedback Flow
            </Typography>

            {/* Flow Name and Description Fields */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                    <TextField
                        id='flow-name'
                        label='Flow Name'
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
                        label='Flow Description'
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

            {/* Prompts Accordions */}

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
                                {prompts.length > 1 && ( // Only show delete if more than one prompt exists
                                    <IconButton
                                        aria-label='delete prompt'
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent accordion toggle
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
                                // initialState={promptState}
                                onChange={(newState) => handlePromptChange(index, newState)}
                                hideTitle={true}
                                hideActions={true}
                            />
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

            {/* Add Prompt Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Button variant='outlined' onClick={handleAddPrompt} startIcon={<AddCircleOutlineIcon />}>
                    Add Prompt
                </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Form Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button variant='outlined' color='secondary' onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleSaveDraft}
                    startIcon={<SaveIcon />}
                    disabled={!isFlowInfoValid} // Can save draft even if prompts aren't perfect
                >
                    Save as Draft
                </Button>
                <Button
                    type='submit' // Triggers the form's onSubmit
                    variant='contained'
                    color='primary'
                    startIcon={<SendIcon />}
                    disabled={!canSubmit} // Enable only when basic validation passes
                >
                    Prompt Flow
                </Button>
            </Box>
        </Box>
    );
}
