import * as React from 'react';
import { graphql, useRefetchableFragment } from 'react-relay';
import { useLiveFeedbackPromptFlowsFragment$key } from '@local/__generated__/useLiveFeedbackPromptFlowsFragment.graphql';
import { useRefresh } from '@local/core';

const USE_LIVE_FEEDBACK_PROMPT_FLOWS_FRAGMENT = graphql`
    fragment useLiveFeedbackPromptFlowsFragment on Event
    @refetchable(queryName: "feedbackFlowPaginationQuery") # Unique query name for refetching
    @argumentDefinitions(first: { type: "Int", defaultValue: 100 }, after: { type: "String" }) {
        id # Event ID
        feedbackFlows(first: $first, after: $after)
            @connection(key: "useLiveFeedbackPromptFlowsFragment_feedbackFlows") {
            __id
            edges {
                cursor
                node {
                    id
                    eventId
                    flowName
                    flowDescription
                    isDraft
                    prompts {
                        id
                        order
                        prompt {
                            id
                            prompt
                            isVote
                            isOpenEnded
                            isMultipleChoice
                            multipleChoiceOptions
                            createdAt
                            isDraft
                            viewpoints
                            voteViewpoints
                            ...useLiveFeedbackPromptResponsesFragment
                        }
                    }
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;

export interface Props {
    fragmentRef: useLiveFeedbackPromptFlowsFragment$key;
}

export function useLiveFeedbackPromptFlows({ fragmentRef }: Props) {
    const [data, refetch] = useRefetchableFragment(USE_LIVE_FEEDBACK_PROMPT_FLOWS_FRAGMENT, fragmentRef);
    const { feedbackFlows } = data;

    const REFETCH_INTERVAL = 20000; // 20 seconds, same as the original hook

    const refresh = React.useCallback(() => {
        const endCursor = data.feedbackFlows?.pageInfo?.endCursor;

        const variables: {
            first: number;
            after?: string | null;
        } = { first: 100 };

        if (endCursor) {
            variables.after = endCursor;
        }

        refetch(variables, { fetchPolicy: 'store-and-network' });
    }, [refetch, data.feedbackFlows?.pageInfo?.endCursor]);

    useRefresh({ refreshInterval: REFETCH_INTERVAL, callback: refresh });

    const flowsList = React.useMemo(
        () => (feedbackFlows?.edges ? feedbackFlows.edges.map(({ node, cursor }) => ({ ...node, cursor })) : []),
        [feedbackFlows?.edges]
    );

    const connections = React.useMemo(
        () => (data.feedbackFlows?.__id ? [data.feedbackFlows?.__id] : []),
        [data.feedbackFlows?.__id]
    );

    return { flows: flowsList, connections, refresh };
}
