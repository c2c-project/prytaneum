import React from 'react';
import { Button, DialogContent } from '@material-ui/core';

import { TownhallContext } from 'domains/Townhall/Contexts/Townhall';
import Dialog from 'components/Dialog';
import QuestionForm from '../QuestionForm';
import { createQuestion } from '../api';

function AskQuestion() {
    const [open, setOpen] = React.useState(false);
    const townhall = React.useContext(TownhallContext);
    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <QuestionForm
                        onSubmit={(form) => createQuestion(townhall._id, form)}
                        onCancel={() => setOpen(false)}
                    />
                </DialogContent>
            </Dialog>
            <Button
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
