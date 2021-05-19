/* eslint-disable arrow-body-style */
import * as React from 'react';
import { Button } from '@material-ui/core';

import { EventVideo, useAddVideoMutation, useUpdateVideoMutation } from '@local/graphql-types';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { TextField } from '@local/components/TextField';
import { useForm } from '@local/hooks/useForm';
import { FormTitle } from '@local/components/FormTitle';
import { LoadingButton } from '@local/components/LoadingButton';
import { useEvent } from '@local/hooks';

interface CommonProps {
    onSubmit: (video: EventVideo) => void;
}

interface CreateVideoProps {
    variant: 'create';
    form?: never;
}

interface UpdateVideoProps {
    variant: 'update';
    form: EventVideo;
}

type VideoFormProps = (CreateVideoProps | UpdateVideoProps) & CommonProps;

export const VideoForm = ({ form = { url: '', lang: '' }, onSubmit, variant }: VideoFormProps) => {
    const [state, errors, handleSubmit, handleChange] = useForm(form);
    const [{ eventId }] = useEvent();
    const [addVideo, { loading: isAddLoading }] = useAddVideoMutation({
        variables: { input: { ...state, eventId } },
        onCompleted(results) {
            if (results.addVideo) onSubmit(results.addVideo);
        },
    });

    const [updatevideo, { loading: isUpdateLoading }] = useUpdateVideoMutation({
        onCompleted(results) {
            if (results.updateVideo) onSubmit(results.updateVideo);
        },
    });
    const isLoading = isAddLoading || isUpdateLoading;

    const submit = () => {
        if (variant === 'create') addVideo();
        else if (variant === 'update')
            updatevideo({ variables: { input: { url: form.url, newUrl: state.url, lang: state.lang, eventId } } });
        else {
            // do nothing because no variant specified
        }
    };

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <FormTitle title='Video Form' />
            <FormContent>
                <TextField
                    helperText={errors.lang}
                    value={state.lang}
                    label='Language'
                    onChange={handleChange('lang')}
                />
                <TextField helperText={errors.url} value={state.url} label='Video URL' onChange={handleChange('url')} />
            </FormContent>
            <FormActions disableGrow gridProps={{ justify: 'flex-end' }}>
                <LoadingButton loading={isLoading}>
                    <Button variant='contained' color='primary' type='submit'>
                        Submit
                    </Button>
                </LoadingButton>
            </FormActions>
        </Form>
    );
};
