import { GeminiIcon } from '@local/components/icons';
import { Chip, Divider, Typography } from '@mui/material';
import React from 'react';
import { SummarizedViewpoints } from './FeedbackFlowResponsesDialog';
import { Prompt } from './LiveFeedbackPromptList';

const StyledViewpoint = ({ viewpoint }: { viewpoint: string }) => {
    // Gradient from purple to blue
    const gradient = 'linear-gradient(to right bottom, #9c27b0, #2979ff)';
    return (
        <Chip
            variant='outlined'
            label={viewpoint}
            sx={{
                marginBottom: '0.25rem',
                color: 'white',
                backgroundImage: gradient,
            }}
        />
    );
};

interface ViewpointListProps {
    prompt: Prompt;
    vote: string;
    summarizedViewpoints?: SummarizedViewpoints;
}

export default function ViewpointsList({ prompt, vote, summarizedViewpoints }: ViewpointListProps) {
    const { viewpoints: promptViewpoints, voteViewpoints: promptVoteViewpoints, isOpenEnded } = prompt;

    const viewpoints = summarizedViewpoints?.viewpoints || promptViewpoints;
    const voteViewpoints = summarizedViewpoints?.voteViewpoints || promptVoteViewpoints;

    const viewpointsGenerated = React.useMemo(() => {
        // Check if viewpoints have been generated for the prompt responses
        if (viewpoints && viewpoints.length > 0) return true;
        if (!voteViewpoints) return false;
        let count = 0;
        Object.keys(voteViewpoints).forEach((key) => {
            count += voteViewpoints[key].length;
        });
        return count > 0;
    }, [viewpoints, voteViewpoints]);

    if (!viewpoints || vote === '' || !voteViewpoints) return null;

    return (
        <React.Fragment>
            <Typography variant='h4'>
                Summarized Viewpoints <GeminiIcon />
            </Typography>
            <Divider sx={{ width: '100%', marginBottom: '0.5rem' }} />
            {!viewpointsGenerated ? <Typography>No viewpoints generated yet</Typography> : null}
            {!isOpenEnded && vote === 'default' ? (
                Object.keys(voteViewpoints).map((_vote, index) => (
                    <React.Fragment key={index}>
                        <Typography variant='h6'>{_vote}</Typography>
                        {voteViewpoints[_vote].map((viewpoint, _index) => (
                            <div key={`${_vote}:${_index}`}>
                                <StyledViewpoint viewpoint={viewpoint} />
                            </div>
                        ))}
                    </React.Fragment>
                ))
            ) : (
                <React.Fragment />
            )}
            {!isOpenEnded && voteViewpoints[vote] ? (
                <React.Fragment>
                    <Typography variant='h6'>{vote}</Typography>
                    {voteViewpoints[vote].map((viewpoint, index) => (
                        <div key={index}>
                            <StyledViewpoint viewpoint={viewpoint} />
                        </div>
                    ))}
                </React.Fragment>
            ) : (
                <React.Fragment />
            )}
            {isOpenEnded ? (
                viewpoints.map((viewpoint, index) => (
                    <div key={index}>
                        <StyledViewpoint viewpoint={viewpoint} />
                    </div>
                ))
            ) : (
                <React.Fragment />
            )}
        </React.Fragment>
    );
}
