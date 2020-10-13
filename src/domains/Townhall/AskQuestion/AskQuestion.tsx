import React from 'react';
import { Button, DialogContent } from '@material-ui/core';

import Dialog from 'components/Dialog';
import QuestionForm from '../QuestionForm';

function AskQuestion() {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <QuestionForm
                        onSubmit={console.log} // FIXME:
                        onCancel={() => setOpen(false)}
                    />
                </DialogContent>
            </Dialog>
            <Button
                variant='contained'
                color='primary'
                fullWidth
                disableElevation
                onClick={() => setOpen(true)}
            >
                Ask A Question
            </Button>
        </>
    );
}

export default React.memo(AskQuestion);
