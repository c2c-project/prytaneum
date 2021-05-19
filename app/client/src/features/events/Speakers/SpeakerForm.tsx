import * as React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
    SpeakerForm as CreateType,
    EventSpeaker,
    useAddSpeakerMutation,
    useUpdateSpeakerMutation,
} from '@local/graphql-types';
import { FormTitle } from '@local/components/FormTitle';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { TextField } from '@local/components/TextField';
import { useForm } from '@local/hooks/useForm';
import { useEvent } from '@local/hooks';
import { LoadingButton } from '@local/components/LoadingButton';

interface CommonProps {
    onSubmit: (speaker: EventSpeaker) => void;
}

interface CreateVideoProps {
    variant: 'create';
    form?: never;
    speakerId?: never;
}

interface UpdateVideoProps {
    variant: 'update';
    form: Omit<CreateType, 'eventId'>;
    speakerId: string;
}

type SpeakerFormProps = (UpdateVideoProps | CreateVideoProps) & CommonProps;

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
    },
}));

const initialState: Omit<CreateType, 'eventId'> = { title: '', description: '', pictureUrl: '', name: '', email: '' };

export function SpeakerForm({ form = initialState, speakerId = '', onSubmit, variant }: SpeakerFormProps) {
    const [{ eventId }] = useEvent();
    const [state, errors, handleSubmit, handleChange] = useForm(form);
    const classes = useStyles();

    const [addSpeaker, { loading: isAddLoading }] = useAddSpeakerMutation({
        variables: { input: { ...state, eventId } },
        onCompleted(results) {
            if (results.addSpeaker) onSubmit(results.addSpeaker);
        },
    });

    const [updateSpeaker, { loading: isUpdateLoading }] = useUpdateSpeakerMutation({
        variables: { input: { ...state, eventId, speakerId } },
        onCompleted(results) {
            if (results.updateSpeaker) onSubmit(results.updateSpeaker);
        },
    });

    const isLoading = isAddLoading || isUpdateLoading;

    const submit = () => {
        if (variant === 'create') addSpeaker();
        else if (variant === 'update') updateSpeaker();
        else {
            // blank on purpose -- should never get here
        }
    };

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <FormTitle title='Speaker Form' />
            <FormContent className={classes.root}>
                <TextField
                    error={Boolean(errors?.name)}
                    helperText={errors?.name}
                    required
                    label='Speaker Name'
                    value={state.name}
                    onChange={handleChange('name')}
                />
                <TextField
                    error={Boolean(errors?.title)}
                    helperText={errors?.title}
                    required
                    label='Speaker Title'
                    value={state.title}
                    onChange={handleChange('title')}
                />
                <TextField
                    error={Boolean(errors?.description)}
                    helperText={errors?.description}
                    required
                    label='Speaker Description'
                    value={state.description}
                    onChange={handleChange('description')}
                />
                <TextField
                    error={Boolean(errors?.pictureUrl)}
                    helperText={errors?.pictureUrl}
                    required
                    label='Picture URL'
                    value={state.pictureUrl}
                    onChange={handleChange('pictureUrl')}
                />
                <TextField
                    error={Boolean(errors?.email)}
                    helperText={errors?.email}
                    required
                    label="Speaker's Email"
                    value={state.email}
                    onChange={handleChange('email')}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justify: 'flex-end' }}>
                <LoadingButton loading={isLoading}>
                    <Button variant='contained' color='primary' type='submit'>
                        {variant === 'update' ? 'Update Speaker' : 'Add Speaker'}
                    </Button>
                </LoadingButton>
            </FormActions>
        </Form>
    );
}
