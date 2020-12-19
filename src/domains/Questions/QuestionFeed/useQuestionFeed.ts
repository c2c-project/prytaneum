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
    const [run, isLoading] = useEndpoint(() => getQuestions(townhallId), {
        onSuccess: ({ data }) => {
            setQuestions(data);
        },
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

    React.useEffect(run, []);

    function flushBuffer() {
        setQuestions((prevQuestions) => [...prevQuestions, ...buffer]);
        dispatch({ type: 'flush', payload: [] });
    }

    return [questions, buffer, flushBuffer, isLoading];
}
