import React from 'react';
import type { SocketIOEvents, Question } from 'prytaneum-typings';

import useSocketio from 'hooks/useSocketio';
import { TownhallContext } from 'contexts/Townhall';

type State = {
    suggested: Question[];
    queue: Question[];
    current: number;
    buffer: { queue: Question[]; suggested: Question[] };
};

type Events =
    | SocketIOEvents['playlist-state']
    | { type: 'flush-queue-buffer' }
    | { type: 'flush-suggested-buffer' };
const initialState: State = {
    suggested: [],
    queue: [],
    current: -1,
    buffer: { queue: [], suggested: [] },
};

function playlistReducer(state: State, action: Events): State {
    switch (action.type) {
        case 'playlist-add':
            return {
                ...state,
                buffer: {
                    ...state.buffer,
                    suggested: [...state.buffer.suggested, action.payload],
                },
            };
        case 'playlist-queue-add':
            return {
                ...state,
                buffer: {
                    ...state.buffer,
                    queue: [...state.buffer.queue, action.payload],
                },
            };
        case 'playlist-queue-next':
            return { ...state, current: state.current + 1 };
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
        case 'playlist-remove': {
            const idx = state.suggested.findIndex(
                (question) => question._id === action.payload
            );
            const newPlaylist = [
                ...state.suggested.splice(0, idx),
                ...state.suggested.splice(idx + 1),
            ];
            return { ...state, suggested: newPlaylist };
        }
        case 'flush-queue-buffer': {
            const queueBuffer = state.buffer.queue;
            return {
                ...state,
                queue: [...state.queue, ...queueBuffer],
                buffer: { ...state.buffer, queue: [] },
            };
        }
        case 'flush-suggested-buffer': {
            const suggestedBuffer = state.buffer.suggested;
            return {
                ...state,
                suggested: [...state.suggested, ...suggestedBuffer],
                buffer: { ...state.buffer, suggested: [] },
            };
        }
        default:
            return state;
    }
}

export default function useQuestionQueue() {
    const townhall = React.useContext(TownhallContext);
    const [playlist, dispatch] = React.useReducer(
        playlistReducer,
        initialState
    );
    useSocketio(
        '/playlist',
        {
            query: { townhallId: townhall._id },
        },
        (socket) => socket.on('playlist-state', dispatch),
        [dispatch]
    );
    return [playlist, dispatch] as const;
}
