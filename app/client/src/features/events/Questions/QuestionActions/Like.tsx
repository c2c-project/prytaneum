import * as React from 'react';
import { Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUpOutlined';
import { graphql, useMutation, useFragment } from 'react-relay';

import { useUser } from '@local/hooks';
import type { LikeMutation } from '@local/__generated__/LikeMutation.graphql';
import type { LikeFragment$key } from '@local/__generated__/LikeFragment.graphql';

const LIKE_FRAGMENT = graphql`
    fragment LikeFragment on EventQuestion {
        id
        isLikedByViewer
    }
`;

const LIKE_MUTATION = graphql`
    mutation LikeMutation($input: AlterLike!) {
        alterLike(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    isLikedByViewer
                }
            }
        }
    }
`;

interface Props {
    fragmentRef: LikeFragment$key;
    className?: string;
}

export function Like({ className = undefined, fragmentRef }: Props) {
    const { id: questionId, isLikedByViewer } = useFragment(LIKE_FRAGMENT, fragmentRef);
    const [commit] = useMutation<LikeMutation>(LIKE_MUTATION);
    function handleClick() {
        commit({
            variables: {
                input: {
                    questionId,
                    to: !isLikedByViewer,
                },
            },
        });
    }

    return (
        <Button
            color={isLikedByViewer ? 'secondary' : 'inherit'}
            onClick={handleClick}
            endIcon={<ThumbUpIcon fontSize='small' />}
            fullWidth
            className={className}
        >
            Like
        </Button>
    );
}
