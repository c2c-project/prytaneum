import React from 'react';
import { makeStyles, Grid, Badge, Typography } from '@material-ui/core';

import type { Question } from 'prytaneum-typings';
import LikeIcon from '@material-ui/icons/ThumbUp';

interface Props {
    question: Question;
}

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(1.5),
    },
}));

function QuestionStats({ question }: Props) {
    const classes = useStyles();

    return (
        <Grid container alignItems='center' alignContent='center'>
            <Grid item xs={12} className={classes.title}>
                <Typography variant='overline'>Info</Typography>
            </Grid>

            <Grid item xs='auto'>
                <Badge showZero badgeContent={question.likes.length}>
                    <LikeIcon color='disabled' />
                </Badge>
            </Grid>
        </Grid>
    );
}

export default React.memo(QuestionStats);
