import * as React from 'react';
import { graphql, useMutation } from 'react-relay';

import { DeleteVideoMutation } from '@local/__generated__/DeleteVideoMutation.graphql';
import { ConfirmationDialog, ConfirmationDialogProps } from '@local/components/ConfirmationDialog';
import type { EventVideo } from '@local/graphql-types';

export const DELETE_VIDEO_MUTATION = graphql`
    mutation DeleteVideoMutation($input: DeleteVideo!) {
        removeVideo(input: $input) {
            id
        }
    }
`;

type DeleteVideoProps = ConfirmationDialogProps & { video: EventVideo | null; eventId: string };

export function DeleteVideo(props: DeleteVideoProps) {
    const { children, onConfirm, video, eventId, ...propsSubset } = props;
    const [commit] = useMutation<DeleteVideoMutation>(DELETE_VIDEO_MUTATION);
    const curryOnConfirm = () => {
        if (!video) return;
        commit({
            variables: { input: { id: video.id, eventId } },
            onCompleted: onConfirm,
        });
    };
    return (
        <ConfirmationDialog onConfirm={curryOnConfirm} {...propsSubset}>
            {children}
        </ConfirmationDialog>
    );
}
