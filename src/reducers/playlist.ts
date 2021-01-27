import type { SocketIOEvents, Question, Townhall } from 'prytaneum-typings';

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

export default function playlistReducer(state: PlaylistState, action: PlaylistActions): PlaylistState {
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
            const idx = state.queue.findIndex((question) => question._id === action.payload);
            const newQueue = [...state.queue.splice(0, idx), ...state.queue.splice(idx + 1)];
            return { ...state, queue: newQueue };
        }
        case 'playlist-initialize': {
            const { playlist } = action.payload;
            return {
                position: playlist.position.current,
                queue: playlist.queue,
            };
        }
        default:
            return state || { queue: [], position: -1 };
    }
}
