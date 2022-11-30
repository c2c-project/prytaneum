import * as React from 'react';
import { graphql, PreloadedQuery, useQueryLoader, usePreloadedQuery } from 'react-relay';
import { Grid } from '@mui/material';

import { useLiveFeedbackPromptsFragment$key } from '@local/__generated__/useLiveFeedbackPromptsFragment.graphql';
import { LiveFeedbackPromptListQuery } from '@local/__generated__/LiveFeedbackPromptListQuery.graphql';
import { useLiveFeedbackPrompts } from './useLiveFeedbackPrompts';
import { useEvent } from '@local/features/events/useEvent';
import { ConditionalRender } from '@local/components';
import { Loader } from '@local/components/Loader';

export const LIVE_FEEDBACK_PROMPT_LIST_QUERY = graphql`
    query LiveFeedbackPromptListQuery($eventId: ID!) {
        event(eventId: $eventId) {
            ...useLiveFeedbackPromptsFragment
        }
    }
`;

interface PromptListProps {
    fragmentRef: useLiveFeedbackPromptsFragment$key;
}

/**
 * This component is responsible for rendering the live feedback prompts using the provided fragment Ref
 */
function PromptList({ fragmentRef }: PromptListProps) {
    const { prompts } = useLiveFeedbackPrompts({ fragmentRef });

    return (
        <div id='live-feedback-prompt-list-container'>
            {prompts.map((prompt) => (
                <Grid key={prompt.id} className='live-feedback-prompt'>
                    {prompt.prompt}
                </Grid>
            ))}
        </div>
    );
}

interface LiveFeedbackPromptListProps {
    queryRef: PreloadedQuery<LiveFeedbackPromptListQuery>;
}

/**
 * This component is responsible for loading the query and passing the fragment ref to the PromptList component
 */
function LiveFeedbackPromptList({ queryRef }: LiveFeedbackPromptListProps) {
    const { event } = usePreloadedQuery(LIVE_FEEDBACK_PROMPT_LIST_QUERY, queryRef);

    if (!event) return <Loader />;
    return <PromptList fragmentRef={event} />;
}

/**
 * This component is used to create the query for the LiveFeedbackPromptList
 */
export function PreloadedLiveFeedbackPromptList() {
    const [queryRef, loadQuery] = useQueryLoader<LiveFeedbackPromptListQuery>(LIVE_FEEDBACK_PROMPT_LIST_QUERY);
    const { eventId } = useEvent();

    React.useEffect(() => {
        if (!queryRef) loadQuery({ eventId });
    }, [eventId, loadQuery, queryRef]);

    if (!queryRef) return <Loader />;
    return (
        <ConditionalRender client>
            {/* Suspense workaround to avoid component flashing during refetch */}
            <React.Suspense fallback={<LiveFeedbackPromptList queryRef={queryRef} />}>
                <LiveFeedbackPromptList queryRef={queryRef} />
            </React.Suspense>
        </ConditionalRender>
    );
}
