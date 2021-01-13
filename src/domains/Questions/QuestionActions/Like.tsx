import React from 'react';
import { Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import useEndpoint from 'hooks/useEndpoint';
import LoadingButton from 'components/LoadingButton';
import { createLike, deleteLike } from '../api';

interface Props {
    townhallId: string;
    questionId: string;
    onLike?: () => void;
    onDeleteLike?: () => void;
    className?: string;
    liked?: boolean;
}

function Like({
    className,
    questionId,
    townhallId,
    liked,
    onLike,
    onDeleteLike,
}: Props) {
    const apiFn = React.useMemo(() => {
        if (liked) return deleteLike;
        return createLike;
    }, [liked]);
    const onSuccess = React.useMemo(() => {
        if (liked) return onDeleteLike;
        return onLike;
    }, [liked, onDeleteLike, onLike]);
    const [run, isLoading] = useEndpoint(() => apiFn(townhallId, questionId), {
        onSuccess,
    });

    return (
        <LoadingButton loading={isLoading}>
            <Button
                color={liked ? 'secondary' : 'inherit'}
                onClick={run}
                endIcon={<ThumbUpIcon fontSize='small' />}
                fullWidth
                className={className}
            >
                Like
            </Button>
        </LoadingButton>
    );
}

Like.defaultProps = {
    className: undefined,
    liked: false,
    onLike: undefined,
    onDeleteLike: undefined,
};

export default React.memo(Like);
