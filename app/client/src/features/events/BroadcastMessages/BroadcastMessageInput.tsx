import { useSnack } from '@local/core';
import { EventLiveMutation } from '@local/__generated__/EventLiveMutation.graphql';
import { useRouter } from 'next/router';
import React from 'react';
import { graphql, useMutation } from 'react-relay';

export const BROADCAST_MESSAGE_MUTATION = graphql`
    mutation EventLiveMutation($input: CreateBroadcastMessage!) {
        createBroadcastMessage(input: $input) {
            isError
            message
        }
    }
`;
export function BroadcastMessageInput() {
    const { displaySnack } = useSnack();
    const router = useRouter();
    const eventId = router.query.id as string;
    const [commit] = useMutation<EventLiveMutation>(BROADCAST_MESSAGE_MUTATION);
    const [broadcastMessage, setBroadcastMessage] = React.useState('');

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            commit({
                variables: { input: { eventId, broadcastMessage } },
                onCompleted(payload) {
                    if (payload.createBroadcastMessage.isError) displaySnack('Something went wrong!');
                    else displaySnack('broadcasted message successfully!');
                },
            });
        } catch (err) {
            displaySnack(err.message);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Broadcast message:
                <input type='text' value={broadcastMessage} onChange={(e) => setBroadcastMessage(e.target.value)} />
            </label>
            <input type='submit' value='send' />
        </form>
    );
}
