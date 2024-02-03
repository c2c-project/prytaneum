import * as React from 'react';
import { graphql, useFragment } from 'react-relay';
import { useLiveFeedbackPromptResponsesFragment$key } from '@local/__generated__/useLiveFeedbackPromptResponsesFragment.graphql';

export const USE_LIVE_FEEDBACK_PROMPT_RESPONSES = graphql`
    fragment useLiveFeedbackPromptResponsesFragment on EventLiveFeedbackPrompt
    @argumentDefinitions(first: { type: "Int", defaultValue: 100 }, after: { type: "String", defaultValue: "" }) {
        id
        responses(first: $first, after: $after) @connection(key: "useLiveFeedbackPromptResponsesFragment_responses") {
            __id
            edges {
                cursor
                node {
                    id
                    isOpenEnded
                    response
                    isVote
                    vote
                    isMultipleChoice
                    multipleChoiceResponse
                    createdAt
                    createdBy {
                        id
                        firstName
                    }
                    prompt {
                        id
                        prompt
                    }
                }
            }
        }
    }
`;

interface Props {
    fragmentRef: useLiveFeedbackPromptResponsesFragment$key;
}

export function useLiveFeedbackPromptResponses({ fragmentRef }: Props) {
    const { responses } = useFragment(USE_LIVE_FEEDBACK_PROMPT_RESPONSES, fragmentRef);
    const responsesList = React.useMemo(
        () => (responses?.edges ? responses.edges.map(({ node }) => node) : []),
        [responses]
    );

    return { responses: responsesList };
}
