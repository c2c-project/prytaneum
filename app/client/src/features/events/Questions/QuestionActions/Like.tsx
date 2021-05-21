import * as React from 'react';
import { Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUpOutlined';

// import useEndpoint from '@local/hooks/useEndpoint';
// import { createLike, deleteLike } from '../api';

interface Props {
    id: string;
    questionId: string;
    onLike?: () => void;
    onDeleteLike?: () => void;
    className?: string;
    liked?: boolean;
}

function Like({ className, questionId, id, liked, onLike, onDeleteLike }: Props) {
    const apiFn = React.useMemo(() => {
        // if (liked) return deleteLike;
        // return createLike;
    }, [liked]);
    const onSuccess = React.useMemo(() => {
        if (liked) return onDeleteLike;
        return onLike;
    }, [liked, onDeleteLike, onLike]);
    // const [run] = useEndpoint(() => apiFn(townhallId, questionId), {
    //     onSuccess,
    //     minWaitTime: 0,
    // });

    return (
        <Button
            color={liked ? 'secondary' : 'inherit'}
            onClick={() => console.log('??')}
            endIcon={<ThumbUpIcon fontSize='small' />}
            fullWidth
            className={className}
        >
            Like
        </Button>
    );
}

Like.defaultProps = {
    className: undefined,
    liked: false,
    onLike: undefined,
    onDeleteLike: undefined,
};

export default React.memo(Like);
