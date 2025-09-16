import * as React from 'react';
import { Fab, DialogContent } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useFragment } from 'react-relay';

import type { OrgEventListFragment$key } from '@local/__generated__/OrgEventListFragment.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { CreateEvent } from '@local/features/events';
import { EVENT_FRAGMENT } from './OrgEventList';

interface CreateEventFabProps {
    fragmentRef: OrgEventListFragment$key;
}

export const CreateEventFab = ({ fragmentRef }: CreateEventFabProps) => {
    const data = useFragment(EVENT_FRAGMENT, fragmentRef);
    const [isOpen, open, close] = useResponsiveDialog(false);

    return (
        <>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <CreateEvent
                        formType='Create'
                        connections={data.events ? [data.events.__id] : []}
                        orgId={data.id}
                        onCancel={close}
                        onSubmit={close}
                    />
                </DialogContent>
            </ResponsiveDialog>
            <Fab
                color='primary'
                aria-label='add'
                onClick={open}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                }}
            >
                <Add />
            </Fab>
        </>
    );
};
