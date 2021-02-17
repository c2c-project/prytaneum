/* eslint-disable @typescript-eslint/indent */
import React from 'react';
// import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
    QueueActions,
    addToQueue,
    incrementQueue,
    decrementQueue,
    reorderQueue,
    removeFromQueue,
    playlistInit,
} from 'reducers';

import useSocketio, { SocketFn } from 'hooks/useSocketio';
import useTownhall from 'hooks/useTownhall';

export default function usePlaylist() {
    const [townhall] = useTownhall();
    const playlist = useSelector((store) => store.playlist);
    const dispatch = useDispatch();
    const socketFn: SocketFn = React.useCallback(
        (socket) =>
            socket.on('playlist-state', (action: QueueActions) => {
                switch (action.type) {
                    case 'playlist-queue-add':
                        addToQueue({ question: action.payload });
                        break;
                    case 'playlist-queue-next':
                        incrementQueue();
                        break;
                    case 'playlist-queue-previous':
                        decrementQueue();
                        break;
                    case 'playlist-queue-remove':
                        removeFromQueue(action.payload);
                        break;
                    case 'playlist-queue-order':
                        reorderQueue({ queue: action.payload });
                        break;
                    default:
                    // do nothing
                }
            }),
        []
    );
    useSocketio(
        '/playlist',
        {
            query: { townhallId: townhall._id },
        },
        socketFn
    );
    React.useEffect(() => {
        dispatch(
            playlistInit({ queue: townhall.state.playlist.queue, position: townhall.state.playlist.position.current })
        );
        // NOTE: this should only run on the first render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return [playlist] as const;
}
