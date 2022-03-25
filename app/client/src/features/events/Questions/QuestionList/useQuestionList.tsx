import * as React from 'react';
import { graphql, usePaginationFragment } from 'react-relay';

import type { useQuestionListFragment$key } from '@local/__generated__/useQuestionListFragment.graphql';

export const USE_QUESTION_LIST_FRAGMENT = graphql`
    fragment useQuestionListFragment on Event
    @refetchable(queryName: "questionListPagination")
    @argumentDefinitions(first: { type: "Int", defaultValue: 10 }, after: { type: "String", defaultValue: "" }) {
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
    const { data, loadNext, loadPrevious, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious, refetch } =
        usePaginationFragment(USE_QUESTION_LIST_FRAGMENT, fragmentRef);
    const { questions, id: eventId, currentQuestion } = data;
    const questionList = React.useMemo(
        () => (questions?.edges ? questions.edges.map(({ node, cursor }) => { return { ...node, cursor }}) : []),
        [questions]
    );

    return { questions: questionList, eventId, connections: questions?.__id ? [questions.__id] : [], currentQuestion, loadNext, loadPrevious, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious, refetch };
}
