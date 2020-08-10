import React from 'react';
import { EventEmitter } from 'events';

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
    const { url, event, reducer, initialState } = settings;
    const socket = (new EventEmitter() as unknown) as SocketIOClient.Socket;
    const [state, dispatch] = React.useReducer(reducer, initialState);
    socket.on(event, dispatch);
    return [state, dispatch, socket];
}

export default useSocketio;
