import React from 'react';
import type { Question as QuestionType } from 'prytaneum-typings';

import useSocketio from 'hooks/useSocketio';
import useEndpoint from 'hooks/useEndpoint';

import { getQuestions } from '../api';
import { questionReducer } from './utils';

export default function useQuestionFeed(
    townhallId: string
): [QuestionType[], QuestionType[], () => void, boolean] {
    const [questions, setQuestions] = React.useState<QuestionType[]>([]);
    const endpoint = () => getQuestions(townhallId);
    const [, isLoading] = useEndpoint(endpoint, {
        onSuccess: ({ data }) => {
            setQuestions(data);
        },
        runOnFirstRender: true,
    });

    const [buffer, dispatch] = React.useReducer(questionReducer, []);
    useSocketio(
        '/questions',
        { query: { townhallId } },
        (socket) => {
            socket.on('question-state', dispatch);
        },
        [dispatch]
    );

    const flushBuffer = () => {
        setQuestions((prevQuestions) => [...prevQuestions, ...buffer]);
        dispatch({ type: 'flush', payload: [] });
    };

    return [questions, buffer, flushBuffer, isLoading];
}
