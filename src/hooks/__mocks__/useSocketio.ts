import React from 'react';
import FixtureContext from 'mock/Fixture.socket';

function useSocketio(
    uri: string,
    opts: SocketIOClient.ConnectOpts,
    fn: (socket: SocketIOClient.Socket) => void,
    deps: React.DependencyList
) {
    const socket = React.useContext(FixtureContext);

    // curry the callback passed in that receives the socket and isMountedWrapper
    const curriedSocketFn = React.useCallback(fn, [...deps, fn]);

    // TODO: on disconnect display a snack that you have been
    // disconnected & connection is retrying that type of thing
    React.useEffect(() => {
        // curry
        curriedSocketFn(socket);

        // cleanup
        return () => {
            socket.removeAllListeners();
        };
    }, [curriedSocketFn, socket]);
}

export default useSocketio;
