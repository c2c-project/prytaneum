import { CardActions, CardActionsProps } from '@mui/material';
import { graphql, useFragment } from 'react-relay';

import type { QuestionActionsFragment$key } from '@local/__generated__/QuestionActionsFragment.graphql';
import { Like } from './Like';
import { Quote } from './Quote';
import { QueueButton } from './QueueButton';

const QUESTION_ACTIONS_FRAGMENT = graphql`
    fragment QuestionActionsFragment on EventQuestion {
        id
        ...QuoteFragment
        ...LikeFragment
        ...QueueButtonFragment
    }
`;

export type QuestionActionProps = {
    fragmentRef: QuestionActionsFragment$key;
    quote?: boolean;
    like?: boolean;
    queue?: boolean;
    connections: string[];
} & CardActionsProps;

export function QuestionActions({
    like = false,
    quote = false,
    queue = false,
    fragmentRef,
    connections,
    ...props
}: QuestionActionProps) {
    const data = useFragment(QUESTION_ACTIONS_FRAGMENT, fragmentRef);
    return (
        <CardActions {...props}>
            {like && <Like fragmentRef={data} />}
            {quote && <Quote fragmentRef={data} />}
            {queue && <QueueButton fragmentRef={data} />}
        </CardActions>
    );
}
