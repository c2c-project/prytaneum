import { Chip, Divider, Typography } from '@mui/material';
import React from 'react';

interface Props {
    viewpoints: readonly string[] | null;
}

export default function ViewpointsList({ viewpoints }: Props) {
    if (!viewpoints) return null;
    return (
        <React.Fragment>
            <Typography variant='h4'>Viewpoints</Typography>
            <Divider sx={{ width: '100%', marginBottom: '0.5rem' }} />
            {viewpoints.length === 0 ? <Typography>No viewpoints generated yet</Typography> : null}
            {viewpoints.map((viewpoint, index) => (
                <div key={index}>
                    <Chip label={viewpoint} sx={{ marginBottom: '0.25rem' }} />
                </div>
            ))}
        </React.Fragment>
    );
}
