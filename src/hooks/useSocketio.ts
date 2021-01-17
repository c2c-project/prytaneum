import React from 'react';
import io from 'socket.io-client';

export type SocketFn = (socket: SocketIOClient.Socket) => void;

function useSocketio(
    uri: string,
    opts: SocketIOClient.ConnectOpts,
    fn: SocketFn
) {
    // socketio ref where we connect just once; guaranteed singleton
    const socketRef = React.useRef<SocketIOClient.Socket | null>(null);
    const getSocket = React.useCallback(() => {
        if (socketRef.current) return socketRef.current;
        socketRef.current = io.connect(uri, opts);
        return socketRef.current;
    }, [uri, opts]);
    const socket = getSocket();
    // curry the callback passed in that receives the socket

    // TODO: on disconnect display a snack that you have been
    // disconnected & connection is retrying that type of thing
    React.useEffect(() => {
        // curry
        fn(socket);

        // cleanup
        return () => {
            socket.close();
        };
    }, [fn, socket]);
}

export default useSocketio;
