import React from 'react';
import { Grid, Chip } from '@material-ui/core';

interface QuestionLabelProps {
    labels: string[];
}

function QuestionLabels({ labels }: QuestionLabelProps) {
    return (
        <Grid container spacing={1}>
            {labels.map((label) => (
                <Grid item xs='auto' key={label}>
                    <Chip label={label} />
                </Grid>
            ))}
        </Grid>
    );
}

export default React.memo(QuestionLabels);
