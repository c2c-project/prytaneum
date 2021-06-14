import * as React from 'react';
import { graphql, useMutation } from 'react-relay';

import { useSnack } from '@local/hooks';
import type { DeleteModeratorMutation } from '@local/__generated__/DeleteModeratorMutation.graphql';
import { ConfirmationDialog, ConfirmationDialogProps } from '@local/components/ConfirmationDialog';

export const DELETE_MODERATOR_MUTATION = graphql`
    mutation DeleteModeratorMutation($input: DeleteModerator!, $connections: [ID!]!) {
        deleteModerator(input: $input) {
            isError
            message
            body {
                id @deleteEdge(connections: $connections)
            }
        }
    }
`;

type DeleteModeratorProps = ConfirmationDialogProps & {
    moderatorId: string;
    eventId: string;
    connections: string[];
};

export function DeleteModerator(props: DeleteModeratorProps) {
    const { children, connections, onConfirm, moderatorId, eventId, ...propsSubset } = props;
    const [commit] = useMutation<DeleteModeratorMutation>(DELETE_MODERATOR_MUTATION);
    const [snack] = useSnack();
    const curryOnConfirm = () => {
        if (!moderatorId) return; // could be empty string
        commit({
            variables: { input: { userId: moderatorId, eventId }, connections },
            onCompleted: ({ deleteModerator }) => {
                if (deleteModerator.isError) {
                    snack(deleteModerator.message);
                } else {
                    onConfirm();
                }
            },
        });
    };
    return (
        <ConfirmationDialog onConfirm={curryOnConfirm} {...propsSubset}>
            {children}
        </ConfirmationDialog>
    );
}
