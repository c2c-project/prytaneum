import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PushPinIcon from '@material-ui/icons/PushPin';

interface CurrentQuestionProps {
    className?: string;
}

const useStyles = makeStyles((theme) => ({
    currentQuestion: {
        zIndex: 2,
        boxShadow: theme.shadows[3],
        borderRadius: theme.shape.borderRadius,
        marginBottom: -theme.spacing(1.5),
        backgroundColor: theme.palette.secondary.light,
        padding: theme.spacing(0, 1),
        maxHeight: 32, // size of chip from MUI spec on material.io
    },
    text: {
        color: theme.palette.secondary.contrastText,
    },
}));

export default function CurrentQuestion({ className }: CurrentQuestionProps) {
    const classes = useStyles();
    return (
        <Grid container justify='center' className={className}>
            <div className={classes.currentQuestion}>
                <Grid container justify='center' alignItems='center'>
                    <PushPinIcon fontSize='small' className={classes.text} />
                    <Typography
                        variant='overline'
                        classes={{ root: classes.text }}
                    >
                        Current Question
                    </Typography>
                </Grid>
            </div>
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
