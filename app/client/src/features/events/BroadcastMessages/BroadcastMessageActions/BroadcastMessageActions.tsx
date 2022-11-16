import React from 'react';
import { CardActions, CardActionsProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { graphql, useFragment } from 'react-relay';

import type { BroadcastMessageActionsFragment$key } from '@local/__generated__/BroadcastMessageActionsFragment.graphql';
import { DeleteBroadcastMessageButton } from './DeleteBroadcastMessageButton';

const useStyles = makeStyles((theme) => ({
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    delete: {
        color: theme.palette.custom.danger,
    },
}));

const BROADCAST_MESSAGE_ACTIONS_FRAGMENT = graphql`
    fragment BroadcastMessageActionsFragment on EventBroadcastMessage {
        id
        ...DeleteBroadcastMessageButtonFragment
    }
`;

export type BroadcastMessageActionProps = {
    deleteEnabled?: boolean;
    fragmentRef: BroadcastMessageActionsFragment$key;
    connections?: string[];
} & CardActionsProps;

export function BroadcastMessageActions({
    deleteEnabled = false,
    fragmentRef,
    connections,
    ...props
}: BroadcastMessageActionProps) {
    const data = useFragment(BROADCAST_MESSAGE_ACTIONS_FRAGMENT, fragmentRef);
    const classes = useStyles();
    return (
        <CardActions {...props} className={classes.actions}>
            {deleteEnabled && <DeleteBroadcastMessageButton fragmentRef={data} className={classes.delete} />}
        </CardActions>
    );
}
