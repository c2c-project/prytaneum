import * as React from 'react';
import { graphql, useMutation } from 'react-relay';

import type { DeleteSpeakerMutation } from '@local/__generated__/DeleteSpeakerMutation.graphql';
import { ConfirmationDialog, ConfirmationDialogProps } from '@local/components/ConfirmationDialog';

export const DELETE_SPEAKER_MUTATION = graphql`
    mutation DeleteSpeakerMutation($input: DeleteSpeaker!) {
        removeSpeaker(input: $input) {
            id
            eventId
            name
            description
            title
            pictureUrl
        }
    }
`;

type DeleteSpeakerProps = ConfirmationDialogProps & { speakerId?: string; eventId: string };

export function DeleteSpeaker(props: DeleteSpeakerProps) {
    const { children, onConfirm, speakerId, eventId, ...propsSubset } = props;
    const [commit] = useMutation<DeleteSpeakerMutation>(DELETE_SPEAKER_MUTATION);
    const curryOnConfirm = () => {
        if (!speakerId) return;
        commit({
            variables: { input: { id: speakerId, eventId } },
            onCompleted: onConfirm,
        });
    };
    return (
        <ConfirmationDialog onConfirm={curryOnConfirm} {...propsSubset}>
            {children}
        </ConfirmationDialog>
    );
}
