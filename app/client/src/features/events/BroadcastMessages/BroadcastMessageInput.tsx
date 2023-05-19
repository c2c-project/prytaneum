import { useForm, useSnack } from '@local/core';
import { BroadcastMessageInputMutation } from '@local/__generated__/BroadcastMessageInputMutation.graphql';
import { useRouter } from 'next/router';
import React from 'react';
import { graphql, useMutation } from 'react-relay';

import { Button, DialogContent, TextField, Typography } from '@mui/material';
import { Form, ResponsiveDialog, useResponsiveDialog } from '@local/components';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { BROADCAST_MESSAGE_MAX_LENGTH } from '@local/utils/rules';

export const BROADCAST_MESSAGE_MUTATION = graphql`
    mutation BroadcastMessageInputMutation($input: CreateBroadcastMessage!) {
        createBroadcastMessage(input: $input) {
            isError
            message
        }
    }
`;

export function BroadcastMessageInput() {
    const { displaySnack } = useSnack();
    const router = useRouter();
    const eventId = router.query.id as string;
    const [commit] = useMutation<BroadcastMessageInputMutation>(BROADCAST_MESSAGE_MUTATION);
    const [isOpen, open, close] = useResponsiveDialog();
    const [form, errors, handleSubmit, handleChange] = useForm({
        message: '',
    });

    const onSubmit = (state: { message: string }) => {
        try {
            commit({
                variables: { input: { eventId, broadcastMessage: state.message } },
                onCompleted(payload) {
                    close();
                    if (payload.createBroadcastMessage.isError) displaySnack('Something went wrong!');
                    else displaySnack('broadcasted message successfully!');
                },
            });
        } catch (err) {
            displaySnack(err.message);
        }
    };

    const isMessageValid = React.useMemo(
        () => form.message.trim().length !== 0 && form.message.length <= BROADCAST_MESSAGE_MAX_LENGTH,
        [form]
    );

    return (
        <React.Fragment>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormTitle title='Broadcast Message Form' />
                        <FormContent>
                            <TextField
                                id='broadcast-message-field'
                                name='broadcast-message'
                                label='Add your broadcast message for everyone to see'
                                autoFocus
                                error={Boolean(errors.message)}
                                helperText={errors.message}
                                required
                                multiline
                                value={form.message}
                                onChange={handleChange('message')}
                            />
                            <Typography
                                variant='caption'
                                color={form.message.length > BROADCAST_MESSAGE_MAX_LENGTH ? 'red' : 'black'}
                                sx={{
                                    display: 'block',
                                    textAlign: 'right',
                                }}
                            >
                                {form.message.length}/500
                            </Typography>
                        </FormContent>
                        <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                            <Button color='primary' onClick={close}>
                                Cancel
                            </Button>
                            <Button disabled={!isMessageValid} color='primary' type='submit'>
                                Submit
                            </Button>
                        </FormActions>
                    </Form>
                </DialogContent>
            </ResponsiveDialog>

            <Button variant='contained' color='primary' onClick={open}>
                Broadcast Message
            </Button>
        </React.Fragment>
    );
}
