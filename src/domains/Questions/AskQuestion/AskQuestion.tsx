import React from 'react';
import { Button, DialogContent } from '@material-ui/core';

import ResponsiveDialog from 'components/ResponsiveDialog';
import useUser from 'hooks/useUser';
import QuestionForm from '../QuestionForm';

function AskQuestion() {
    const [open, setOpen] = React.useState(false);
    const [user] = useUser();
    return (
        <>
            <ResponsiveDialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <QuestionForm
                        onCancel={() => setOpen(false)}
                        onSubmit={() => setOpen(false)}
                    />
                </DialogContent>
            </ResponsiveDialog>
            <Button
                disabled={!user}
                variant='contained'
                color='primary'
                fullWidth
                onClick={() => setOpen(true)}
                disableElevation
            >
                Ask A Question
            </Button>
        </>
    );
}

export default React.memo(AskQuestion);
