import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import PushPinIcon from '@material-ui/icons/PushPin';

import { QuestionProps } from '../QuestionFeedItem';

interface CurrentQuestionProps {
    children: React.ReactElement<QuestionProps>;
    className?: string;
}

export function CurrentQuestion({ children, className }: CurrentQuestionProps) {
    const theme = useTheme();
    return (
        <Grid container className={className}>
            <Grid
                item
                xs={12}
                container
                justify='center'
                alignItems='center'
                style={{
                    backgroundColor: theme.palette.secondary.light,
                    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
                }}
            >
                <PushPinIcon
                    fontSize='small'
                    style={{ color: theme.palette.secondary.contrastText }}
                />
                <Typography
                    variant='overline'
                    style={{ color: theme.palette.secondary.contrastText }}
                >
                    Current Question
                </Typography>
            </Grid>
            {children}
        </Grid>
    );
}

CurrentQuestion.defaultProps = {
    className: undefined,
};

CurrentQuestion.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
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
