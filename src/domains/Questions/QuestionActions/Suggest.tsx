import React from 'react';
import { Button } from '@material-ui/core';

import LightBulbIcon from 'icons/LightBulb';
import useEndpoint from 'hooks/useEndpoint';
import { addToPlaylist, deleteFromPlaylist } from '../api';

interface Props {
    questionId: string;
    townhallId: string;
    suggested?: boolean;
    className?: string;
}

function Suggest({ questionId, suggested, className, townhallId }: Props) {
    const endpoint = React.useCallback(
        () =>
            !suggested
                ? addToPlaylist(townhallId, questionId)
                : deleteFromPlaylist(townhallId, questionId),
        [townhallId, questionId, suggested]
    );
    const [run] = useEndpoint(endpoint);
    return (
        <Button
            color={suggested ? 'secondary' : 'inherit'}
            onClick={run}
            endIcon={<LightBulbIcon fontSize='small' />}
            fullWidth
            className={className}
        >
            Suggest Question
        </Button>
    );
}

Suggest.defaultProps = {
    suggested: false,
    className: undefined,
};

export default React.memo(Suggest);
