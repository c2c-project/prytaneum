import { graphql, useFragment } from 'react-relay';
import { Badge, CardContent } from '@material-ui/core';
import ThumbUp from '@material-ui/icons/ThumbUp';

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
        <CardContent>
            <Badge showZero badgeContent={data.likedByCount}>
                <ThumbUp color='disabled' />
            </Badge>
        </CardContent>
    );
}
