import * as React from 'react';
import { graphql, usePaginationFragment } from 'react-relay';

import { useBroadcastMessageListFragment$key } from '@local/__generated__/useBroadcastMessageListFragment.graphql';
import { useUser } from '@local/features/accounts';

export const USE_BROADCAST_MESSAGE_LIST_FRAGMENT = graphql`
    fragment useBroadcastMessageListFragment on Event
    @refetchable(queryName: "broadcastMessagePagination")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 50 }
        after: { type: "String", defaultValue: "" }
        lang: { type: "String", defaultValue: "EN" }
    ) {
        id
        currentBroadcastMessage
        broadcastMessages(first: $first, after: $after)
            @connection(key: "useBroadcastMessageListFragment_broadcastMessages") {
            __id
            edges {
                cursor
                node {
                    id
                    broadcastMessage
                    isVisible
                    createdBy {
                        firstName
                    }
                    ...BroadcastMessageActionsFragment
                    ...BroadcastMessageAuthorFragment
                    ...BroadcastMessageContentFragment @arguments(lang: $lang)
                }
            }
            pageInfo {
                startCursor
                endCursor
            }
        }
    }
`;

interface useBroadcastMessageListProps {
    fragmentRef: useBroadcastMessageListFragment$key;
}
export function useBroadcastMessageList({ fragmentRef }: useBroadcastMessageListProps) {
    const { user } = useUser();
    const { data, loadNext, loadPrevious, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious, refetch } =
        usePaginationFragment(USE_BROADCAST_MESSAGE_LIST_FRAGMENT, fragmentRef);
    const { broadcastMessages, id: eventId, currentBroadcastMessage } = data;
    const MAX_MESSAGES_DISPLAYED = 50;
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const broadcastMessageList = React.useMemo(() => {
        if (!broadcastMessages?.edges) return [];
        return broadcastMessages.edges.map(({ node, cursor }) => {
            return { ...node, cursor };
        });
    }, [broadcastMessages]);

    const refresh = React.useCallback(() => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        refetch(
            {
                first: MAX_MESSAGES_DISPLAYED,
                after: '',
                lang: user?.preferredLang ?? 'EN',
            },
            {
                fetchPolicy: 'store-and-network',
                onComplete: () => {
                    setIsRefreshing(false);
                },
            }
        );
    }, [isRefreshing, refetch, user?.preferredLang]);

    const connections = React.useMemo(() => {
        return broadcastMessages?.__id ? [broadcastMessages.__id] : [];
    }, [broadcastMessages?.__id]);

    return {
        broadcastMessages: broadcastMessageList,
        eventId,
        connections,
        currentBroadcastMessage,
        loadNext,
        loadPrevious,
        hasNext,
        hasPrevious,
        isLoadingNext,
        isLoadingPrevious,
        refresh,
        MAX_MESSAGES_DISPLAYED,
    };
}
