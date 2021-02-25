/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

import { QueueActions } from 'reducers';
import useSocketio, { SocketFn } from 'hooks/useSocketio';
import useTownhall from 'hooks/useTownhall';

export default function useQuestionQueue() {
    const [townhall] = useTownhall();
    const playlist = useSelector((store) => store.queue);
    const dispatch = useDispatch<Dispatch<QueueActions>>();
    React.useEffect(() => {
        dispatch({ type: 'question-queue-initialize', payload: townhall.state });
        // NOTE: I only want this to run on first render, and be ignored after
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const socketFn: SocketFn = React.useCallback((socket) => socket.on('playlist-state', dispatch), [dispatch]);
    useSocketio(
        '/playlist',
        {
            query: { townhallId: townhall._id },
        },
        socketFn
    );
    return [playlist, dispatch] as const;
}
