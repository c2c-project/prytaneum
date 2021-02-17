import type { SocketIOEvents, Question, Townhall } from 'prytaneum-typings';
import { createAction, createReducer } from '@reduxjs/toolkit';

declare module 'react-redux' {
    interface DefaultRootState {
        playlist: PlaylistState;
    }
}

export type PlaylistState = {
    queue: Question[];
    position: number;
};

export type PlaylistActions =
    | SocketIOEvents['playlist-state']
    | { type: 'playlist-initialize'; payload: Townhall['state'] };

export const addToQueue = createAction<{ question: Question }>('playlist/queue/add');
export const incrementQueue = createAction('playlist/queue/next');
export const decrementQueue = createAction('playlist/queue/previous');
export const reorderQueue = createAction<{ queue: Question[] }>('playlist/queue/reorder');
export const removeFromQueue = createAction<string>('playlist/queue/remove');
export const playlistInit = createAction<{ queue: Question[]; position: number }>('playlist/queue/init');

export default createReducer<PlaylistState>({ queue: [], position: -1 }, (builder) => {
    builder.addCase(addToQueue, (state, action) => ({ ...state, queue: [...state.queue, action.payload.question] }));
    builder.addCase(incrementQueue, (state) => ({ ...state, position: state.position + 1 }));
    builder.addCase(decrementQueue, (state) => ({ ...state, position: state.position - 1 }));
    builder.addCase(reorderQueue, (state, action) => ({ ...state, ...action.payload }));
    builder.addCase(removeFromQueue, (state, action) => ({
        ...state,
        queue: state.queue.filter(({ _id }) => _id !== action.payload),
    }));
    builder.addCase(playlistInit, (_state, action) => ({ ...action.payload }));
});

// export default function playlistReducer(state: PlaylistState, action: PlaylistActions): PlaylistState {
//     switch (action.type) {
//         case 'playlist-queue-add':
//             return {
//                 ...state,
//                 queue: [...state.queue, action.payload],
//             };
//         case 'playlist-queue-next':
//             return { ...state, position: state.position + 1 };
//         case 'playlist-queue-previous':
//             return { ...state, position: state.position - 1 };
//         case 'playlist-queue-order':
//             return { ...state, queue: action.payload };
//         case 'playlist-queue-remove': {
//             const idx = state.queue.findIndex((question) => question._id === action.payload);
//             const newQueue = [...state.queue.splice(0, idx), ...state.queue.splice(idx + 1)];
//             return { ...state, queue: newQueue };
//         }
//         case 'playlist-initialize': {
//             const { playlist } = action.payload;
//             return {
//                 position: playlist.position.current,
//                 queue: playlist.queue,
//             };
//         }
//         default:
//             return state || { queue: [], position: -1 };
//     }
// }
