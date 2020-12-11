import React from 'react';
import { Button, DialogContent } from '@material-ui/core';
import type { QuestionForm as QuestionFormType } from 'prytaneum-typings';

import { TownhallContext } from 'domains/Townhall/Contexts/Townhall';
import Dialog from 'components/Dialog';
import useEndpoint from 'hooks/useEndpoint';
import useSnack from 'hooks/useSnack';
import QuestionForm from '../QuestionForm';
import { createQuestion } from '../api';

function AskQuestion() {
    const [open, setOpen] = React.useState(false);
    const townhall = React.useContext(TownhallContext);
    const formRef = React.useRef<QuestionFormType>();
    const [snack] = useSnack();
    const memoizedEndpoint = React.useCallback(
        () => createQuestion(townhall._id, formRef.current as QuestionFormType),
        [townhall._id]
    );
    const [post, isLoading] = useEndpoint(memoizedEndpoint, {
        onSuccess: () => {
            snack('Successfully submitted question!');
            setOpen(false);
        },
    });

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <QuestionForm
                        isLoading={isLoading}
                        onSubmit={(form) => {
                            formRef.current = form;
                            post();
                        }}
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
