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
                    createdAt
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
    modalIsOpen: boolean;
}

export function useLiveFeedbackPrompts({ fragmentRef, modalIsOpen }: Props) {
    const [data, refetch] = useRefetchableFragment(USE_LIVE_FEEDBACK_PROMPTS, fragmentRef);
    const { liveFeedbackPrompts } = data;

    const REFETCH_INTERVAL = 20000; // 20 seconds
    const refresh = React.useCallback(() => {
        // if the modal is open, don't refetch (Ensures secondary modal doesn't flash)
        if (modalIsOpen) return;
        refetch(
            { first: 100, after: data.liveFeedbackPrompts?.pageInfo?.endCursor || '' },
            { fetchPolicy: 'network-only' }
        );
    }, [modalIsOpen, refetch, data.liveFeedbackPrompts?.pageInfo?.endCursor]);
    useRefresh({ refreshInterval: REFETCH_INTERVAL, callback: refresh });

    const promptsList = React.useMemo(
        () =>
            liveFeedbackPrompts?.edges
                ? liveFeedbackPrompts.edges.map(({ node, cursor }) => ({ ...node, cursor }))
                : [],
        [liveFeedbackPrompts]
    );

    const refresh = React.useCallback(() => {
        // if the modal is open, don't refetch (Ensures secondary modal doesn't flash)
        if (isRefetching || modalIsOpen) return;
        setIsRefetching(true);
        const afterCursor = promptsList[promptsList.length - 1]?.cursor || '';
        refetch({ first: 100, after: afterCursor }, { fetchPolicy: 'network-only' });
        setIsRefetching(false);
    }, [isRefetching, modalIsOpen, promptsList, refetch]);

    React.useEffect(() => {
        console.log(promptsList);
    }, [promptsList]);

    // Set up refresh polling interval (20 seconds) to keep data fresh
    React.useEffect(() => {
        const interval = setInterval(refresh, REFETCH_INTERVAL);
        return () => clearInterval(interval);
    }, [refresh]);

    return { prompts: promptsList };
}
