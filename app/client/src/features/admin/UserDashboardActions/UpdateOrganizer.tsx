import * as React from 'react';
import { Button, DialogContent, Typography } from '@mui/material';
import { useMutation, graphql } from 'react-relay';

import type { UpdateOrganizerMutation } from '@local/__generated__/UpdateOrganizerMutation.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useSnack } from '@local/core';
import { useRouter } from 'next/router';

export interface UpdateOrganizerProps {
    userId: string;
    canMakeOrgs: boolean;
}

export const UPDATE_ORGANIZER_MUTATION = graphql`
    mutation UpdateOrganizerMutation($input: UpdateOrganizerForm!) {
        updateOrganizer(input: $input) {
            isError
            message
            body {
                id
                email
            }
        }
    }
`;

function UpdateOrganizer({ userId, canMakeOrgs }: UpdateOrganizerProps) {
    const [isOpen, open, close] = useResponsiveDialog();
    const [commit] = useMutation<UpdateOrganizerMutation>(UPDATE_ORGANIZER_MUTATION);
    const { displaySnack } = useSnack();
    const router = useRouter();

    function handleSubmit() {
        try {
            commit({
                variables: { input: { id: userId, canMakeOrgs: !canMakeOrgs } },
                onCompleted(payload) {
                    try {
                        if (payload.updateOrganizer.isError) throw new Error(payload.updateOrganizer.message);
                        close();
                        displaySnack('Organizer Status Updated', { variant: 'success' });
                        router.reload();
                    } catch (err) {
                        if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
                        else displaySnack('Something went wrong!');
                    }
                },
            });
        } catch (err) {
            if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
            else displaySnack('Something went wrong!');
        }
    }

    return (
        <>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <Typography variant='h6'>
                        Are you sure you want to update the organizer status of this account?
                    </Typography>
                    <Button onClick={handleSubmit}>Update</Button>
                </DialogContent>
            </ResponsiveDialog>

            <Button variant='contained' color='primary' onClick={open}>
                {canMakeOrgs ? 'Demote To User' : 'Promote to Organizer'}
            </Button>
        </>
    );
}

export default React.memo(UpdateOrganizer);
