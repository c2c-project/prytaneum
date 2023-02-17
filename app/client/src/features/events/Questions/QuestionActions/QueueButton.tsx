import * as React from 'react';
import { graphql, useFragment } from 'react-relay';

import type { QueueButtonFragment$key } from '@local/__generated__/QueueButtonFragment.graphql';
import { EnqueueQuestionButton } from './EnqueueQuestionButton';
import { DequeueQuestionButton } from './DequeueQuestionButton';

export interface QueueButtonProps {
    fragmentRef: QueueButtonFragment$key;
}

export const QUEUE_BUTTON_FRAGMENT = graphql`
    fragment QueueButtonFragment on EventQuestion {
        id
        position
    }
`;

/**
 * Should only be used by moderators or when the user is a verified moderator
 */
export function QueueButton({ fragmentRef }: QueueButtonProps) {
    const { id: questionId, position } = useFragment(QUEUE_BUTTON_FRAGMENT, fragmentRef);

    const isQueued = React.useMemo(() => {
        if (!position || position === '-1') return false;
        return true;
    }, [position]);

    // TODO: add an animation for this using framer motion
    return isQueued ? (
        <div>
            <DequeueQuestionButton questionId={questionId} />
        </div>
    ) : (
        <div>
            <EnqueueQuestionButton questionId={questionId} />
        </div>
    );
}
