/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import type { SocketIOEvents, Question, Townhall } from 'prytaneum-typings';

import useSocketio, { SocketFn } from 'hooks/useSocketio';
import useTownhall from 'hooks/useTownhall';

type State = {
    queue: Question[];
    position: number;
};

type Events = SocketIOEvents['playlist-state'];

function playlistReducer(state: State, action: Events): State {
    switch (action.type) {
        case 'playlist-queue-add':
            return {
                ...state,
                queue: [...state.queue, action.payload],
            };
        case 'playlist-queue-next':
            return { ...state, position: state.position + 1 };
        case 'playlist-queue-previous':
            return { ...state, position: state.position - 1 };
        case 'playlist-queue-order':
            return { ...state, queue: action.payload };
        case 'playlist-queue-remove': {
            const idx = state.queue.findIndex(
                (question) => question._id === action.payload
            );
            const newQueue = [
                ...state.queue.splice(0, idx),
                ...state.queue.splice(idx + 1),
            ];
            return { ...state, queue: newQueue };
        }
        default:
            return state;
    }
}

const makeInitialState = (state: Townhall['state']): State => {
    const { playlist } = state;
    return {
        position: playlist.position.current,
        queue: playlist.queue,
    };
};

export default function usePlaylist() {
    const [townhall] = useTownhall();
    const [playlist, dispatch] = React.useReducer(
        playlistReducer,
        makeInitialState(townhall.state)
    );
    const socketFn: SocketFn = React.useCallback(
        (socket) => socket.on('playlist-state', dispatch),
        [dispatch]
    );
    useSocketio(
        '/playlist',
        {
            query: { townhallId: townhall._id },
        },
        socketFn
    );
    return [playlist, dispatch] as const;
}
