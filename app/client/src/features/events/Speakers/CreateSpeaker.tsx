import { graphql, useMutation } from 'react-relay';

import type {
    CreateSpeakerMutation,
    CreateSpeakerMutationResponse,
} from '@local/__generated__/CreateSpeakerMutation.graphql';
import { SpeakerForm, TSpeakerForm } from './SpeakerForm';

const CREATE_SPEAKER_MUTATION = graphql`
    mutation CreateSpeakerMutation($input: CreateSpeaker!, $connections: [ID!]!) {
        createSpeaker(input: $input) {
            isError
            message
            body @appendNode(connections: $connections, edgeTypeName: "EventSpeakerEdge") {
                id
                eventId
                name
                description
                title
                pictureUrl
                email
            }
        }
    }
`;

export type TCreatedSpeaker = CreateSpeakerMutationResponse['createSpeaker'];
export interface CreateSpeakerProps {
    eventId: string;
    onSubmit: (speaker: TCreatedSpeaker) => void;
    connections?: string[];
}

export function CreateSpeaker({ eventId, onSubmit, connections }: CreateSpeakerProps) {
    const [commit] = useMutation<CreateSpeakerMutation>(CREATE_SPEAKER_MUTATION);

    function handleSubmit(form: TSpeakerForm) {
        commit({
            variables: {
                input: {
                    ...form,
                    eventId,
                },
                connections: connections ?? [],
            },
            onCompleted(results) {
                console.log(results);
                if (results.createSpeaker) onSubmit(results.createSpeaker);
            },
        });
    }

    return <SpeakerForm onSubmit={handleSubmit} />;
}
