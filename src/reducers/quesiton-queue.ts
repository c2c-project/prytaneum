/* eslint-disable @typescript-eslint/indent */
import type { SocketIOEvents, Question, Townhall } from 'prytaneum-typings';

export type QueueState = {
    suggested: Question[];
    queue: Question[];
    current: number;
    buffer: { queue: Question[]; suggested: Question[] };
};

declare module 'react-redux' {
    interface DefaultRootState {
        queue: QueueState;
    }
}

export type QueueActions =
    | SocketIOEvents['playlist-state']
    | { type: 'flush-queue-buffer' }
    | { type: 'flush-suggested-buffer' }
    | { type: 'initialize'; payload: Townhall['state'] };
const initialState: QueueState = {
    suggested: [],
    queue: [],
    current: -1,
    buffer: { queue: [], suggested: [] },
};

const makeInitialState = (state: Townhall['state']): QueueState => {
    const { playlist } = state;
    return {
        // only relevant locally (the buffer stuff)
        ...initialState,
        // state from server
        current: playlist.position.current,
        queue: playlist.queue,
        suggested: playlist.list,
    };
};

export default function playlistReducer(state: QueueState, action: QueueActions): QueueState {
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
        case 'playlist-queue-previous':
            return { ...state, current: state.current - 1 };
        case 'playlist-queue-order':
            return { ...state, queue: action.payload };
        case 'playlist-queue-remove': {
            const idx = state.queue.findIndex((question) => question._id === action.payload);
            const newQueue = [...state.queue.splice(0, idx), ...state.queue.splice(idx + 1)];
            return { ...state, queue: newQueue };
        }
        case 'playlist-remove': {
            const idx = state.suggested.findIndex((question) => question._id === action.payload);
            const newPlaylist = [...state.suggested.splice(0, idx), ...state.suggested.splice(idx + 1)];
            return { ...state, suggested: newPlaylist };
        }
        case 'playlist-like-add': {
            const addLike = (question: Question) =>
                question._id === action.payload.questionId
                    ? {
                          ...question,
                          likes: [...question.likes, action.payload.userId],
                      }
                    : question;
            // don't update questions that are queu because i don't care about their like count atm
            return {
                ...state,
                // if it's in suggsted
                suggested: state.suggested.map(addLike),
                // it could be in the buffer too...
                buffer: {
                    ...state.buffer,
                    suggested: state.buffer.suggested.map(addLike),
                },
            };
        }
        case 'playlist-like-remove': {
            const removeLike = (question: Question) =>
                question._id === action.payload.questionId
                    ? {
                          ...question,
                          likes: question.likes.filter((userId) => action.payload.userId !== userId),
                      }
                    : question;
            // don't update questions that are queu because i don't care about their like count atm
            return {
                ...state,
                // if it's in suggsted
                suggested: state.suggested.map(removeLike),
                // it could be in the buffer too...
                buffer: {
                    ...state.buffer,
                    suggested: state.buffer.suggested.map(removeLike),
                },
            };
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
        case 'initialize': {
            return makeInitialState(action.payload);
        }
        default:
            return state || initialState;
    }
}
