import * as React from 'react';

import { Event } from '@local/graphql-types';

interface Props {
    event: Event; // we may not need this?
    children: React.ReactNode | React.ReactNodeArray;
}

export const EventContext = React.createContext<Event | null>(null);

type Dispatch = React.Dispatch<React.SetStateAction<Event>> | null;

export const EventDispatch = React.createContext<Dispatch>(null);

// TODO: optimize this so that a request doesn't get sent every single page load? maybe?
export function EventProvider({ event, children }: Props) {
    const [eventDetails, setEvent] = React.useState(event);

    return (
        <EventContext.Provider value={eventDetails}>
            <EventDispatch.Provider value={setEvent}>{children}</EventDispatch.Provider>
        </EventContext.Provider>
    );
}
