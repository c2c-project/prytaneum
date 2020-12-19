import React from 'react';
import io from 'socket.io-client';

function useSocketio(
    uri: string,
    opts: SocketIOClient.ConnectOpts,
    fn: (socket: SocketIOClient.Socket) => void,
    deps: React.DependencyList
) {
    // socketio ref where we connect just once; guaranteed singleton
    const socketRef = React.useRef<SocketIOClient.Socket | null>(null);
    const getSocket = React.useCallback(() => {
        if (socketRef.current) return socketRef.current;
        socketRef.current = io.connect(uri, opts);
        return socketRef.current;
    }, [uri, opts]);
    const socket = getSocket();
    // curry the callback passed in that receives the socket and isMountedWrapper
    const curriedSocketFn = React.useCallback(fn, deps);

    // TODO: on disconnect display a snack that you have been
    // disconnected & connection is retrying that type of thing
    React.useEffect(() => {
        // curry
        curriedSocketFn(socket);

        // cleanup
        return () => {
            socket.close();
        };
    }, [curriedSocketFn, socket]);
}

export default useSocketio;
