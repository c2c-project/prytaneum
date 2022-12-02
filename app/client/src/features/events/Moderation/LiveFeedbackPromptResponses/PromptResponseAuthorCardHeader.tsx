import { useMemo, useCallback } from 'react';
import { Typography, CardHeader, CardHeaderProps, Grid } from '@mui/material';

import type { PromptResponse } from './LiveFeedbackPromptResponseList';
import { formatDate } from '@local/utils/format';
import {
    ThumbsUpDown as ThumbsUpDownIcon,
    ThumbUp as ThumbUpIcon,
    ThumbDown as ThumbDownIcon,
} from '@mui/icons-material';

interface PromptResponseAuthorProps extends CardHeaderProps {
    createdBy: PromptResponse['createdBy'];
    createdAt: PromptResponse['createdAt'];
    isVote: boolean;
    vote: PromptResponse['vote'];
}

export function PromptResponseAuthorCardHeader({
    createdBy,
    createdAt,
    isVote,
    vote,
    ...props
}: PromptResponseAuthorProps) {
    const [time, month] = useMemo(() => {
        if (createdAt) return formatDate(createdAt, 'p-P').split('-');
        return ['', ''];
    }, [createdAt]);

    const subheader = useMemo(
        () => (
            <Typography variant='caption' color='textSecondary'>
                {time}
                &nbsp; &middot; &nbsp;
                {month}
            </Typography>
        ),
        [time, month]
    );

    const authorName = useMemo(() => {
        let _authorName = 'Unknown User';
        if (createdBy && createdBy.firstName) {
            _authorName = createdBy.firstName;
            if (createdBy.lastName) _authorName = `${_authorName} ${createdBy.lastName}`;
        }
        return _authorName;
    }, [createdBy]);

    const getIconFromVote = useCallback((_vote: PromptResponse['vote']) => {
        switch (_vote) {
            case 'FOR':
                return <ThumbUpIcon sx={{ color: 'success.main' }} />;
            case 'AGAINST':
                return <ThumbDownIcon sx={{ color: 'error.main' }} />;
            case 'CONFLICTED':
                return <ThumbsUpDownIcon sx={{ color: 'warning.main' }} />;
            default:
                return null;
        }
    }, []);

    return (
        <CardHeader
            avatar={createdBy?.avatar || authorName[0]}
            title={
                <Grid container>
                    <Typography paddingRight='0.5rem'>{authorName}</Typography>
                    {isVote ? getIconFromVote(vote) : <></>}
                </Grid>
            }
            subheader={<Typography>{subheader}</Typography>}
            {...props}
        />
    );
}
