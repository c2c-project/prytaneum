import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import CurrQuestionlabel from '../CurrQuestionLabel';

import { Props as QuestionProps } from '../QuestionCard';

interface CurrentQuestionProps {
    children: React.ReactElement<QuestionProps>;
    className?: string;
}

export function CurrentQuestion({ children, className }: CurrentQuestionProps) {
    return (
        <Grid container className={className}>
            <Grid item xs={12}>
                <CurrQuestionlabel />
            </Grid>
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    );
}

CurrentQuestion.defaultProps = {
    className: undefined,
};

CurrentQuestion.propTypes = {
    className: PropTypes.string,
};

export function EmptyMessage() {
    return (
        <>
            <Typography variant='h5' paragraph align='center'>
                Nothing to display here :(
            </Typography>
            <Typography variant='body1' align='center'>
                Click or tap the button above to start asking questions!
            </Typography>
        </>
    );
}

export function RefreshMessage() {
    return (
        <>
            <Typography variant='body1' align='center'>
                Click the Refresh button above!
            </Typography>
        </>
    );
}
