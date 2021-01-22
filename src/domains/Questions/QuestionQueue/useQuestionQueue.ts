/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import type { SocketIOEvents, Question, Townhall } from 'prytaneum-typings';

import useSocketio, { SocketFn } from 'hooks/useSocketio';
import useTownhall from 'hooks/useTownhall';

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
        case 'playlist-queue-previous':
            return { ...state, current: state.current - 1 };
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
                          likes: question.likes.filter(
                              (userId) => action.payload.userId !== userId
                          ),
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
        default:
            return state;
    }
}

const makeInitialState = (state: Townhall['state']): State => {
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

export default function useQuestionQueue() {
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
