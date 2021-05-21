import * as React from 'react';
import { graphql, useMutation } from 'react-relay';

import type {
    CreateVideoMutation,
    CreateVideoMutationResponse,
} from '@local/__generated__/CreateVideoMutation.graphql';
import { VideoForm, TVideoForm } from './VideoForm';

interface CreateVideoProps {
    onSubmit: (res: CreateVideoMutationResponse['addVideo']) => void;
    eventId: string;
}

export const CREATE_VIDEO_MUTATION = graphql`
    mutation CreateVideoMutation($input: CreateVideo!) {
        addVideo(input: $input) {
            id
            url
            lang
        }
    }
`;

export const CreateVideo = ({ onSubmit, eventId }: CreateVideoProps) => {
    const [commit] = useMutation<CreateVideoMutation>(CREATE_VIDEO_MUTATION);

    function handleSubmit(form: TVideoForm) {
        commit({
            variables: { input: { ...form, eventId } },
            onCompleted(data) {
                if (data.addVideo) onSubmit(data.addVideo);
            },
        });
    }

    return <VideoForm onSubmit={handleSubmit} />;
};
