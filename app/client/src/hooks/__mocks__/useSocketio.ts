import * as React from 'react';
import FixtureContext from 'mock/Fixture.socket';

function useSocketio(
    uri: string,
    opts: SocketIOClient.ConnectOpts,
    fn: (socket: SocketIOClient.Socket) => void
) {
    const socket = React.useContext(FixtureContext);

    // curry the callback passed in that receives the socket and isMountedWrapper

    // TODO: on disconnect display a snack that you have been
    // disconnected & connection is retrying that type of thing
    React.useEffect(() => {
        // curry
        fn(socket);

        // cleanup
        return () => {
            socket.removeAllListeners();
        };
    }, [fn, socket]);
}

export default useSocketio;
