import { Button } from '@material-ui/core';

import { LoadingButton } from '@local/components/LoadingButton';
import { TextField } from '@local/components/TextField';
import { useForm } from '@local/hooks/useForm';
import { CreateOrg, useCreateOrgMutation, Organization } from '@local/graphql-types';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { FormTitle } from '@local/components/FormTitle';
import { FormActions } from '@local/components/FormActions';

export interface CreateOrgProps {
    onSubmit: (result: Organization) => void;
}

const intiialState: CreateOrg = { name: '' };

export function OrgForm({ onSubmit }: CreateOrgProps) {
    // form state hook
    const [state, errors, handleSubmit, handleChange] = useForm(intiialState);

    const [createOrg, { loading }] = useCreateOrgMutation({
        variables: { input: state },
        onCompleted: (result) => {
            if (result.createOrganization) onSubmit(result.createOrganization);
        },
    });

    return (
        <Form onSubmit={handleSubmit(createOrg)}>
            <FormTitle title='Create Organization' />
            <FormContent>
                <TextField
                    required
                    helperText={errors.name}
                    label='Organization Name'
                    fullWidth
                    onChange={handleChange('name')}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justify: 'flex-end' }}>
                <LoadingButton loading={loading}>
                    <Button variant='contained' color='primary' type='submit'>
                        Create
                    </Button>
                </LoadingButton>
            </FormActions>
        </Form>
    );
}
