import React from 'react';
import type { Question as QuestionType } from 'prytaneum-typings';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

import useSocketio, { SocketFn } from 'hooks/useSocketio';
import useEndpoint from 'hooks/useEndpoint';
import { QuestionActions } from 'reducers';

import { getQuestions } from '../api';

export default function useQuestionFeed(townhallId: string): [QuestionType[], QuestionType[], () => void, boolean] {
    const dispatch = useDispatch<Dispatch<QuestionActions>>();
    const { list, buffer } = useSelector((state) => state.questions);
    const endpoint = () => getQuestions(townhallId);
    const [, isLoading] = useEndpoint(endpoint, {
        onSuccess: ({ data }) => {
            dispatch({ type: 'initial-state', payload: data });
        },
        runOnFirstRender: true,
        minWaitTime: 0,
    });

    // const [buffer, dispatch] = React.useReducer(questionReducer, []);
    // const buffer = useSelector((state) => state.questions);

    const socketFn: SocketFn = React.useCallback((socket) => socket.on('question-state', dispatch), [dispatch]);
    useSocketio('/questions', { query: { townhallId } }, socketFn);

    const flushBuffer = () => {
        dispatch({ type: 'flush', payload: [] });
    };

    return [list, buffer, flushBuffer, isLoading];
}
