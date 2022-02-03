import * as React from 'react';
import { Button } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import LockIcon from '@material-ui/icons/Lock';

import { useUser } from '@local/features/accounts';

export interface AskQuestionProps {
    className?: string;
    open: () => void;
}

function AskQuestion({ open, className }: AskQuestionProps) {
    const [user] = useUser();

    return (
        <Button
            className={className}
            disabled={!user}
            variant='contained'
            color='primary'
            onClick={open}
            startIcon={user ? <QuestionAnswerIcon /> : <LockIcon />}
        >
            {user ? 'Ask a Question' : 'Sign in to ask a question'}
        </Button>
    );
}

export default React.memo(AskQuestion);
