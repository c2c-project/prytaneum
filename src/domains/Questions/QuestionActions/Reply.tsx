import React from 'react';
import { Button, DialogContent } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import type { Question } from 'prytaneum-typings';

import Dialog from 'components/Dialog';
import ReplyForm from '../ReplyForm';

interface Props {
    className?: string;
    question: Question;
}

function Reply({ className, question }: Props) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);
    return (
        <>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogContent>
                    <ReplyForm
                        onSubmit={handleClose}
                        replyTo={question}
                        onCancel={handleClose}
                    />
                </DialogContent>
            </Dialog>
            <Button
                color='inherit'
                onClick={handleOpen}
                endIcon={<ReplyIcon fontSize='small' />}
                fullWidth
                className={className}
            >
                Reply
            </Button>
        </>
    );
}

Reply.defaultProps = {
    className: undefined,
};

export default React.memo(Reply);
