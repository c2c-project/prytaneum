import React from 'react';
import { IconButton, Grid, Paper, Badge, Collapse } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';

import useSocketio from 'hooks/useSocketio';
import ListFilter from 'components/ListFilter';
import { Question as QuestionType } from '../types';
import { search, applyFilters, filters as filterFuncs } from './utils';
import { CurrentQuestion, Question, UserBar } from './components';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
    },
}));

interface NewQuestionAction {
    type: 'new-question';
    payload: QuestionType;
}
interface UpdateQuestionAction {
    type: 'update-question';
    payload: Pick<QuestionType, 'question' | '_id'>;
}
interface DeleteQuestionAction {
    type: 'hide-question';
    payload: Pick<QuestionType, '_id'>;
}

type Actions = NewQuestionAction | UpdateQuestionAction | DeleteQuestionAction;

function questionReducer(state: QuestionType[], action: Actions) {
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

export default function QuestionFeed() {
    const classes = useStyles();
    // const topRef = React.useRef<HTMLDivElement | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, dispatch, socket] = useSocketio<QuestionType[], Actions>({
        url: '/moderator/questions',
        event: 'townhall-question-state',
        reducer: questionReducer,
        initialState: [],
    });
    const [questions, setQuestions] = React.useState<QuestionType[]>([]);
    const [count, setCount] = React.useState(0);
    const [filters, setFilters] = React.useState([(q: QuestionType[]) => q]);
    const filteredList = React.useMemo(() => applyFilters(questions, filters), [
        questions,
        filters,
    ]);

    React.useEffect(() => {
        setCount(state.length - questions.length);
    }, [state, questions.length]);

    function refresh() {
        setQuestions(state);
        setCount(0);
        // topRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
    const currentQuestion = questions.find((q) => q.state === 'CURRENT');
    return (
        <div className={classes.root}>
            {/* <div ref={topRef} /> */}
            <ListFilter
                filterMap={filterFuncs}
                onFilterChange={(newFilters) =>
                    setFilters(([prevSearch]) => [prevSearch, ...newFilters])
                }
                onSearch={(text) =>
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    setFilters(([_prevSearch, ...otherFilters]) => [
                        (filteredQuestions) => search(text, filteredQuestions),
                        ...otherFilters,
                    ])
                }
                length={filteredList.length}
                menuIcons={[
                    <IconButton
                        onClick={refresh}
                        color='inherit'
                        disabled={count === 0}
                    >
                        <Badge badgeContent={count} color='secondary'>
                            <RefreshIcon />
                        </Badge>
                    </IconButton>,
                ]}
            />
            <Grid container>
                <Grid container item xs={12} justify='center'>
                    <Collapse
                        key={currentQuestion?._id}
                        in={Boolean(currentQuestion)}
                    >
                        {currentQuestion && (
                            <CurrentQuestion>
                                <Question
                                    user={currentQuestion.meta.user.name}
                                    timestamp={currentQuestion.meta.timestamp}
                                    actionBar={<div />}
                                >
                                    {currentQuestion.question}
                                </Question>
                            </CurrentQuestion>
                        )}
                    </Collapse>
                    {applyFilters(questions, filters).map(
                        ({ question, _id, meta }) => (
                            <Question
                                key={_id}
                                user={meta.user.name}
                                timestamp={meta.timestamp}
                                divider
                                actionBar={<UserBar />}
                            >
                                {question}
                            </Question>
                        )
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
