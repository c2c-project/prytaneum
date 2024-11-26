import { graphql, useFragment } from 'react-relay';
import { Typography, CardContent, Tooltip } from '@mui/material';
import ThumbUp from '@mui/icons-material/ThumbUp';

import type { QuestionStatsFragment$key } from '@local/__generated__/QuestionStatsFragment.graphql';

export interface QuestionStatsProps {
    fragmentRef: QuestionStatsFragment$key;
}

export const QUESTION_STATS_FRAGMENT = graphql`
    fragment QuestionStatsFragment on EventQuestion {
        id
        likedByCount
    }
`;

export function QuestionStats({ fragmentRef }: QuestionStatsProps) {
    const data = useFragment(QUESTION_STATS_FRAGMENT, fragmentRef);

    return (
        <CardContent
            sx={{
                display: 'flex',
                gap: (theme) => theme.spacing(0.5),
                alignItems: 'center',
                width: 'min-content', // minimized width and height since the icon had too much of a height difference to buttons
                height: 'min-content',
                paddingTop: 0,
                paddingBottom: '0 !important', // added !important for filler icon (for some reason, CSS wasn't being applied)
            }}
        >
            <Tooltip title='Likes'>
                <ThumbUp fontSize='small' sx={{ color: (theme) => theme.palette.custom.lightBlue }} />
            </Tooltip>
            <Typography>{data.likedByCount}</Typography>
        </CardContent>
    );
}
