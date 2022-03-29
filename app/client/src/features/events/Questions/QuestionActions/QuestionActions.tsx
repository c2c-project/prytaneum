import React from 'react';
import { CardActions, CardActionsProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { graphql, useFragment } from 'react-relay';

import type { QuestionActionsFragment$key } from '@local/__generated__/QuestionActionsFragment.graphql';
import { Like } from './Like';
import { Quote } from './Quote';
import { QueueButton } from './QueueButton';
import { DeleteButton } from './DeleteButton';

const useStyles = makeStyles(() => ({
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

const QUESTION_ACTIONS_FRAGMENT = graphql`
    fragment QuestionActionsFragment on EventQuestion {
        id
        ...QuoteFragment
        ...LikeFragment
        ...QueueButtonFragment
        ...DeleteButtonFragment
    }
`;

export type QuestionActionProps = {
    fragmentRef: QuestionActionsFragment$key;
    quoteEnabled?: boolean;
    likeEnabled?: boolean;
    queueEnabled?: boolean;
    deleteEnabled?: boolean;
    connections: string[];
} & CardActionsProps;

export function QuestionActions({
    likeEnabled = false,
    quoteEnabled = false,
    queueEnabled = false,
    deleteEnabled = false,
    fragmentRef,
    connections,
    ...props
}: QuestionActionProps) {
    const data = useFragment(QUESTION_ACTIONS_FRAGMENT, fragmentRef);
    const classes = useStyles();
    return (
        <CardActions {...props} className={classes.actions}>
            {likeEnabled && <Like fragmentRef={data} />}
            {quoteEnabled && <Quote fragmentRef={data} />}
            {queueEnabled && <QueueButton fragmentRef={data} />}
            {deleteEnabled && <DeleteButton fragmentRef={data} />}
        </CardActions>
    );
}
