import React from 'react';
import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';

import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import { useAddTopicMutation } from '@local/__generated__/useAddTopicMutation.graphql';
import { Topic } from '../types';
import { TopicContext } from '../EventTopicSettings';

const USE_ADD_TOPIC = graphql`
    mutation useAddTopicMutation($eventId: String!, $topic: String!, $description: String!, $manual: Boolean!) {
        addTopic(eventId: $eventId, topic: $topic, description: $description, manual: $manual) {
            isError
            message
        }
    }
`;

export function useAddTopic() {
    const { eventId } = useEvent();
    const { topics } = React.useContext(TopicContext);
    const { displaySnack } = useSnack();
    const [commit] = useMutation<useAddTopicMutation>(USE_ADD_TOPIC);

    const addTopic = (newTopic: Topic, onSuccess: () => void, onFailure?: () => void, manual?: boolean) => {
        // Validate that the new topic is unique
        if (topics.find((topic) => topic.topic === newTopic.topic)) {
            displaySnack('Topic already exists, please ensure it is unique.', { variant: 'error' });
            return;
        }
        commit({
            variables: { eventId, topic: newTopic.topic, description: newTopic.description, manual: !!manual },
            onCompleted: (response) => {
                try {
                    if (!response.addTopic) throw new Error('An error occurred while adding topic');
                    if (response.addTopic.isError) throw new Error(response.addTopic.message);
                    displaySnack('Topic added successfully', { variant: 'success' });
                    onSuccess();
                } catch (error) {
                    if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
                    else displaySnack('An error occurred while adding topic', { variant: 'error' });
                    if (onFailure) onFailure();
                }
            },
            onError: (error) => {
                displaySnack(error.message, { variant: 'error' });
                if (onFailure) onFailure();
            },
        });
    };

    return { addTopic };
}
