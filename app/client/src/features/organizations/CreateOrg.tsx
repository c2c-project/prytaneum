import { useMutation, graphql } from 'react-relay';

import type { CreateOrgMutation } from '@local/__generated__/CreateOrgMutation.graphql';
import { useSnack } from '@local/hooks';
import { OrgForm, OrgFormProps } from './OrgForm';

export const CREATE_ORG_MUTATION = graphql`
    mutation CreateOrgMutation($input: CreateOrganization!) {
        createOrganization(input: $input) {
            isError
            message
            body {
                id
                name
                createdAt
            }
        }
    }
`;

type TResponse = NonNullable<CreateOrgMutation['response']['createOrganization']['body']>;
export interface CreateOrgProps {
    onSubmit: (createdOrg: TResponse) => void;
}

export function CreateOrg({ onSubmit }: CreateOrgProps) {
    const [commit] = useMutation<CreateOrgMutation>(CREATE_ORG_MUTATION);
    const [snack] = useSnack();
    const handleSubmit: OrgFormProps['onSubmit'] = (submittedForm) => {
        commit({
            variables: {
                input: submittedForm,
            },
            onCompleted({ createOrganization }) {
                if (createOrganization.isError) snack(createOrganization.message);
                else if (createOrganization.body) {
                    onSubmit(createOrganization.body);
                }
            },
        });
    };
    return <OrgForm onSubmit={handleSubmit} />;
}
