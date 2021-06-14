import * as React from 'react';
import { Grid, Badge, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LikeIcon from '@material-ui/icons/ThumbUp';

import { EventQuestion as Question } from '@local/graphql-types';

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
                <Badge showZero badgeContent={question.likes}>
                    <LikeIcon color='disabled' />
                </Badge>
            </Grid>
        </Grid>
    );
}

export default React.memo(QuestionStats);
