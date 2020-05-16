import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useDrop } from 'react-dnd';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import QuestionCard from './QuestionCard';
import useQuestions from '../../hooks/useQuestions';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    },
    title: {
        paddingBottom: theme.spacing(2)
    }
}));

const LaneTitle = ({ title, className }) => {
    return (
        <Typography className={className} variant='h4'>
            {title}
        </Typography>
    );
};

export default function Lane({ title, roomId }) {
    const [, drop] = useDrop({
        accept: 'QUESTIONS',
        drop: (item, monitor) => {
            console.log(item, monitor);
        }
    });
    const [addNewCard, setAddNewCard] = React.useState(false);
    // const [cards, setCards] = React.useState([]);
    const ref = React.useRef();
    const classes = useStyles();
    const [questions, updateQuestions] = useQuestions(roomId, title);
    React.useEffect(() => {
        if (addNewCard) {
            ref.current.focus();
        }
    }, [addNewCard]);
    return (
        <Paper ref={drop} className={classes.root}>
            <LaneTitle title={title} className={classes.title} />
            <Grid container spacing={2}>
                {questions.map(card => (
                    <Grid item xs={12} key={card}>
                        <QuestionCard question={card} />
                    </Grid>
                ))}
                {!addNewCard && (
                    <Grid item xs={12}>
                        <Button fullWidth onClick={() => setAddNewCard(true)}>
                            <AddIcon />
                            Add Card
                        </Button>
                    </Grid>
                )}
                {addNewCard && (
                    <Grid item xs={12}>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                const question = e.target.question.value;
                                setAddNewCard(false);
                                // TODO: make this an api call to add the card for everyone
                                updateQuestions(current => [...current, question]);
                            }}
                        >
                            <TextField
                                fullWidth
                                inputRef={ref}
                                id='question'
                                label='New Question'
                                autoComplete='off'
                                variant='outlined'
                            />
                            <Grid container justify='flex-end'>
                                <Button onClick={() => setAddNewCard(false)}>
                                    Cancel
                                </Button>
                                <Button type='submit'>Add</Button>
                            </Grid>
                        </form>
                    </Grid>
                )}
            </Grid>
        </Paper>
    );
}
