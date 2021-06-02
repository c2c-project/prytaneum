import * as React from 'react';
import type { GraphQLSubscriptionConfig, ConnectionHandler } from 'relay-runtime';
import { useSubscription, graphql, usePreloadedQuery, PreloadedQuery } from 'react-relay';

import type {
    useQuestionListSubscriptionVariables,
    useQuestionListSubscription,
    useQuestionListSubscriptionResponse,
} from '@local/__generated__/useQuestionListSubscription.graphql';
import type { QuestionCardFragment$data } from '@local/__generated__/QuestionCardFragment.graphql';
import type {
    useQuestionListQuery,
    useQuestionListQueryResponse,
} from '@local/__generated__/useQuestionListQuery.graphql';
import { EventQuestion, useQuestionsQuery } from '@local/graphql-types';

export const USE_QUESTION_LIST_SUBSCRIPTION = graphql`
    subscription useQuestionListSubscription($eventId: ID!) {
        eventQuestionCreated(eventId: $eventId) {
            node {
                id
                ...QuestionCardFragment
            }
        }
    }
`;

export const USE_QUESTION_LIST_QUERY = graphql`
    query useQuestionListQuery($eventId: ID!) {
        questionsByEventId(eventId: $eventId) {
            id
            ...QuestionCardFragment
        }
    }
`;

const initialState = {
    isPaused: false,
    buffer: [] as QuestionCardFragment$data[],
    questionList: [] as QuestionCardFragment$data[],
};

type Action =
    | { type: 'togglePause'; payload?: never }
    | { type: 'addToBuffer'; payload: QuestionCardFragment$data }
    | { type: 'flushBuffer'; payload?: never }
    | { type: 'initQuestionList'; payload: QuestionCardFragment$data[] };

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

interface TArgs {
    queryRef: PreloadedQuery<useQuestionListQuery>;
    eventId: string;
}

export function useQuestionList({ queryRef, eventId }: TArgs) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const { questionsByEventId } = usePreloadedQuery<useQuestionListQuery>(USE_QUESTION_LIST_QUERY, queryRef);

    // TODO: make more compliant with graphql conneciton spec
    // https://relay.dev/graphql/connections.htm
    // https://relay.dev/docs/guided-tour/list-data/connections/#internaldocs-banner
    const config = React.useMemo<GraphQLSubscriptionConfig<useQuestionListSubscription>>(
        () => ({
            variables: { eventId },
            subscription: USE_QUESTION_LIST_SUBSCRIPTION,
            onCompleted() {},
            onNext(data) {
                if (data?.eventQuestionCreated) dispatch({ type: 'addToBuffer', payload: data.eventQuestionCreated });
            },
        }),
        [eventId]
    );

    useSubscription(config);

    // useNewQuestionsSubscription({
    //     variables: { id },
    //     onSubscriptionData({ subscriptionData }) {
    //         const { data } = subscriptionData;
    //         if (data && data.eventQuestionCreated)
    //             dispatch({ type: 'addToBuffer', payload: data.eventQuestionCreated });
    //     },
    // });

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
