import * as React from 'react';
import { graphql, useRefetchableFragment } from 'react-relay';
import { useLiveFeedbackPromptsFragment$key } from '@local/__generated__/useLiveFeedbackPromptsFragment.graphql';
import { useRefresh } from '@local/features/core';

const USE_LIVE_FEEDBACK_PROMPTS = graphql`
    fragment useLiveFeedbackPromptsFragment on Event
    @refetchable(queryName: "liveFeedbackPromptPagination")
    @argumentDefinitions(first: { type: "Int", defaultValue: 100 }, after: { type: "String", defaultValue: "" }) {
        id
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
    isModalOpen: boolean;
    isShareResultsOpen: boolean;
}

export function useLiveFeedbackPrompts({ fragmentRef, isModalOpen, isShareResultsOpen }: Props) {
    const [data, refetch] = useRefetchableFragment(USE_LIVE_FEEDBACK_PROMPTS, fragmentRef);
    const { liveFeedbackPrompts } = data;

    const REFETCH_INTERVAL = 20000; // 20 seconds
    const refresh = React.useCallback(() => {
        // if the modal is open, don't refetch (Ensures secondary modal doesn't flash)
        if (isModalOpen) return;
        refetch(
            { first: 100, after: data.liveFeedbackPrompts?.pageInfo?.endCursor || '' },
            { fetchPolicy: 'store-and-network' }
        );
    }, [isModalOpen, refetch, data.liveFeedbackPrompts?.pageInfo?.endCursor]);
    const { pauseRefresh, resumeRefresh } = useRefresh({ refreshInterval: REFETCH_INTERVAL, callback: refresh });

    React.useEffect(() => {
        if (isModalOpen || !isShareResultsOpen) {
            pauseRefresh();
        } else {
            resumeRefresh();
        }
    }, [isModalOpen, isShareResultsOpen, pauseRefresh, resumeRefresh]);

    const promptsList = React.useMemo(
        () =>
            liveFeedbackPrompts?.edges
                ? liveFeedbackPrompts.edges.map(({ node, cursor }) => ({ ...node, cursor }))
                : [],
        [liveFeedbackPrompts]
    );

    const connections = React.useMemo(
        () => (data.liveFeedbackPrompts?.__id ? [data.liveFeedbackPrompts?.__id] : []),
        [data.liveFeedbackPrompts?.__id]
    );

    return { prompts: promptsList, connections, pauseRefresh, resumeRefresh, refresh };
}
