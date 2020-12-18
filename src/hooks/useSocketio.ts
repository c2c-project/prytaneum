import React from 'react';
import io from 'socket.io-client';

function useSocketio<T, U>(uri: string, opts: SocketIOClient.ConnectOpts) {
    const socketRef = React.useRef<SocketIOClient.Socket | null>(null);
    const getSocket = React.useCallback(() => {
        if (socketRef.current) return socketRef.current;
        socketRef.current = io.connect(uri, opts);
        return socketRef.current;
    }, [uri, opts]);
    const socket = getSocket();
    // TODO: on disconnect display a snack that you have been disconnected & connection is retrying that type of thing
    React.useEffect(
        () => () => {
            socket.close();
        },
        [socket]
    );

    return socket;
}

export default useSocketio;
