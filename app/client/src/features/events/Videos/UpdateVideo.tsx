import * as React from 'react';
import { graphql, useMutation } from 'react-relay';

import type {
    UpdateVideoMutation,
    UpdateVideoMutationResponse,
} from '@local/__generated__/UpdateVideoMutation.graphql';
import { VideoForm, TVideoForm } from './VideoForm';

interface CreateVideoProps {
    onSubmit: (res: UpdateVideoMutationResponse['updateVideo']) => void;
    eventId: string;
    video: TVideoForm & { id: string };
}

export const UPDATE_VIDEO_MUTATION = graphql`
    mutation UpdateVideoMutation($input: UpdateVideo!) {
        updateVideo(input: $input) {
            isError
            message
            body {
                id
                url
                lang
            }
        }
    }
`;

export const UpdateVideo = ({ onSubmit, eventId, video }: CreateVideoProps) => {
    const [commit] = useMutation<UpdateVideoMutation>(UPDATE_VIDEO_MUTATION);

    function handleSubmit(form: TVideoForm) {
        commit({
            variables: { input: { ...form, eventId, videoId: video.id } },
            onCompleted(data) {
                if (data.updateVideo) onSubmit(data.updateVideo);
            },
        });
    }

    return <VideoForm onSubmit={handleSubmit} form={{ url: video.url, lang: video.lang }} />;
};
