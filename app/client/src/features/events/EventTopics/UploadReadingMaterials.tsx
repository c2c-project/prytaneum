import React from 'react';
import { graphql, useMutation } from 'react-relay';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Grid,
    Tooltip,
    Stack,
} from '@mui/material';

import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import { useResponsiveDialog } from '@local/components';
import { LoadingButton } from '@local/components/LoadingButton';
import { EVENT_READING_MATERIALS_MAX_LENGTH } from '@local/utils/rules';
import { UploadReadingMaterialsMutation } from '@local/__generated__/UploadReadingMaterialsMutation.graphql';
import { Topic } from './types';

const UPLOAD_READING_MATERIALS = graphql`
    mutation UploadReadingMaterialsMutation($eventId: String!, $material: String!) {
        generateEventTopics(eventId: $eventId, material: $material) {
            body {
                topic
                description
            }
            isError
            message
        }
    }
`;

interface Props {
    onSuccess: () => void;
    setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

export function UploadReadingMaterials({ onSuccess, setTopics }: Props) {
    const { displaySnack } = useSnack();
    const { eventId } = useEvent();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isOpen, openDialog, closeDialog] = useResponsiveDialog();
    const [readingMaterials, setReadingMaterials] = React.useState<string>('');
    const [commit] = useMutation<UploadReadingMaterialsMutation>(UPLOAD_READING_MATERIALS);

    const handleUpload = () => {
        setIsLoading(true);
        commit({
            variables: { eventId, material: readingMaterials },
            onCompleted: (response) => {
                try {
                    if (!response.generateEventTopics)
                        throw new Error('An error occurred while uploading reading materials.');
                    if (response.generateEventTopics.isError) throw new Error(response.generateEventTopics.message);
                    if (!response.generateEventTopics.body || response.generateEventTopics.body.length === 0)
                        throw new Error('No topics were returned, please try again with more materials.');
                    const topics = response.generateEventTopics.body as Topic[];
                    setTopics(topics);
                    displaySnack('Reading materials uploaded successfully', { variant: 'success' });
                    setReadingMaterials('');
                    setIsLoading(false);
                    onSuccess();
                    closeDialog();
                } catch (error) {
                    if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
                    else displaySnack('An error occurred while uploading reading materials', { variant: 'error' });
                    setIsLoading(false);
                }
            },
            onError: (error) => {
                displaySnack(error.message, { variant: 'error' });
                setIsLoading(false);
            },
        });
    };

    const errorMessage = React.useMemo(() => {
        if (readingMaterials.length > EVENT_READING_MATERIALS_MAX_LENGTH) return 'Reading materials is too long.';
        if (!readingMaterials) return 'Reading materials is required.';
        return '';
    }, [readingMaterials]);

    React.useEffect(() => {
        return setReadingMaterials('');
    }, []);

    // Add description for this step
    return (
        <React.Fragment>
            <Button variant='contained' onClick={openDialog}>
                Input Background Materials
            </Button>
            <Dialog open={isOpen} maxWidth='lg' fullWidth>
                <DialogTitle>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        Input Background Materials
                        <Tooltip title='Using Google Gemini'>
                            <img src='/static/google-gemini-icon.svg' alt='Gemini Logo' width='25px' height='25px' />
                        </Tooltip>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <Grid container justifyContent='center'>
                        <Typography variant='body2' color='textSecondary'>
                            Input any text materials related to your event here to generate a list of topics.
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>
                            Please use a substantual amount of text to generate a good list of topics. Too little text
                            will result in no topics generated.
                        </Typography>
                    </Grid>
                    <TextField
                        autoFocus
                        margin='dense'
                        multiline
                        minRows={10}
                        required
                        id='reading-materials'
                        label='Reading Materials'
                        type='text'
                        helperText={errorMessage}
                        error={Boolean(errorMessage)}
                        value={readingMaterials}
                        onChange={(e) => setReadingMaterials(e.target.value)}
                        fullWidth
                    />
                    <Typography
                        variant='body2'
                        color={readingMaterials.length > EVENT_READING_MATERIALS_MAX_LENGTH ? 'error' : 'inherit'}
                        sx={{ display: 'block', textAlign: 'right' }}
                    >
                        {readingMaterials.length}/{EVENT_READING_MATERIALS_MAX_LENGTH}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button color='inherit' onClick={closeDialog}>
                        Cancel
                    </Button>
                    <LoadingButton
                        loading={isLoading}
                        color='primary'
                        disabled={Boolean(errorMessage) || isLoading}
                        onClick={handleUpload}
                    >
                        Upload
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
