/* eslint-disable @typescript-eslint/indent */
import React from 'react';
// import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
    QueueActions,
    addToQueue,
    reorderQueue,
    removeFromQueue,
    playlistInit,
    remoteDecrementQueue,
    remoteIncrementQueue,
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
                        dispatch(addToQueue({ question: action.payload }));
                        break;
                    case 'playlist-queue-next':
                        dispatch(remoteIncrementQueue());
                        break;
                    case 'playlist-queue-previous':
                        dispatch(remoteDecrementQueue());
                        break;
                    case 'playlist-queue-remove':
                        dispatch(removeFromQueue(action.payload));
                        break;
                    case 'playlist-queue-order':
                        dispatch(reorderQueue({ queue: action.payload }));
                        break;
                    default:
                    // do nothing
                }
            }),
        [dispatch]
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
            playlistInit({
                queue: townhall.state.playlist.queue,
                position: townhall.state.playlist.position.current,
                max: townhall.state.playlist.position.current,
            })
        );
        // NOTE: this should only run on the first render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return [playlist, dispatch] as const;
}
