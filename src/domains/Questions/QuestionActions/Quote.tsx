import React from 'react';
import { Button, DialogContent } from '@material-ui/core';
import QuoteIcon from '@material-ui/icons/FormatQuote';
import type { Question } from 'prytaneum-typings';

import Dialog from 'components/Dialog';
import QuestionForm from '../QuestionForm';

interface Props {
    className?: string;
    question: Question;
}

function Quote({ className, question }: Props) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);
    return (
        <>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogContent>
                    <QuestionForm
                        onSubmit={handleClose}
                        quote={question}
                        onCancel={handleClose}
                    />
                </DialogContent>
            </Dialog>
            <Button
                color='inherit'
                onClick={handleOpen}
                endIcon={<QuoteIcon fontSize='small' />}
                fullWidth
                className={className}
            >
                Quote
            </Button>
        </>
    );
}

Quote.defaultProps = {
    className: undefined,
};

export default React.memo(Quote);
