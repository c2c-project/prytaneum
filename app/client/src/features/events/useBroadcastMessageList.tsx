import * as React from 'react';
import { graphql, usePaginationFragment } from 'react-relay';

import { useBroadcastMessageListFragment$key } from '@local/__generated__/useBroadcastMessageListFragment.graphql';

export const USE_BROADCAST_MESSAGE_LIST_FRAGMENT = graphql`
    fragment useBroadcastMessageListFragment on Event
    @refetchable(queryName: "broadcastMessagePagination")
    @argumentDefinitions(first: { type: "Int", defaultValue: 50 }, after: { type: "String", defaultValue: "" }) {
        id
        currentBroadcastMessage
        broadcastMessages(first: $first, after: $after) @connection(key: "useBroadcastMessageListFragment_broadcastMessages") {
            __id
            edges {
                cursor
                node {
                    id
                    broadcastMessage
                    createdBy {
                        firstName
                    }
                    ...BroadcastMessageAuthorFragment
                    ...BroadcastMessageContentFragment
                }
            }
        }
    }
`;

interface useBroadcastMessageListProps {
    fragmentRef: useBroadcastMessageListFragment$key
}
export function useBroadcastMessageList({ fragmentRef }: useBroadcastMessageListProps) {
    const { data, loadNext, loadPrevious, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious, refetch } =
        usePaginationFragment(USE_BROADCAST_MESSAGE_LIST_FRAGMENT, fragmentRef);
    const { broadcastMessages, id: eventId, currentBroadcastMessage } = data;

    const broadcastMessageList = React.useMemo(
        () =>
            broadcastMessages?.edges
                ? broadcastMessages.edges.map(({ node, cursor }) => {
                      return { ...node, cursor };
                  })
                : [],
        [broadcastMessages]
    );

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
        refetch,
    };
}
