import { graphql, useMutation } from 'react-relay';

import type {
    UpdateSpeakerMutation,
    UpdateSpeakerMutationResponse,
} from '@local/__generated__/UpdateSpeakerMutation.graphql';
import { NullableFields } from '@local/utils/ts-utils';
import { SpeakerForm, TSpeakerForm } from './SpeakerForm';

const UPDATE_SPEAKER_MUTATION = graphql`
    mutation UpdateSpeakerMutation($input: UpdateSpeaker!) {
        updateSpeaker(input: $input) {
            isError
            message
            body {
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

export type TUpdatedSpeaker = UpdateSpeakerMutationResponse['updateSpeaker'];
export interface UpdateSpeakerProps {
    form: NullableFields<TSpeakerForm>;
    speakerId: string;
    eventId: string;
    onSubmit: (speaker: TUpdatedSpeaker) => void;
}

export function UpdateSpeaker({ form, speakerId, eventId, onSubmit }: UpdateSpeakerProps) {
    const [commit] = useMutation<UpdateSpeakerMutation>(UPDATE_SPEAKER_MUTATION);

    function handleSubmit(submittedForm: TSpeakerForm) {
        if (!eventId) return;
        commit({
            variables: {
                input: {
                    ...submittedForm,
                    eventId,
                    id: speakerId,
                },
            },
            onCompleted(results) {
                if (results.updateSpeaker) onSubmit(results.updateSpeaker);
            },
        });
    }

    return <SpeakerForm onSubmit={handleSubmit} form={form} />;
}
