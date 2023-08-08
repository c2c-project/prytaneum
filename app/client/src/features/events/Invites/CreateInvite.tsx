import * as React from 'react';
import { graphql, useMutation } from 'react-relay';

import { useSnack } from '@local/core/useSnack';
import { InviteForm, InviteFormProps } from './InviteForm';
import { CreateInviteMutation } from '@local/__generated__/CreateInviteMutation.graphql';

interface CreateInviteProps {
    onSubmit?: () => void;
    eventId: string;
}

export const CREATE_INVITE_MUTATION = graphql`
    mutation CreateInviteMutation($input: CreateInvite!) {
        createInvite(input: $input) {
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

export const CreateInvite = ({ onSubmit, eventId }: CreateInviteProps) => {
    const [commit] = useMutation<CreateInviteMutation>(CREATE_INVITE_MUTATION);
    const { displaySnack } = useSnack();

    const handleSubmit: InviteFormProps['onSubmit'] = (submittedForm) => {
        commit({
            variables: { input: { ...submittedForm, eventId } },
            onCompleted({ createInvite }) {
                if (createInvite.isError) displaySnack(createInvite.message, { variant: 'error' });
                else {
                    displaySnack('User invited', { variant: 'success' });
                    if (onSubmit) onSubmit();
                }
            },
        });
    };

    return <InviteForm onSubmit={handleSubmit} />;
};
