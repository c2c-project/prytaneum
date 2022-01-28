import * as React from 'react';
import { graphql, useFragment } from 'react-relay';

import type { useQuestionListFragment$key } from '@local/__generated__/useQuestionListFragment.graphql';


// TODO: make the pagination here better
export const USE_QUESTION_LIST_FRAGMENT = graphql`
    fragment useQuestionListFragment on Event
    @argumentDefinitions(first: { type: "Int", defaultValue: 100 }, after: { type: "String", defaultValue: "1" }) {
        id
        currentQuestion
        questions(first: $first, after: $after) @connection(key: "useQuestionListFragment_questions") {
            __id
            edges {
                cursor
                node {
                    id
                    question
                    createdBy {
                        firstName
                    }
                    refQuestion {
                        ...QuestionQuoteFragment
                    }
                    ...QuestionActionsFragment
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

interface TArgs {
    fragmentRef: useQuestionListFragment$key;
}

export function useQuestionList({ fragmentRef }: TArgs) {
    const { questions, id: eventId, currentQuestion } = useFragment(USE_QUESTION_LIST_FRAGMENT, fragmentRef);
    const questionList = React.useMemo(
        () => (questions?.edges ? questions.edges.map(({ node }) => node) : []),
        [questions]
    );

    return { questions: questionList, eventId, connections: questions?.__id ? [questions.__id] : [], currentQuestion };
}
