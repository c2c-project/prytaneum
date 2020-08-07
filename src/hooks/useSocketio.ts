import React from 'react';
import io from 'socket.io-client';

import FixtureSocket from 'contexts/Fixture.socket';

type Events =
    | 'townhall-chat-state'
    | 'townhall-question-state'
    | 'townhall-moderator-chat-state';
interface Settings<T, U> {
    url: string;
    query?: Record<string, string>;
    event: Events;
    reducer: (a: T, b: U) => T;
    initialState: T;
}
type ReturnType<T, U> = [T, React.Dispatch<U>, SocketIOClient.Socket];

function useSocketio<T, U>(settings: Settings<T, U>): ReturnType<T, U> {
    const FixtureContext = React.useContext(FixtureSocket);
    if (process.env.NODE_ENV === 'development') {
        return 
    }
    const { url, event, reducer, initialState } = settings;
    const socket = io.connect(url);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    socket.on(event, dispatch);
    return [state, dispatch, socket];
}

export default useSocketio;
