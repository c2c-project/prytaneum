/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

// import { QueueActions } from '@local/reducers';
// import useSocketio, { SocketFn } from '@local/hooks/useSocketio';
// import useTownhall from '@local/hooks/useTownhall';

export default function useQuestionQueue(): any {
    // const [townhall] = useTownhall();
    // const playlist = useSelector((store) => store.queue);
    // const dispatch = useDispatch<Dispatch<QueueActions>>();
    // React.useEffect(() => {
    //     dispatch({ type: 'question-queue-initialize', payload: townhall.state });
    //     // NOTE: I only want this to run on first render, and be ignored after
    //     // eslint-disable-next-line react-@local/hooks/exhaustive-deps
    // }, []);
    // const socketFn: SocketFn = React.useCallback((socket) => socket.on('playlist-state', dispatch), [dispatch]);
    // useSocketio(
    //     '/playlist',
    //     {
    //         query: { townhallId: townhall._id },
    //     },
    //     socketFn
    // );
    return [];
}
