import type { Question as QuestionType, SocketIOEvents } from 'prytaneum-typings';

declare module 'react-redux' {
    interface DefaultRootState {
        questions: QuestionFeedState;
    }
}
export type QuestionFeedState = {
    list: QuestionType[];
    buffer: QuestionType[];
};
export type QuestionActions = SocketIOEvents['question-state'] | { type: 'flush'; payload: [] };

export default function questionReducer(state: QuestionFeedState = { list: [], buffer: [] }, action: QuestionActions) {
    switch (action.type) {
        case 'create-question':
            return { ...state, buffer: [action.payload, ...state.buffer] };
        case 'update-question':
            return {
                ...state,
                list: state.list.map((question) => {
                    if (question._id === action.payload._id) {
                        return { ...question, ...action.payload };
                    }
                    return question;
                }),
                buffer: state.buffer.map((question) => {
                    if (question._id === action.payload._id) {
                        return { ...question, ...action.payload };
                    }
                    return question;
                }),
            };
        case 'delete-question':
            return {
                ...state,
                list: state.list.filter((question) => question._id !== action.payload._id),
                buffer: state.buffer.filter((question) => question._id !== action.payload._id),
            };
        case 'initial-state':
            return { ...state, buffer: [], list: action.payload };
        case 'flush':
            return { ...state, buffer: [], list: [...state.buffer, ...state.list] };
        default:
            return state;
    }
}
