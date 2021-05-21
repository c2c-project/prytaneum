import { graphql, useMutation } from 'react-relay';

import type {
    CreateSpeakerMutation,
    CreateSpeakerMutationResponse,
} from '@local/__generated__/CreateSpeakerMutation.graphql';
import { SpeakerForm, TSpeakerForm } from './SpeakerForm';

const CREATE_SPEAKER_MUTATION = graphql`
    mutation CreateSpeakerMutation($input: SpeakerForm) {
        addSpeaker(input: $input) {
            id
            eventId
            name
            description
            title
            pictureUrl
            email
        }
    }
`;

export type TCreatedSpeaker = CreateSpeakerMutationResponse['addSpeaker'];
export interface CreateSpeakerProps {
    eventId: string;
    onSubmit: (speaker: TCreatedSpeaker) => void;
}

export function CreateSpeaker({ eventId, onSubmit }: CreateSpeakerProps) {
    const [commit] = useMutation<CreateSpeakerMutation>(CREATE_SPEAKER_MUTATION);

    function handleSubmit(form: TSpeakerForm) {
        commit({
            variables: {
                input: {
                    ...form,
                    eventId,
                },
            },
            onCompleted(results) {
                if (results.addSpeaker) onSubmit(results.addSpeaker);
            },
        });
    }

    return <SpeakerForm onSubmit={handleSubmit} />;
}
