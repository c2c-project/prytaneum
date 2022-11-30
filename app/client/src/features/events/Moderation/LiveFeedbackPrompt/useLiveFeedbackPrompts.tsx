import * as React from 'react';
import { graphql, useRefetchableFragment } from 'react-relay';
import { useLiveFeedbackPromptsFragment$key } from '@local/__generated__/useLiveFeedbackPromptsFragment.graphql';

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
                    ...LiveFeedbackPromptResponsesFragment
                }
            }
            pageInfo {
                hasNextPage
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
    const REFETCH_INTERVAL = 10000; // 10 seconds

    const promptsList = React.useMemo(
        () =>
            liveFeedbackPrompts?.edges
                ? liveFeedbackPrompts.edges.map(({ node, cursor }) => ({ ...node, cursor }))
                : [],
        [liveFeedbackPrompts]
    );

    React.useEffect(() => {
        const interval = setInterval(() => {
            console.log('refreshing');
            refetch({ first: 100, after: liveFeedbackPrompts?.pageInfo?.endCursor }, { fetchPolicy: 'network-only' });
        }, REFETCH_INTERVAL);

        return () => clearInterval(interval);
    }, [liveFeedbackPrompts?.pageInfo.endCursor, refetch]);

    return { prompts: promptsList };
}
