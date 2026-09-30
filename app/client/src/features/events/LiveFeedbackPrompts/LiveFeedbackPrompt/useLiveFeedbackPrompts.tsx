import * as React from 'react';
import { graphql, useRefetchableFragment } from 'react-relay';
import { useLiveFeedbackPromptsFragment$key } from '@local/__generated__/useLiveFeedbackPromptsFragment.graphql';
import { useRefresh } from '@local/core';

const USE_LIVE_FEEDBACK_PROMPTS = graphql`
    fragment useLiveFeedbackPromptsFragment on Event
    @refetchable(queryName: "liveFeedbackPromptPagination")
    @argumentDefinitions(first: { type: "Int", defaultValue: 100 }, after: { type: "String" }) {
        id
        simulationEnabled
        simulationParticipantCount
        simulationTopic
        simulationBackground
        liveFeedbackPrompts(first: $first, after: $after)
            @connection(key: "useLiveFeedbackPromptsFragment_liveFeedbackPrompts") {
            __id
            edges {
                cursor
                node {
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
                    simulationResponses: responses(first: 1) {
                        edges {
                            node {
                                id
                            }
                        }
                    }
                    ...useLiveFeedbackPromptResponsesFragment
                }
            }
            pageInfo {
                endCursor
            }
        }
    }
`;

export interface Props {
    fragmentRef: useLiveFeedbackPromptsFragment$key;
}

export function useLiveFeedbackPrompts({ fragmentRef }: Props) {
    const [data, refetch] = useRefetchableFragment(USE_LIVE_FEEDBACK_PROMPTS, fragmentRef);
    const { liveFeedbackPrompts } = data;

    const REFETCH_INTERVAL = 20000; // 20 seconds
    const refresh = React.useCallback(() => {
        const endCursor = data.liveFeedbackPrompts?.pageInfo?.endCursor;

        // Prepare variables conditionally
        const variables: {
            first: number;
            after?: string | null;
        } = { first: 100 };

        if (endCursor) {
            variables.after = endCursor;
        }

        refetch(variables, { fetchPolicy: 'store-and-network' });
    }, [refetch, data.liveFeedbackPrompts?.pageInfo?.endCursor]);
    useRefresh({ refreshInterval: REFETCH_INTERVAL, callback: refresh });

    const promptsList = React.useMemo(
        () =>
            liveFeedbackPrompts?.edges
                ? liveFeedbackPrompts.edges.map(({ node, cursor }) => ({ ...node, cursor }))
                : [],
        [liveFeedbackPrompts?.edges]
    );

    const connections = React.useMemo(
        () => (data.liveFeedbackPrompts?.__id ? [data.liveFeedbackPrompts?.__id] : []),
        [data.liveFeedbackPrompts?.__id]
    );

    const simulationConfiguration = React.useMemo(
        () => ({
            enabled: Boolean(data.simulationEnabled),
            participantCount: data.simulationParticipantCount,
            topic: data.simulationTopic,
            background: data.simulationBackground,
        }),
        [data.simulationBackground, data.simulationEnabled, data.simulationParticipantCount, data.simulationTopic]
    );

    return {
        prompts: promptsList,
        connections,
        refresh,
        simulationConfiguration,
    };
}
