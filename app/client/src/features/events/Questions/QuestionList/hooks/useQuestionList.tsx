import * as React from 'react';
import { graphql, usePaginationFragment } from 'react-relay';

import type {
    useQuestionListFragment$data,
    useQuestionListFragment$key,
} from '@local/__generated__/useQuestionListFragment.graphql';

export const USE_QUESTION_LIST_FRAGMENT = graphql`
    fragment useQuestionListFragment on Event
    @refetchable(queryName: "questionListPagination")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 50 }
        after: { type: "String", defaultValue: "" }
        userLang: { type: "String!" }
    ) {
        id
        currentQuestion
        questions(first: $first, after: $after) @connection(key: "useQuestionListFragment_questions") {
            __id
            edges {
                cursor
                node {
                    id
                    question
                    position
                    onDeckPosition
                    createdBy {
                        firstName
                    }
                    refQuestion {
                        ...QuestionQuoteFragment @arguments(lang: $userLang)
                    }
                    ...QuestionActionsFragment @arguments(lang: $userLang)
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment @arguments(lang: $userLang)
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

export type FormattedQuestionData = NonNullable<
    NonNullable<useQuestionListFragment$data['questions']>['edges']
>[number]['node'] & {
    readonly cursor: string;
};

interface useQuestionListProps {
    fragmentRef: useQuestionListFragment$key;
}

export function useQuestionList({ fragmentRef }: useQuestionListProps) {
    const { data, loadNext, loadPrevious, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious, refetch } =
        usePaginationFragment(USE_QUESTION_LIST_FRAGMENT, fragmentRef);
    const { questions, id: eventId, currentQuestion } = data;
    const questionList: FormattedQuestionData[] = React.useMemo(() => {
        if (!questions?.edges) return [];
        return questions.edges.map(({ node, cursor }) => {
            return { ...node, cursor };
        });
    }, [questions]);

    const connections = React.useMemo(() => (questions?.__id ? [questions.__id] : []), [questions?.__id]);

    return {
        questions: questionList,
        eventId,
        connections,
        currentQuestion,
        loadNext,
        loadPrevious,
        hasNext,
        hasPrevious,
        isLoadingNext,
        isLoadingPrevious,
        refetch,
    };
}
