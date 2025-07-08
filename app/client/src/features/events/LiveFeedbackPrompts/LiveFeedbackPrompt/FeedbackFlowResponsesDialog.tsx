import * as React from 'react';
import {
    Typography,
    Grid,
    DialogContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { StyledDialogTitle, StyledDialog } from '@local/components';
import { PreloadedLiveFeedbackPromptResponseList } from '../LiveFeedbackPromptResponses/LiveFeedbackPromptResponseList';
import type { Flow, Prompt as IndividualPromptType } from './LiveFeedbackPromptList';
import GenerateViewpoints from './GenerateViewpoints';
import ViewpointsList from './ViewpointsList';
import { ShareFeedbackPromptResults } from '../LiveFeedbackPromptResponses';

export type SummarizedViewpoints = {
    viewpoints: string[];
    voteViewpoints: Record<string, string[]>;
};

interface FeedbackFlowResponsesDialogProps {
    open: boolean;
    handleClose: () => void;
    selectedFlow: Flow | null;
}

export default function FeedbackFlowResponsesDialog({
    open,
    handleClose,
    selectedFlow,
}: FeedbackFlowResponsesDialogProps) {
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
    const [expandedAccordion, setExpandedAccordion] = React.useState<string | false>(false);
    const [promptViewpoints, setPromptViewpoints] = React.useState<SummarizedViewpoints[]>(
        selectedFlow?.prompts.map(({ prompt }) => ({
            viewpoints: prompt.viewpoints ? [...prompt.viewpoints] : [],
            voteViewpoints: prompt.voteViewpoints || {},
        })) || []
    );

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedAccordion(isExpanded ? panel : false);
    };

    // TODO: Add the number of respondents to the flow info
    const FlowInfo = React.useCallback(() => {
        if (!selectedFlow) return null;
        return (
            <Box sx={{ mb: 3, p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                <Typography variant='h5' gutterBottom>
                    {selectedFlow.flowName}
                </Typography>
                {selectedFlow.flowDescription && (
                    <Typography variant='body1' color='textSecondary'>
                        {selectedFlow.flowDescription}
                    </Typography>
                )}
            </Box>
        );
    }, [selectedFlow, theme.palette.divider]);

    if (!selectedFlow) return null; // Don't render if no flow is selected

    return (
        <StyledDialog
            fullScreen={fullscreen}
            maxWidth='lg'
            fullWidth={true}
            scroll='paper'
            open={open}
            onClose={handleClose}
            aria-labelledby='feedback-flow-responses-dialog'
            PaperProps={{
                sx: {
                    height: fullscreen ? '100%' : '90vh',
                },
            }}
        >
            <StyledDialogTitle id='feedback-flow-responses-dialog-title' onClose={handleClose}>
                Survey Responses
            </StyledDialogTitle>
            <DialogContent dividers>
                <FlowInfo />
                <Grid container direction='column' spacing={1}>
                    {selectedFlow.prompts.length > 0 ? (
                        selectedFlow.prompts.map((flowPromptItem, index) => {
                            const individualPrompt: IndividualPromptType = flowPromptItem.prompt;
                            const panelId = `panel${index}-${individualPrompt.id}`;

                            return (
                                <Grid item xs={12} key={individualPrompt.id}>
                                    <Accordion
                                        expanded={expandedAccordion === panelId}
                                        onChange={handleAccordionChange(panelId)}
                                        sx={{
                                            '&:before': { display: 'none' },
                                        }}
                                        elevation={expandedAccordion === panelId ? 3 : 1}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`${panelId}-content`}
                                            id={`${panelId}-header`}
                                        >
                                            <Typography sx={{ flexShrink: 0, fontWeight: 'medium' }}>
                                                {`Prompt #${flowPromptItem.order + 1}:`}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: 'text.secondary',
                                                    flexGrow: 1,
                                                    wordBreak: 'break-word',
                                                    paddingLeft: 1,
                                                }}
                                            >
                                                {individualPrompt.prompt}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            sx={{ backgroundColor: theme.palette.action.hover, padding: 0 }}
                                        >
                                            <Grid container justifyContent='center'>
                                                <Stack direction='row' spacing={2}>
                                                    <GenerateViewpoints
                                                        promptId={individualPrompt.id}
                                                        setSelectedPrompt={() => {}}
                                                        updateViewpoints={(viewpoints, voteViewpoints) => {
                                                            setPromptViewpoints((prev) => {
                                                                const updatedViewpoints = [...prev];
                                                                updatedViewpoints[index] = {
                                                                    viewpoints,
                                                                    voteViewpoints,
                                                                };
                                                                return updatedViewpoints;
                                                            });
                                                        }}
                                                    />
                                                    <ShareFeedbackPromptResults prompt={individualPrompt} />
                                                </Stack>
                                            </Grid>
                                            <Box sx={{ p: 1 }}>
                                                <ViewpointsList
                                                    prompt={individualPrompt}
                                                    vote={'default'}
                                                    summarizedViewpoints={promptViewpoints[index]}
                                                />
                                            </Box>
                                            <Box sx={{ p: 1 }}>
                                                <PreloadedLiveFeedbackPromptResponseList
                                                    prompt={individualPrompt}
                                                    vote={'default'}
                                                    isFlow={true}
                                                />
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            );
                        })
                    ) : (
                        <Typography sx={{ textAlign: 'center', mt: 2 }}>Survey has no prompts.</Typography>
                    )}
                </Grid>
            </DialogContent>
        </StyledDialog>
    );
}
