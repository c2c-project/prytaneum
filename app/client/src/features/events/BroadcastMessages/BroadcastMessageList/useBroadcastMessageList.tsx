import * as React from 'react';
import { graphql, usePaginationFragment } from 'react-relay';

import { useBroadcastMessageListFragment$key } from '@local/__generated__/useBroadcastMessageListFragment.graphql';

export const USE_BROADCAST_MESSAGE_LIST_FRAGMENT = graphql`
    fragment useBroadcastMessageListFragment on Event
    @refetchable(queryName: "broadcastMessagePagination")
    @argumentDefinitions(first: { type: "Int", defaultValue: 50 }, after: { type: "String", defaultValue: "" }) {
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
                    createdBy {
                        firstName
                    }
                    ...BroadcastMessageActionsFragment
                    ...BroadcastMessageAuthorFragment
                    ...BroadcastMessageContentFragment
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
    const { data, loadNext, loadPrevious, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious, refetch } =
        usePaginationFragment(USE_BROADCAST_MESSAGE_LIST_FRAGMENT, fragmentRef);
    const { broadcastMessages, id: eventId, currentBroadcastMessage } = data;
    const MAX_MESSAGES_DISPLAYED = 50;

    const broadcastMessageList = React.useMemo(
        () =>
            broadcastMessages?.edges
                ? broadcastMessages.edges.map(({ node, cursor }) => {
                      return { ...node, cursor };
                  })
                : [],
        [broadcastMessages]
    );

    // Data in ascending time order, reverse to get latest message at the top
    broadcastMessageList.reverse();

    const refresh = React.useCallback(() => {
        refetch(
            { first: MAX_MESSAGES_DISPLAYED, after: data.broadcastMessages?.pageInfo?.endCursor },
            { fetchPolicy: 'network-only' }
        );
    }, [data.broadcastMessages?.pageInfo?.endCursor, refetch]);

    return {
        broadcastMessages: broadcastMessageList,
        eventId,
        connections: broadcastMessages?.__id ? [broadcastMessages.__id] : [],
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
