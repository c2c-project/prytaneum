import { graphql, useMutation } from 'react-relay';

import type { CreateMemberMutation } from '@local/__generated__/CreateMemberMutation.graphql';
import { MemberForm, MemberFormProps } from './MemberForm';

const CREATE_MEMBER_MUTATION = graphql`
    mutation CreateMemberMutation($input: CreateMember!, $connections: [ID!]!) {
        createMember(input: $input) {
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

export interface CreateMemberProps {
    orgId: string;
    onSubmit: () => void;
    connections: string[];
}

export function CreateMember({ orgId, onSubmit, connections }: CreateMemberProps) {
    const [commit] = useMutation<CreateMemberMutation>(CREATE_MEMBER_MUTATION);

    const handleSubmit: MemberFormProps['onSubmit'] = (submittedForm) => {
        commit({
            variables: {
                input: {
                    email: submittedForm.email,
                    orgId,
                },
                connections,
            },
            onCompleted: onSubmit,
        });
    };

    return <MemberForm onSubmit={handleSubmit} />;
}
