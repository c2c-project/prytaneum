import React from 'react';

import FixtureContext from 'mock/Fixture.socket';

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
    // this is really just an Event emitter
    const socket = React.useContext(FixtureContext);

    // const initSocket = React.useContext(FixtureContext);
    // const [socket, handle] = initSocket();
    // React.useEffect(() => {
    //     return () => clearInterval(handle);
    // });

    const { event, reducer, initialState } = settings;
    const [state, dispatch] = React.useReducer(reducer, initialState);
    React.useEffect(() => {
        socket.on(event, dispatch);
    }, [socket, event]);
    return [state, dispatch, socket];
}

export default useSocketio;
