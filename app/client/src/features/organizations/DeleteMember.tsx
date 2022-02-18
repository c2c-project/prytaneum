import { graphql, useMutation } from 'react-relay';

import type { DeleteMemberMutation } from '@local/__generated__/DeleteMemberMutation.graphql';
import { useSnack } from '@local/features/core/useSnack';
import { ConfirmationDialog, ConfirmationDialogProps } from '@local/components/ConfirmationDialog';
import { ConnectionHandler, RecordSourceSelectorProxy } from 'relay-runtime';

const DELETE_MEMBER_MUTATION = graphql`
    mutation DeleteMemberMutation($input: DeleteMember!) {
        deleteMember(input: $input) {
            isError
            message
            body {
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
            variables: { input: { userId: memberId, orgId } },
            updater: (store: RecordSourceSelectorProxy) => {
                const OrgProxy = store.get(orgId);
                if (!OrgProxy) return;
                const conn = ConnectionHandler.getConnection(OrgProxy, 'OrgMemberListFragment_members');
                if (!conn) return;
                ConnectionHandler.deleteNode(conn, memberId);

            },
            onCompleted: ({ deleteMember }) => {
                if (deleteMember.isError) {
                    displaySnack(deleteMember.message);
                } else {
                    onConfirm();
                }
            }
        });
    };

    return <ConfirmationDialog onConfirm={curryOnConfirm} {...propsSubset}>
        {children}
    </ConfirmationDialog>
}
