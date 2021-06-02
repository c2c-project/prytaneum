import * as React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import type { CreateSpeaker as CreateType } from '@local/graphql-types';
import { FormTitle } from '@local/components/FormTitle';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { TextField } from '@local/components/TextField';
import { useForm } from '@local/hooks/useForm';
import { NullableFields, makeInitialState } from '@local/utils/ts-utils';

export type TSpeakerForm = Omit<CreateType, 'eventId' | 'id'>;
export interface SpeakerFormProps {
    onSubmit: (speaker: TSpeakerForm) => void;
    form?: NullableFields<TSpeakerForm>;
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
    },
}));

const initialState: TSpeakerForm = { title: '', description: '', pictureUrl: '', name: '', email: '' };

export function SpeakerForm({ form, onSubmit }: SpeakerFormProps) {
    const [state, errors, handleSubmit, handleChange] = useForm(makeInitialState(initialState, form));
    const classes = useStyles();

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
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
                <Button variant='contained' color='primary' type='submit'>
                    Submit
                </Button>
            </FormActions>
        </Form>
    );
}
