import React from 'react';
import { Button } from '@material-ui/core';
import QueueIcon from '@material-ui/icons/QueueOutlined';

import useEndpoint from 'hooks/useEndpoint';
import { addToQueue } from '../api';

interface Props {
    townhallId: string;
    questionId: string;
    isQueued: boolean;
}

/**
 * Should only be used by moderators or when the user is a verified moderator
 */
function QueueButton({ townhallId, questionId, isQueued }: Props) {
    const endpoint = React.useCallback(() => addToQueue(townhallId, questionId), [townhallId, questionId]);
    const [run] = useEndpoint(endpoint);

    return (
        <Button
            fullWidth
            color={isQueued ? 'secondary' : 'inherit'}
            endIcon={<QueueIcon fontSize='small' />}
            onClick={run}
        >
            Enqueue
        </Button>
    );
}

export default React.memo(QueueButton);
