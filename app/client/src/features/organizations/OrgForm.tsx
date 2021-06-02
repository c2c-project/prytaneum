import { Button } from '@material-ui/core';

import { LoadingButton } from '@local/components/LoadingButton';
import { TextField } from '@local/components/TextField';
import { useForm } from '@local/hooks/useForm';
import { CreateOrg } from '@local/graphql-types';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { FormTitle } from '@local/components/FormTitle';
import { FormActions } from '@local/components/FormActions';

export interface OrgFormProps {
    onSubmit: (result: TOrgFormState) => void;
}

const intialState: CreateOrg = { name: '' };

export type TOrgFormState = typeof intialState;

export function OrgForm({ onSubmit }: OrgFormProps) {
    const [state, errors, handleSubmit, handleChange] = useForm(intialState);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle title='Create Organization' />
            <FormContent>
                <TextField
                    required
                    helperText={errors.name}
                    label='Organization Name'
                    value={state.name}
                    fullWidth
                    onChange={handleChange('name')}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justify: 'flex-end' }}>
                <LoadingButton loading={false}>
                    <Button variant='contained' color='primary' type='submit'>
                        Create
                    </Button>
                </LoadingButton>
            </FormActions>
        </Form>
    );
}
