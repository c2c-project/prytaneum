import * as React from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { graphql, useMutation, useFragment } from 'react-relay';
import { DeleteBroadcastMessageButtonFragment$key } from '@local/__generated__/DeleteBroadcastMessageButtonFragment.graphql';
import { DeleteBroadcastMessageButtonMutation } from '@local/__generated__/DeleteBroadcastMessageButtonMutation.graphql';
import { useSnack } from '@local/core/useSnack';

const DELETE_BROADCAST_MESSAGE_FRAGMENT = graphql`
    fragment DeleteBroadcastMessageButtonFragment on EventBroadcastMessage {
        id
        position
    }
`;

const DELETE_BROADCAST_MESSAGE_MUTATION = graphql`
    mutation DeleteBroadcastMessageButtonMutation($input: DeleteBroadcastMessage!) {
        deleteBroadcastMessage(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                }
            }
        }
    }
`;

interface Props {
    fragmentRef: DeleteBroadcastMessageButtonFragment$key;
}

export function DeleteBroadcastMessageButton({ fragmentRef }: Props) {
    const { id: broadcastMessageId, position } = useFragment(DELETE_BROADCAST_MESSAGE_FRAGMENT, fragmentRef);
    const [commit] = useMutation<DeleteBroadcastMessageButtonMutation>(DELETE_BROADCAST_MESSAGE_MUTATION);
    const { displaySnack } = useSnack();

    function handleClick() {
        commit({
            variables: {
                input: {
                    broadcastMessageId,
                    toggleBroadcastMessageVisibility: false,
                },
            },
            onCompleted({ deleteBroadcastMessage }) {
                if (deleteBroadcastMessage.isError) displaySnack(deleteBroadcastMessage.message);
                else displaySnack('Broadcast message deleted', { variant: 'success' });
            },
        });
    }

    const isQueued = React.useMemo(() => {
        if (!position || position === -1) return false;
        return true;
    }, [position]);

    return (
        <div>
            {isQueued ? (
                <></>
            ) : (
                <Button onClick={handleClick} endIcon={<DeleteIcon fontSize='small' />} fullWidth color={'error'}>
                    Delete
                </Button>
            )}
        </div>
    );
}
