import { graphql, useFragment } from 'react-relay';

import type { useQuestionQueueFragment$key } from '@local/__generated__/useQuestionQueueFragment.graphql';

export const USE_QUESTION_QUEUE_FRAGMENT = graphql`
    fragment useQuestionQueueFragment on Event
    @argumentDefinitions(first: { type: "Int", defaultValue: 100 }, after: { type: "String", defaultValue: "" }) {
        id
        currentQuestion
        queuedQuestions(first: $first, after: $after) @connection(key: "useQuestionQueueFragment_queuedQuestions") {
            edges {
                cursor
                node {
                    ...QuestionCardFragment
                    position
                }
            }
        }
    }
`;

interface useQuestionQueueArgs {
    fragmentRef: useQuestionQueueFragment$key;
}

export function useQuestionQueue({ fragmentRef }: useQuestionQueueArgs) {
    const data = useFragment(USE_QUESTION_QUEUE_FRAGMENT, fragmentRef);
    return data;
}
