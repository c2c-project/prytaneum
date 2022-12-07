import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

import type { CreateOrganization } from '@local/graphql-types';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { FormTitle } from '@local/components/FormTitle';
import { FormActions } from '@local/components/FormActions';
import { LoadingButton } from '@local/components/LoadingButton';
import { useForm } from '@local/core/useForm';

export interface OrgFormProps {
    onSubmit: (result: TOrgFormState) => void;
}

const initialState: CreateOrganization = { name: '' };

export type TOrgFormState = typeof initialState;

type TSchema = {
    [key in keyof TOrgFormState]: Yup.AnySchema;
};
const validationSchema = Yup.object().shape<TSchema>({
    name: Yup.string()
        .max(100, 'Organization name must be less than 100 characters')
        .required('Please enter an organization name'),
});

export function OrgForm(props: OrgFormProps) {
    const { onSubmit } = props;

    const [state, errors, handleSubmit, handleChange] = useForm<TOrgFormState>(initialState, validationSchema);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle title='Create Organization' />
            <FormContent>
                <TextField
                    required
                    helperText={errors.name}
                    label='Organization Name'
                    name='name'
                    value={state.name}
                    fullWidth
                    onChange={handleChange('name')}
                    error={Boolean(errors.name)}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                <LoadingButton loading={false}>
                    <Button variant='contained' color='primary' type='submit'>
                        Create
                    </Button>
                </LoadingButton>
            </FormActions>
        </Form>
    );
}
