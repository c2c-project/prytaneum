import { Chip, Divider, Typography } from '@mui/material';
import React from 'react';
import { Prompt } from './LiveFeedbackPromptList';

interface Props {
    prompt: Prompt;
    vote: string;
}

export default function ViewpointsList({ prompt, vote }: Props) {
    const { viewpoints, voteViewpoints, isOpenEnded } = prompt;
    if (!viewpoints || vote === '' || !voteViewpoints) return null;

    return (
        <React.Fragment>
            <Typography variant='h4'>Viewpoints</Typography>
            <Divider sx={{ width: '100%', marginBottom: '0.5rem' }} />
            {viewpoints.length === 0 ? <Typography>No viewpoints generated yet</Typography> : null}
            {!isOpenEnded && vote === 'default' ? (
                Object.keys(voteViewpoints).map((_vote, index) => (
                    <React.Fragment key={index}>
                        <Typography variant='h6'>{_vote}</Typography>
                        {voteViewpoints[_vote].map((viewpoint, _index) => (
                            <div key={_index}>
                                <Chip label={viewpoint} sx={{ marginBottom: '0.25rem' }} />
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
                            <Chip label={viewpoint} sx={{ marginBottom: '0.25rem' }} />
                        </div>
                    ))}
                </React.Fragment>
            ) : (
                <React.Fragment />
            )}
            {isOpenEnded ? (
                viewpoints.map((viewpoint, index) => (
                    <div key={index}>
                        <Chip label={viewpoint} sx={{ marginBottom: '0.25rem' }} />
                    </div>
                ))
            ) : (
                <React.Fragment />
            )}
        </React.Fragment>
    );
}
