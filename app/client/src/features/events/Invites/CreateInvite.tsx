import * as React from 'react';
import { graphql, useMutation } from 'react-relay';

import { InviteForm, TInviteForm } from './InviteForm';

interface CreateInviteProps {
    onSubmit: () => void;
    eventId: string;
}

export const CREATE_INVITE_MUTATION = graphql`
    mutation CreateInviteMutation($input: CreateInvite!) {
        createInvite(input: $input) {
            isError
            message
        }
    }
`;

export const CreateInvite = ({ onSubmit, eventId }: CreateInviteProps) => {
    const [commit] = useMutation(CREATE_INVITE_MUTATION);

    function handleSubmit(form: TInviteForm) {
        commit({
            variables: { input: { ...form, eventId } },
            onCompleted(data) {
                onSubmit();
            },
        });
    }

    return <InviteForm onSubmit={handleSubmit} />;
};
