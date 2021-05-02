/* eslint-disable react/require-default-props */
import React from 'react';
import { Button, DialogContent } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import LockIcon from '@material-ui/icons/Lock';

import ResponsiveDialog from 'components/ResponsiveDialog';
import useUser from 'hooks/useUser';
import QuestionForm from '../QuestionForm';

interface Props {
    className?: string;
}

function AskQuestion({ className }: Props) {
    const [open, setOpen] = React.useState(false);
    const [user] = useUser();
    return (
        <>
            <ResponsiveDialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <QuestionForm onCancel={() => setOpen(false)} onSubmit={() => setOpen(false)} />
                </DialogContent>
            </ResponsiveDialog>

            <Button
                className={className}
                disabled={!user}
                variant='contained'
                color='primary'
                onClick={() => setOpen(true)}
                startIcon={user ? <QuestionAnswerIcon /> : <LockIcon />}
            >
                {user ? 'Ask My Question' : 'Sign in to ask a question'}
            </Button>
        </>
    );
}

export default React.memo(AskQuestion);
