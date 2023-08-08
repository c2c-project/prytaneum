import * as React from 'react';
import { graphql, useMutation } from 'react-relay';

import { useSnack } from '@local/core/useSnack';
import { UninviteUserMutation } from '@local/__generated__/UninviteUserMutation.graphql';
import { Button } from '@mui/material';

interface UinviteUserProps {
    onSubmit?: () => void;
    eventId: string;
    userId: string;
}

export const UNINVITE_USER_MUTATION = graphql`
    mutation UninviteUserMutation($eventId: ID!, $userId: ID!) {
        uninviteUser(eventId: $eventId, userId: $userId) {
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

export const UninviteUser = ({ onSubmit, eventId, userId }: UinviteUserProps) => {
    const [commit] = useMutation<UninviteUserMutation>(UNINVITE_USER_MUTATION);
    const { displaySnack } = useSnack();

    const handleSubmit = () => {
        commit({
            variables: { eventId, userId },
            onCompleted({ uninviteUser }) {
                if (uninviteUser.isError) displaySnack(uninviteUser.message, { variant: 'error' });
                else {
                    displaySnack('User uninvited', { variant: 'success' });
                    if (onSubmit) onSubmit();
                }
            },
        });
    };

    return <Button onClick={handleSubmit}>Uninvite</Button>;
};
