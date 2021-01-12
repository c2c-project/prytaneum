import React from 'react';
import { Button } from '@material-ui/core';
import QueueIcon from '@material-ui/icons/Queue';

import LoadingButton from 'components/LoadingButton';
import useEndpoint from 'hooks/useEndpoint';
import { addToQueue } from '../api';

interface Props {
    townhallId: string;
    questionId: string;
}

/**
 * Should only be used by moderators or when the user is a verified moderator
 */
function QueueButton({ townhallId, questionId }: Props) {
    const endpoint = React.useCallback(
        () => addToQueue(townhallId, questionId),
        [townhallId, questionId]
    );
    const [run, isLoading] = useEndpoint(endpoint);

    return (
        <LoadingButton loading={isLoading} style={{ color: 'white' }}>
            <Button
                fullWidth
                color='inherit'
                endIcon={<QueueIcon fontSize='small' />}
                onClick={run}
            >
                Queue
            </Button>
        </LoadingButton>
    );
}

export default React.memo(QueueButton);
