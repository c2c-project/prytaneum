import { useMutation, graphql } from 'react-relay';

import type { CreateOrgMutation } from '@local/__generated__/CreateOrgMutation.graphql';
import { useSnack } from '@local/core';
import { OrgForm, OrgFormProps } from './OrgForm';

export const CREATE_ORG_MUTATION = graphql`
    mutation CreateOrgMutation($input: CreateOrganization!, $connections: [ID!]!) {
        createOrganization(input: $input) {
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

export type TCreateOrgProps = { connection: string; onSubmit?: () => void };

export function CreateOrg({ connection, onSubmit }: TCreateOrgProps) {
    const [commit] = useMutation<CreateOrgMutation>(CREATE_ORG_MUTATION);
    const { displaySnack } = useSnack();
    const handleSubmit: OrgFormProps['onSubmit'] = (submittedForm) => {
        commit({
            variables: {
                input: submittedForm,
                connections: !connection ? [] : [connection],
            },
            onCompleted({ createOrganization }) {
                if (createOrganization.isError) displaySnack(createOrganization.message, { variant: 'error' });
                else if (onSubmit) onSubmit();
            },
        });
    };
    return <OrgForm onSubmit={handleSubmit} />;
}
