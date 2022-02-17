import { graphql, useMutation } from 'react-relay';

import type { DeleteOrgMutation } from '@local/__generated__/DeleteOrgMutation.graphql';
import { useSnack } from '@local/features/core/useSnack';
import { ConfirmationDialog, ConfirmationDialogProps } from '@local/components/ConfirmationDialog';
import { ConnectionHandler, RecordSourceSelectorProxy } from 'relay-runtime';

const DELETE_ORG_MUTATION = graphql`
    mutation DeleteOrgMutation($input: DeleteOrganization!, $connections: [ID!]!) {
        deleteOrganization(input: $input) {
            isError
            message
            body @appendEdge(connections: $connections) {
                cursor
                node {
                    id
                    name
                    createdAt
                }
            }
        }
    }
`;

export type DeleteOrgProps = ConfirmationDialogProps & {
    orgId: string;
    connections: string[];
}

export function DeleteOrganization(props: DeleteOrgProps) {
    const [commit] = useMutation<DeleteOrgMutation>(DELETE_ORG_MUTATION);
    const { children, connections, onConfirm, orgId, ...propsSubset } = props;
    const { displaySnack } = useSnack();
    const curryOnConfirm = () => {
        if (!orgId) return; // could be empty string
        commit({
            variables: { input: { userId: orgId } },
            updater: (store: RecordSourceSelectorProxy) => {
                const OrgProxy = store.get(orgId);
                if (!OrgProxy) return;
                // const conn = ConnectionHandler.getConnection(OrgProxy, 'OrgListQuery_organizations');
                // if (!conn) return;
                ConnectionHandler.deleteNode(OrgProxy);

            },
            onCompleted: ({ deleteOrg }) => {
                if (deleteOrg.isError) {
                    displaySnack(deleteOrg.message);
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