import * as React from 'react';
import { Card } from '@material-ui/core';
import { graphql, useFragment } from 'react-relay';

import type { DraggableCardFragment$key } from '@local/__generated__/DraggableCardFragment.graphql';
import DragArea from '@local/components/DragArea';
import useListStyles from './useListStyles';
import { QuestionAuthor, QuestionContent, QuestionStats } from '../../Questions';

const DRAGGABLE_CARD = graphql`
    fragment DraggableCardFragment on EventQuestion {
        id
        ...QuestionAuthorFragment
        ...QuestionContentFragment
        ...QuestionStatsFragment
    }
`;

export interface DraggableCardProps {
    fragmentRef: DraggableCardFragment$key;
    index: number;
    itemStyle: (isDragging: boolean) => React.CSSProperties;
    isCurrent: boolean;
    draggable: boolean;
}

/**
 * renders a single draggable card
 */
export const DraggableCard = React.memo(
    ({ fragmentRef, index, itemStyle, isCurrent, draggable }: DraggableCardProps) => {
        const question = useFragment(DRAGGABLE_CARD, fragmentRef);
        const classes = useListStyles();
        const getStyle: (d: boolean) => React.CSSProperties = React.useMemo(() => {
            if (draggable || isCurrent) return itemStyle;
            return (dragging) => ({
                ...itemStyle(dragging),
                filter: 'brightness(.7)',
            });
        }, [draggable, isCurrent, itemStyle]);
        return (
            <DragArea
                key={question.id}
                draggableId={question.id}
                index={index}
                getStyle={getStyle}
                isDragDisabled={!draggable}
            >
                <Card className={classes.listItem}>
                    <QuestionAuthor fragmentRef={question} />
                    <QuestionContent fragmentRef={question} />
                    <QuestionStats fragmentRef={question} />
                </Card>
            </DragArea>
        );
    }
);
