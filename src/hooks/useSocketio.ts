import React from 'react';
import io from 'socket.io-client';
import type { ServerEmits } from 'prytaneum-typings';

interface Settings<T, U> {
    url: string;
    query?: Record<string, string>;
    event: ServerEmits;
    reducer: (a: T, b: U) => T;
    initialState: T;
}
type ReturnType<T, U> = [T, React.Dispatch<U>, SocketIOClient.Socket];

function useSocketio<T, U>(settings: Settings<T, U>): ReturnType<T, U> {
    const { url, event, reducer, initialState } = settings;
    const socket = io.connect(url);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    socket.on(event, dispatch);
    return [state, dispatch, socket];
}

export default useSocketio;
