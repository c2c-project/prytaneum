/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { PlaylistActions } from 'reducers';

import useSocketio, { SocketFn } from 'hooks/useSocketio';
import useTownhall from 'hooks/useTownhall';

export default function usePlaylist() {
    const [townhall] = useTownhall();
    const playlist = useSelector((store) => store.playlist);
    const dispatch = useDispatch<Dispatch<PlaylistActions>>();
    const socketFn: SocketFn = React.useCallback((socket) => socket.on('playlist-state', dispatch), [dispatch]);
    useSocketio(
        '/playlist',
        {
            query: { townhallId: townhall._id },
        },
        socketFn
    );
    React.useEffect(() => {
        dispatch({ type: 'playlist-initialize', payload: townhall.state });
        // NOTE: i only want this to run on the very first render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return [playlist, dispatch] as const;
}
