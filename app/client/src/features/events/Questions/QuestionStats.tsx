import { graphql, useFragment } from 'react-relay';
import { Typography, CardContent } from '@material-ui/core';
import ThumbUp from '@material-ui/icons/ThumbUp';
import { makeStyles } from '@material-ui/core/styles';

import type { QuestionStatsFragment$key } from '@local/__generated__/QuestionStatsFragment.graphql';

const useStyles = makeStyles((theme) => ({
    stats: {
        display: 'flex',
        gap: theme.spacing(0.5),
        alignItems: 'center',
        width: 'min-content', // minimized width and height since the icon had too much of a height difference to buttons
        height: 'min-content',
        paddingTop: 0,
        paddingBottom: '0 !important' // added !important for filler icon (for some reason, CSS wasn't being applied)
    },
}));

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
    const classes = useStyles();

    return (
        <CardContent className={classes.stats}>
            <ThumbUp fontSize='small' htmlColor='#8EAFFF' />
            <Typography>{data.likedByCount}</Typography>
        </CardContent>
    );
}
