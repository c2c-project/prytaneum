import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

import useSocketio from 'hooks/useSocketio';

interface Question {
    _id: string;
    user: {
        _id: string;
        name: string;
    };
    question: string;
}

type PayloadBase = { _id: string };

interface NewQuestionAction {
    type: 'new-question';
    payload: PayloadBase & Question;
}
interface UpdateQuestionAction {
    type: 'update-question';
    payload: PayloadBase & Pick<Question, 'question'>;
}
interface DeleteQuestionAction {
    type: 'hide-question';
    payload: PayloadBase;
}

type Actions = NewQuestionAction | UpdateQuestionAction | DeleteQuestionAction;

function questionReducer(state: Question[], action: Actions) {
    switch (action.type) {
        case 'new-question':
            return [...state, action.payload];
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
    const [state, dispatch, socket] = useSocketio<Question[], Actions>({
        url: '/moderator/questions',
        event: 'townhall-question-state',
        reducer: questionReducer,
        initialState: [],
    });
    const [questions, setQuestions] = React.useState<Question[]>([]);
    return (
        <div>
            <List>
                {questions.map(({ question, _id }) => (
                    <ListItem dense key={_id}>
                        <ListItemText primary={question} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
