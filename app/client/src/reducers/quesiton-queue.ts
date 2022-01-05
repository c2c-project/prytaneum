export interface Playlist {
    position: {
        current: number; // 0-indexed; max will be limited by the length of the queue -- starts at -1 if there's no current question
        timestamps: string[];
    };
    queue: Question[];
    list: Question[];
}
export interface TownhallState {
    active: boolean;
    start: Date | null;
    end: Date | null;
    playlist: Playlist;
}

export interface Townhall {
    _id: string;
    meta: Meta;
    state: TownhallState;
}

export interface Question {
    _id: string;
    meta: Meta & {
        townhallId: string;
    };
    question: string;
    quote: Question | null;
    likes: string[];
    aiml: {
        labels: string[];
    };
}

export interface Name {
    first: string;
    last: string;
}

export interface Meta {
    createdAt: Date | string;
    createdBy: {
        _id: string;
        name: Name;
    };
    updatedAt: Date | string;
    updatedBy: {
        _id: string;
        name: Name;
    };
}

export type WrapPayload<Type extends string, Payload> = {
    type: Type;
    payload: Payload;
};

export interface ChatMessage {
    _id: string;
    message: string;
}

export interface SocketIOEvents {
    'chat-message-state':
    | WrapPayload<'create-chat-message', ChatMessage>
    | WrapPayload<'update-chat-message', ChatMessage>
    | WrapPayload<'delete-chat-message', ChatMessage>
    | WrapPayload<'moderate-chat-message', ChatMessage>
    | WrapPayload<'breakout-end', null>
    | WrapPayload<'breakout-start', { breakoutId: string }>;

    'question-state':
    | WrapPayload<'initial-state', Question[]>
    | WrapPayload<'create-question', Question>
    | WrapPayload<'update-question', Question>
    | WrapPayload<'delete-question', Question>;

    'playlist-state':
    | WrapPayload<'playlist-add', Question>
    | WrapPayload<'playlist-remove', string>
    | WrapPayload<'playlist-queue-order', Question[]>
    | WrapPayload<'playlist-queue-add', Question>
    | WrapPayload<'playlist-queue-remove', string>
    | WrapPayload<'playlist-queue-next', null>
    | WrapPayload<'playlist-queue-previous', null>
    | WrapPayload<
    'playlist-like-add',
    { questionId: string; userId: string }
    >
    | WrapPayload<
    'playlist-like-remove',
    { questionId: string; userId: string }
    >;

    'townhall-state':
    | WrapPayload<'user-attend', number>
    | WrapPayload<'user-leave', number>
    | WrapPayload<'townhall-start', null>
    | WrapPayload<'townhall-end', null>;
}

export type QueueState = {
    queue: Question[];
    current: number;
};

declare module 'react-redux' {
    interface DefaultRootState {
        queue: QueueState;
    }
}

export type QueueActions =
    | SocketIOEvents['playlist-state']
    | { type: 'flush-suggested-buffer' }
    | { type: 'question-queue-initialize'; payload: Townhall['state'] };
const initialState: QueueState = {
    queue: [],
    current: -1,
};

const makeInitialState = (state: Townhall['state']): QueueState => {
    const { playlist } = state;
    return {
        // only relevant locally (the buffer stuff)
        ...initialState,
        // state from server
        current: playlist.position.current,
        queue: playlist.queue,
    };
};

export default function playlistReducer(state: QueueState, action: QueueActions): QueueState {
    switch (action.type) {
        case 'playlist-add':
            return {
                ...state,
                queue: [...state.queue, action.payload],
            };
        case 'playlist-queue-add':
            return {
                ...state,
                queue: [...state.queue, action.payload],
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
        // case 'playlist-remove': {
        //     const idx = state.suggested.findIndex((question) => question._id === action.payload);
        //     const newPlaylist = [...state.suggested.splice(0, idx), ...state.suggested.splice(idx + 1)];
        //     return { ...state, suggested: newPlaylist };
        // }
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
                queue: state.queue.map(addLike),
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
                queue: state.queue.map(removeLike),
            };
        }
        case 'question-queue-initialize': {
            return makeInitialState(action.payload);
        }
        default:
            return state || initialState;
    }
}
