import * as React from 'react';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

import { Form } from '@local/components';
import { useForm } from '@local/core';
import type { CreateSpeaker as CreateType } from '@local/graphql-types';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';

export type TSpeakerForm = Omit<CreateType, 'eventId' | 'id'>;
export interface SpeakerFormProps {
    onSubmit: (speaker: TSpeakerForm) => void;
    form?: TSpeakerForm;
}

type TSchema = {
    [key in keyof TSpeakerForm]: Yup.AnySchema;
};
const validationSchema = Yup.object().shape<TSchema>({
    title: Yup.string().required('Please enter a title'),
    description: Yup.string().required('Please enter a description'),
    pictureUrl: Yup.string().url('Please enter a valid URL'),
    name: Yup.string().required('Please enter a name'),
    email: Yup.string().email('Please enter a valid email'),
});

const initialState: TSpeakerForm = { title: '', description: '', pictureUrl: '', name: '', email: '' };

export function SpeakerForm(props: SpeakerFormProps) {
    const { onSubmit, form } = props;

    const [state, errors, handleSubmit, handleChange] = useForm<TSpeakerForm>(form || initialState, validationSchema);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle title='Speaker Form' />
            <FormContent>
                <TextField
                    error={Boolean(errors?.name)}
                    helperText={errors?.name}
                    required
                    label='Speaker Name'
                    name='name'
                    value={state.name}
                    onChange={handleChange('name')}
                />
                <TextField
                    error={Boolean(errors?.title)}
                    helperText={errors?.title}
                    required
                    label='Speaker Title'
                    name='title'
                    value={state.title}
                    onChange={handleChange('title')}
                />
                <TextField
                    error={Boolean(errors?.description)}
                    helperText={errors?.description}
                    required
                    label='Speaker Description'
                    name='description'
                    value={state.description}
                    onChange={handleChange('description')}
                />
                <TextField
                    error={Boolean(errors?.pictureUrl)}
                    helperText={errors?.pictureUrl}
                    label='Picture URL'
                    name='pictureUrl'
                    value={state.pictureUrl}
                    onChange={handleChange('pictureUrl')}
                />
                <TextField
                    error={Boolean(errors?.email)}
                    helperText={errors?.email}
                    type='email'
                    label="Speaker's Email"
                    name='email'
                    value={state.email}
                    onChange={handleChange('email')}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                <Button variant='contained' color='primary' type='submit'>
                    Submit
                </Button>
            </FormActions>
        </Form>
    );
}
