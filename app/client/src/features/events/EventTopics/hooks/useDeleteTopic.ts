import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';

import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import { useDeleteTopicMutation } from '@local/__generated__/useDeleteTopicMutation.graphql';
import { Topic } from '../types';

const USE_DELETE_TOPIC = graphql`
    mutation useDeleteTopicMutation($eventId: String!, $topic: String!, $manual: Boolean!) {
        removeTopic(eventId: $eventId, topic: $topic, manual: $manual) {
            isError
            message
        }
    }
`;

export function useDeleteTopic() {
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<useDeleteTopicMutation>(USE_DELETE_TOPIC);

    const deleteTopic = (topic: Topic, onSuccess: () => void, onFailure?: () => void, manual?: boolean) => {
        commit({
            variables: { eventId, topic: topic.topic, manual: !!manual },
            onCompleted: (response) => {
                try {
                    if (!response.removeTopic) throw new Error('An error occurred while deleting topic');
                    if (response.removeTopic.isError) throw new Error(response.removeTopic.message);
                    displaySnack('Topic deleted successfully', { variant: 'success' });
                    onSuccess();
                } catch (error) {
                    if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
                    else displaySnack('An error occurred while deleting topic', { variant: 'error' });
                    if (onFailure) onFailure();
                }
            },
            onError: (error) => {
                displaySnack(error.message, { variant: 'error' });
                if (onFailure) onFailure();
            },
        });
    };

    return { deleteTopic };
}
