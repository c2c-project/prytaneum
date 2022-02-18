import { graphql, useFragment } from 'react-relay';

import type { useQuestionQueueFragment$key } from '@local/__generated__/useQuestionQueueFragment.graphql';

export const USE_QUESTION_QUEUE_FRAGMENT = graphql`
    fragment useQuestionQueueFragment on Event
    @argumentDefinitions(first: { type: "Int", defaultValue: 1000 }, after: { type: "String", defaultValue: "" }) {
        id
        currentQuestion
        questionQueue {
            questionRecord(first: $first, after: $after) @connection(key: "QuestionQueueFragment_questionRecord") {
                __id
                edges {
                    cursor
                    node {
                        id
                        question
                        createdBy {
                            firstName
                        }
                        ...QuestionAuthorFragment
                        ...QuestionStatsFragment
                        ...QuestionContentFragment
                        position
                        refQuestion {
                            ...QuestionQuoteFragment
                        }
                    }
                }
            }
            enqueuedQuestions(first: $first, after: $after)
                @connection(key: "QuestionQueueFragment_enqueuedQuestions") {
                __id
                edges {
                    cursor
                    node {
                        id
                        question
                        createdBy {
                            firstName
                        }
                        ...QuestionActionsFragment
                        ...QuestionAuthorFragment
                        ...QuestionStatsFragment
                        ...QuestionContentFragment
                        position
                        refQuestion {
                            ...QuestionQuoteFragment
                        }
                    }
                }
            }
        }
    }
`;

export function useQuestionQueue({ fragmentRef }: { fragmentRef: useQuestionQueueFragment$key }) {
    const { questionQueue } = useFragment(USE_QUESTION_QUEUE_FRAGMENT, fragmentRef);
    return { questionQueue, connections: questionQueue?.enqueuedQuestions?.__id ? [questionQueue.enqueuedQuestions.__id] : [] };
}
