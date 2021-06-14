import * as React from 'react';
import { graphql, useFragment } from 'react-relay';

import type { DraggableListFragment$key } from '@local/__generated__/DraggableListFragment.graphql';
import { DraggableCard } from './DraggableCard';

export const DRAGGABLE_LIST_FRAGMENT = graphql`
    fragment DraggableListFragment on Event
    @argumentDefinitions(first: { type: "Int", defaultValue: 100 }, after: { type: "String", defaultValue: "" }) {
        id
        queuedQuestions(first: $first, after: $after) @connection(key: "DraggableListFragment_queuedQuestions") {
            edges {
                cursor
                node {
                    id
                    ...DraggableCardFragment
                }
            }
        }
    }
`;

interface Props {
    fragmentRef: DraggableListFragment$key;
    itemStyle: (d: boolean) => React.CSSProperties;
}

/**
 * counterpart to static list although it is slightly different
 * in functionality, the "droppablearea" component is higher up in the tree already
 * so all we need to do here is map over the items
 */
export default React.memo(({ fragmentRef, itemStyle }: Props) => {
    const { queuedQuestions } = useFragment(DRAGGABLE_LIST_FRAGMENT, fragmentRef);
    return (
        <>
            {queuedQuestions?.edges?.map(({ node }, index) => (
                <DraggableCard
                    key={node.id}
                    fragmentRef={node}
                    isCurrent={false}
                    itemStyle={itemStyle}
                    index={index}
                    draggable
                />
            ))}
        </>
    );
});
