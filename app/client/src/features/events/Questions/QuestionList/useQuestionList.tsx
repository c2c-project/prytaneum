import * as React from 'react';

import { EventQuestion, useQuestionsQuery, useNewQuestionsSubscription } from '@local/graphql-types';
import { useEvent } from '@local/hooks';

const initialState = {
    isPaused: false,
    buffer: [] as EventQuestion[],
    questionList: [] as EventQuestion[],
};

type Action =
    | { type: 'togglePause'; payload?: never }
    | { type: 'addToBuffer'; payload: EventQuestion }
    | { type: 'flushBuffer'; payload?: never }
    | { type: 'initQuestionList'; payload: EventQuestion[] };

function reducer(state: typeof initialState, action: Action): typeof initialState {
    switch (action.type) {
        case 'togglePause':
            return { ...state, isPaused: !state.isPaused };
        case 'flushBuffer':
            if (state.isPaused || state.buffer.length === 0) return state;
            return { ...state, buffer: [], questionList: [...state.buffer, ...state.questionList] };
        case 'addToBuffer':
            return { ...state, buffer: [action.payload, ...state.buffer] };
        case 'initQuestionList':
            return { ...state, questionList: action.payload };
        default:
            return state;
    }
}

export function useQuestionList() {
    const [{ id }, isModerator] = useEvent();
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const { loading: isLoading } = useQuestionsQuery({
        variables: { id },
        onCompleted(results) {
            if (results.questionsByid) dispatch({ type: 'initQuestionList', payload: results.questionsByid });
        },
    });

    useNewQuestionsSubscription({
        variables: { id },
        onSubscriptionData({ subscriptionData }) {
            const { data } = subscriptionData;
            if (data && data.eventQuestionCreated)
                dispatch({ type: 'addToBuffer', payload: data.eventQuestionCreated });
        },
    });

    React.useEffect(() => {
        let isMounted = true;
        const handle = setInterval(() => {
            if (!isMounted) return;
            dispatch({ type: 'flushBuffer' });
        }, 1500);
        return () => {
            isMounted = false;
            clearInterval(handle);
        };
    }, [dispatch]);

    return { ...state, dispatch, isLoading, isModerator };
}
