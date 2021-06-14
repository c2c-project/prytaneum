import * as React from 'react';

import { EventContext, EventDispatch } from '@local/features/events';
import { useUser } from './useUser';

export function useEvent() {
    const [user] = useUser();
    const event = React.useContext(EventContext);
    const setEvent = React.useContext(EventDispatch);

    if (!event || !setEvent) throw new Error('useEvent() must be used within a EventContext');

    const isOwner = React.useMemo(() => user && event.createdBy && event.createdBy.id === user.id, [
        user,
        event,
    ]);
    const isModerator = React.useMemo(
        () => Boolean((user && event.moderators?.some(({ id }) => id === user.id)) || isOwner),
        [event, user, isOwner]
    );
    return [event, isModerator, setEvent] as const;
}
