import * as React from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { graphql, useMutation, useFragment } from 'react-relay';

import { EditBroadcastMessageButtonFragment$key } from '@local/__generated__/EditBroadcastMessageButtonFragment.graphql';
import { EditBroadcastMessageButtonMutation } from '@local/__generated__/EditBroadcastMessageButtonMutation.graphql';
import { useSnack } from '@local/core/useSnack';

const EDIT_BROADCAST_MESSAGE_FRAGMENT = graphql`
    fragment EditBroadcastMessageButtonFragment on EventBroadcastMessage {
        id
        position
        broadcastMessage
    }
`;

const EDIT_BROADCAST_MESSAGE_MUTATION = graphql`
    mutation EditBroadcastMessageButtonMutation($input: EditBroadcastMessage!) {
        editBroadcastMessage(input: $input) {
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
    fragmentRef: EditBroadcastMessageButtonFragment$key;
    className?: string;
}

export function EditBroadcastMessageButton({ className = undefined, fragmentRef }: Props) {
    const { id: broadcastMessageId, broadcastMessage } = useFragment(EDIT_BROADCAST_MESSAGE_FRAGMENT, fragmentRef);
    const [commit] = useMutation<EditBroadcastMessageButtonMutation>(EDIT_BROADCAST_MESSAGE_MUTATION);
    const { displaySnack } = useSnack();

    function handleSubmit() {
        commit({
            variables: {
                input: {
                    broadcastMessageId,
                    broadcastMessage,
                },
            },
            onCompleted({ editBroadcastMessage }) {
                if (editBroadcastMessage.isError) displaySnack(editBroadcastMessage.message);
            },
        });
    }

    const [editedBroadcastMessage, setEditedBroadcastMessage] = React.useState('');
    const [disableInput, setDisableInput] = React.useState(true);

    function handleClick() {
        setDisableInput(!disableInput);
    }

    return (
        <div>
            {disableInput ? (
                <></>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Broadcast message:
                        <input
                            type='text'
                            value={editedBroadcastMessage}
                            onChange={(e) => setEditedBroadcastMessage(e.target.value)}
                        />
                    </label>
                    <input type='submit' value='save' />
                </form>
            )}
            <Button onClick={handleClick} endIcon={<EditIcon fontSize='small' />} fullWidth className={className}>
                Edit
            </Button>
        </div>
    );
}
