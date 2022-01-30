import * as React from 'react';
import { Button } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import LockIcon from '@material-ui/icons/Lock';

import { useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useUser } from '@local/features/accounts';
import { LiveFeedbackDialog } from './LiveFeedbackDialog';

interface Props {
    className?: string;
    eventId: string;
}

export function SubmitLiveFeedback({ className, eventId }: Props) {
    const [isOpen, open, close] = useResponsiveDialog();
    const [user] = useUser();

    return (
        <>
            <LiveFeedbackDialog
                isOpen={isOpen}
                close={close}
                eventId={eventId}
            />

            <Button
                className={className}
                disabled={!user}
                variant='contained'
                color='primary'
                onClick={open}
                startIcon={user ? <QuestionAnswerIcon /> : <LockIcon />}
            >
                {user ? 'Submit Live Feedback' : 'Sign in to submit live feedback'}
            </Button>
        </>
    );
}