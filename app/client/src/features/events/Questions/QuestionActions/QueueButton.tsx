import * as React from 'react';
import { Button } from '@material-ui/core';
import QueueIcon from '@material-ui/icons/QueueOutlined';
import { useEvent } from '@local/hooks';

// import useEndpoint from '@local/hooks/useEndpoint';
// import { addToQueue } from '../api';

interface Props {
    questionId: string;
    isQueued: boolean;
}

/**
 * Should only be used by moderators or when the user is a verified moderator
 */
export function QueueButton({ questionId, isQueued }: Props) {
    // const endpoint = React.useCallback(() => addToQueue(townhallId, questionId), [townhallId, questionId]);
    // const [run] = useEndpoint(endpoint);
    const [{ id }] = useEvent();
    return (
        <Button
            fullWidth
            color={isQueued ? 'secondary' : 'inherit'}
            endIcon={<QueueIcon fontSize='small' />}
            onClick={() => console.log('??')}
        >
            Enqueue
        </Button>
    );
}
