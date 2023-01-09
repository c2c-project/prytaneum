import { graphql, useMutation } from 'react-relay';

import type {
    CreateEventMutation,
    CreateEventMutationResponse,
} from '@local/__generated__/CreateEventMutation.graphql';
import { EventForm, TEventForm, EventFormProps } from './EventForm';

export const CREATE_EVENT_MUTATION = graphql`
    mutation CreateEventMutation($input: CreateEvent!, $connections: [ID!]!) {
        createEvent(event: $input) {
            isError
            message
            body @prependNode(connections: $connections, edgeTypeName: "EventEdge") {
                id
                title
                topic
                startDateTime
            }
        }
    }
`;

export type TCreatedEvent = NonNullable<CreateEventMutationResponse['createEvent']>;
export type CreateEventProps = {
    orgId: string;
    onSubmit?: (event: TCreatedEvent) => void;
    connections?: string[];
} & Omit<EventFormProps, 'onSubmit' | 'form'>;

export function CreateEvent({ orgId, onSubmit, connections, ...eventFormProps }: CreateEventProps) {
    const [commit] = useMutation<CreateEventMutation>(CREATE_EVENT_MUTATION);

    function handleSubmit(submittedForm: TEventForm) {
        commit({
            variables: {
                input: {
                    ...submittedForm,
                    orgId,
                },
                connections: connections || [],
            },
            onCompleted(results) {
                if (results.createEvent && onSubmit) onSubmit(results.createEvent);
            },
        });
    }

    return <EventForm {...eventFormProps} onSubmit={handleSubmit} />;
}
