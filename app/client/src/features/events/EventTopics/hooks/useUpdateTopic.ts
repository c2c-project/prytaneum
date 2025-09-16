import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';

import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import { useUpdateTopicMutation } from '@local/__generated__/useUpdateTopicMutation.graphql';
import { Topic } from '../types';

const USE_UPDATE_TOPIC = graphql`
    mutation useUpdateTopicMutation(
        $eventId: String!
        $oldTopic: String!
        $newTopic: String!
        $description: String!
        $manual: Boolean!
    ) {
        updateTopic(
            eventId: $eventId
            oldTopic: $oldTopic
            newTopic: $newTopic
            description: $description
            manual: $manual
        ) {
            body {
                topic
                description
            }
            isError
            message
        }
    }
`;

export function useUpdateTopic() {
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<useUpdateTopicMutation>(USE_UPDATE_TOPIC);

    const updateTopic = (
        oldTopic: Topic,
        newTopic: Topic,
        onSuccess: () => void,
        onFailure?: () => void,
        manual?: boolean
    ) => {
        commit({
            variables: {
                eventId,
                oldTopic: oldTopic.topic,
                newTopic: newTopic.topic,
                description: newTopic.description,
                manual: !!manual,
            },
            onCompleted: (response) => {
                try {
                    if (!response.updateTopic) throw new Error('An error occurred while updating the topic');
                    if (response.updateTopic.isError) throw new Error(response.updateTopic.message);
                    displaySnack('Topic updated successfully', { variant: 'success' });
                    onSuccess();
                } catch (error) {
                    if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
                    else displaySnack('An error occurred while updating the topic', { variant: 'error' });
                    if (onFailure) onFailure();
                }
            },
            onError: (error) => {
                displaySnack(error.message, { variant: 'error' });
                if (onFailure) onFailure();
            },
        });
    };

    return { updateTopic };
}
