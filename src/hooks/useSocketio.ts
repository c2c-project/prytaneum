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
    const { url, event, reducer, initialState, query } = settings;
    const socketRef = React.useRef<SocketIOClient.Socket | null>(null);
    const getSocket = React.useCallback(() => {
        if (socketRef.current) return socketRef.current;
        socketRef.current = io.connect(url, { query });
        return socketRef.current;
    }, [query, url]);
    const socket = getSocket();
    const [state, dispatch] = React.useReducer(reducer, initialState);
    React.useEffect(() => {
        let isMounted = true;
        // TODO: blank out ui or snack or something for the client
        // eslint-disable-next-line
        socket.on('connect_error', (e: Error) => console.log(e.message));
        // eslint-disable-next-line
        socket.on('connect', () => console.log('connected'));
        // eslint-disable-next-line
        socket.on('disconnect', () => console.log('disconnected'));
        socket.on(event, (arg: U) => {
            if (!isMounted) return;
            dispatch(arg);
        });
        return () => {
            isMounted = false;
            socket.close();
        };
    }, [socket, event]);
    return [state, dispatch, socket];
}

export default useSocketio;
