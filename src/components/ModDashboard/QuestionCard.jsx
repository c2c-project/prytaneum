import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useDrag } from 'react-dnd';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        cursor: 'grab'
    }
}));

export default function QuestionCards({ id, question, user }) {
    const [, drag] = useDrag({
        item: { type: 'QUESTIONS', id }
    });
    const classes = useStyles();
    return (
        <Paper ref={drag} className={classes.paper}>
            <Typography>{question}</Typography>
        </Paper>
    );
}

QuestionCards.propTypes = {
    id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired
};
