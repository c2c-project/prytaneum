import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useQuestions from '../hooks/useQuestions';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    },
    item: {
        padding: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px 0`
    }
}));

export default function CurrentQuestion({ roomId }) {
    const classes = useStyles();
    // eslint-disable-next-line
    const [questions, sendQuestion, currentQuestion] = useQuestions(roomId);
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} className={classes.item}>
                    <Typography align='center' variant='h5'>
                        Upcoming Question
                    </Typography>
                    <Divider />
                </Grid>
                {currentQuestion ? (
                    <>
                        <Grid item xs={12} className={classes.item}>
                            <Typography variant='body2'>
                                {currentQuestion.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.item}>
                            <Typography align='right' variant='body1'>
                                {`- ${currentQuestion.username}`}
                            </Typography>
                        </Grid>
                    </>
                ) : (
                    <Grid item xs={12} className={classes.item}>
                        <Typography varaint='body2'>
                            No question to display.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

CurrentQuestion.propTypes = {
    roomId: PropTypes.string.isRequired
};
