import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    IconButton,
    Grid,
    Slide,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';

import useSocketio from 'hooks/useSocketio';
import ListFilter from 'components/ListFilter';
import { formatDate, pluralize } from 'utils/format';
import { Question } from '../types';
import {
    search,
    applyFilters,
    QuestionFilterFunc,
    filters as filterFuncs,
    Filters,
} from './utils';

const useStyles = makeStyles((theme) => ({
    notify: {
        backgroundColor: theme.palette.background.default,
        position: 'fixed',
        width: '100%',
        top: 0,
        padding: theme.spacing(1),
        zIndex: 1,
    },
}));

interface NewQuestionAction {
    type: 'new-question';
    payload: Question;
}
interface UpdateQuestionAction {
    type: 'update-question';
    payload: Pick<Question, 'question' | '_id'>;
}
interface DeleteQuestionAction {
    type: 'hide-question';
    payload: Pick<Question, '_id'>;
}

type Actions = NewQuestionAction | UpdateQuestionAction | DeleteQuestionAction;

function questionReducer(state: Question[], action: Actions) {
    switch (action.type) {
        case 'new-question':
            return [action.payload, ...state];
        case 'update-question':
            return state.map((question) => {
                if (question._id === action.payload._id) {
                    return { ...question, ...action.payload };
                }
                return question;
            });
        case 'hide-question':
            return state.filter(
                (question) => question._id !== action.payload._id
            );
        default:
            return state;
    }
}

export default function QuestionQueue() {
    const classes = useStyles();
    const topRef = React.useRef<HTMLDivElement | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, dispatch, socket] = useSocketio<Question[], Actions>({
        url: '/moderator/questions',
        event: 'townhall-question-state',
        reducer: questionReducer,
        initialState: [],
    });
    const [questions, setQuestions] = React.useState<Question[]>([]);
    const [count, setCount] = React.useState(0);
    const [filters, setFilters] = React.useState([(q: Question[]) => q]);

    React.useEffect(() => {
        setCount(state.length - questions.length);
    }, [state, questions.length]);

    function refresh() {
        setQuestions(state);
        setCount(0);
        topRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const RefreshBar = () => (
        <Grid
            container
            justify='space-between'
            alignContent='center'
            alignItems='center'
        >
            <Grid item xs='auto'>
                <Typography>
                    {`${count} New ${pluralize(count, 'Question')}!`}
                </Typography>
            </Grid>
            <Grid item xs='auto'>
                <IconButton onClick={refresh}>
                    <RefreshIcon />
                </IconButton>
            </Grid>
        </Grid>
    );

    const filterOptions: Array<keyof Filters> = ['asked'];

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Slide in={Boolean(count)} direction='down'>
                <div className={classes.notify}>
                    <RefreshBar />
                </div>
            </Slide>
            <div ref={topRef} />
            <ListFilter
                onFilter={(filterSet) => {
                    // TODO: optimize typings
                    const filterArr: Array<keyof Filters> = Array.from(
                        filterSet as Set<keyof Filters>
                    );
                    const newState: QuestionFilterFunc[] = filterArr.map(
                        (key) => filterFuncs[key]
                    );
                    setFilters(([prevSearch]) => [prevSearch, ...newState]);
                }}
                onSearch={(text) =>
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    setFilters(([_prevSearch, ...otherFilters]) => [
                        (filteredList) => search(text, filteredList),
                        ...otherFilters,
                    ])
                }
                filterOptions={filterOptions}
            />
            <Grid container>
                <Grid container item xs={12} justify='center'>
                    <List>
                        {applyFilters(questions, filters).map(
                            ({ question, _id, meta }) => (
                                <ListItem button dense key={_id}>
                                    <ListItemText
                                        primary={question}
                                        secondary={`${
                                            meta.user.name
                                        } - ${formatDate(
                                            new Date(meta.timestamp),
                                            'Pp'
                                        )}`}
                                    />
                                </ListItem>
                            )
                        )}
                    </List>
                </Grid>
            </Grid>
        </div>
    );
}
