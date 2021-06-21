import { graphql, useMutation } from 'react-relay';

import type { DeleteMemberMutation } from '@local/__generated__/DeleteMemberMutation.graphql';
import { useSnack } from '@local/features/core/useSnack';
import { ConfirmationDialog, ConfirmationDialogProps } from '@local/components/ConfirmationDialog';

const DELETE_MEMBER_MUTATION = graphql`
    mutation DeleteMemberMutation($input: DeleteMember!, $connections: [ID!]!) {
        deleteMember(input: $input) {
            isError
            message
            body @appendNode(connections: $connections, edgeTypeName: "UserEdge") {
                id
                firstName
                lastName
                avatar
            }
        }
    }
`;

export type DeleteMemberProps = ConfirmationDialogProps & {
    memberId: string;
    orgId: string;
    connections: string[];
}

export function DeleteMember(props: DeleteMemberProps) {
    const [commit] = useMutation<DeleteMemberMutation>(DELETE_MEMBER_MUTATION);
    const { children, connections, onConfirm, memberId, orgId, ...propsSubset } = props;
    const { displaySnack } = useSnack();
    const curryOnConfirm = () => {
        if (!memberId) return; // could be empty string
        commit({
            variables: { input: { userId: memberId, orgId }, connections },
            onCompleted: ({ deleteMember }) => {
                if (deleteMember.isError) {
                    displaySnack(deleteMember.message);
                } else {
                    onConfirm();
                }
            },
        });
    };

    return <ConfirmationDialog onConfirm={curryOnConfirm} { ...propsSubset}>
        {children}
    </ConfirmationDialog>
}
