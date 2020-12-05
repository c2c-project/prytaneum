/* eslint-disable no-console */ // FIXME:
import React from 'react';
import { Container } from '@material-ui/core';

import ConfirmationDialog from './ConfirmationDialog';

export default { title: 'Components/Confirmation Dialog' };

export function Basic() {
    const [open, setOpen] = React.useState(false);
    return (
        <Container maxWidth='md'>
            <button onClick={() => setOpen(true)} type='button'>
                open
            </button>
            <ConfirmationDialog
                title='Storybook'
                open={open}
                onConfirm={() => console.log('confirmed')}
                onClose={() => setOpen(false)}
            >
                Some text that should be read before proceeding further.
            </ConfirmationDialog>
        </Container>
    );
}
