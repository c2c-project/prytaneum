import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import type { CreateSpeaker as CreateType } from '@local/graphql-types';
import { FormTitle } from '@local/components/FormTitle';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { NullableFields, makeInitialState } from '@local/utils/ts-utils';

export type TSpeakerForm = Omit<CreateType, 'eventId' | 'id'>;
export interface SpeakerFormProps {
    onSubmit: (speaker: TSpeakerForm) => void;
    form?: NullableFields<TSpeakerForm>;
}

type TSchema = {
    [key in keyof TSpeakerForm]: Yup.AnySchema;
};
const validationSchema = Yup.object().shape<TSchema>({
    title: Yup.string().required('Please enter a title'),
    description: Yup.string().required('Please enter a description'),
    pictureUrl: Yup.string().required('Please enter a picture URL'),
    name: Yup.string().required('Please enter a name'),
    email: Yup.string().email('Please enter a valid email').required('Please enter an email'),
});

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
    },
}));

const initialState: TSpeakerForm = { title: '', description: '', pictureUrl: '', name: '', email: '' };

export function SpeakerForm(props: SpeakerFormProps) {
    const { onSubmit, form } = props;

    const { handleSubmit, handleChange, values, errors } = useFormik<TSpeakerForm>({
        initialValues: makeInitialState(initialState, form),
        validationSchema,
        onSubmit,
    });

    const classes = useStyles();

    return (
        <Form onSubmit={handleSubmit}>
            <FormTitle title='Speaker Form' />
            <FormContent className={classes.root}>
                <TextField
                    error={Boolean(errors?.name)}
                    helperText={errors?.name}
                    required
                    label='Speaker Name'
                    value={values.name}
                    onChange={handleChange('name')}
                />
                <TextField
                    error={Boolean(errors?.title)}
                    helperText={errors?.title}
                    required
                    label='Speaker Title'
                    value={values.title}
                    onChange={handleChange('title')}
                />
                <TextField
                    error={Boolean(errors?.description)}
                    helperText={errors?.description}
                    required
                    label='Speaker Description'
                    value={values.description}
                    onChange={handleChange('description')}
                />
                <TextField
                    error={Boolean(errors?.pictureUrl)}
                    helperText={errors?.pictureUrl}
                    required
                    label='Picture URL'
                    value={values.pictureUrl}
                    onChange={handleChange('pictureUrl')}
                />
                <TextField
                    error={Boolean(errors?.email)}
                    helperText={errors?.email}
                    required
                    type='email'
                    label="Speaker's Email"
                    value={values.email}
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
