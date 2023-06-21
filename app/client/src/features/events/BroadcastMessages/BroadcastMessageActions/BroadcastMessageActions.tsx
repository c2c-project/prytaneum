import React from 'react';
import { CardActions, CardActionsProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { graphql, useFragment } from 'react-relay';

import type { BroadcastMessageActionsFragment$key } from '@local/__generated__/BroadcastMessageActionsFragment.graphql';
import { DeleteBroadcastMessageButton } from './DeleteBroadcastMessageButton';
import { EditBroadcastMessageButton } from './EditBroadcastMessageButton';

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
        ...EditBroadcastMessageButtonFragment
    }
`;

export type BroadcastMessageActionProps = {
    deleteEnabled?: boolean;
    editEnabled?: boolean;
    fragmentRef: BroadcastMessageActionsFragment$key;
} & CardActionsProps;

export function BroadcastMessageActions({
    deleteEnabled = false,
    editEnabled = false,
    fragmentRef,
    ...props
}: BroadcastMessageActionProps) {
    const data = useFragment(BROADCAST_MESSAGE_ACTIONS_FRAGMENT, fragmentRef);
    const classes = useStyles();
    return (
        <CardActions {...props} className={classes.actions}>
            {deleteEnabled && <DeleteBroadcastMessageButton fragmentRef={data} />}
            {editEnabled && <EditBroadcastMessageButton fragmentRef={data} />}
        </CardActions>
    );
}
