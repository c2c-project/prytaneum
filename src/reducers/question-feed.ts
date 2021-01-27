import type { Question as QuestionType, SocketIOEvents } from 'prytaneum-typings';

declare module 'react-redux' {
    interface DefaultRootState {
        questions: QuestionType[];
    }
}

export type QuestionActions = SocketIOEvents['question-state'] | { type: 'flush'; payload: [] };

export default function questionReducer(state: QuestionType[], action: QuestionActions) {
    switch (action.type) {
        case 'create-question':
            return [action.payload, ...state];
        case 'update-question':
            return state.map((question) => {
                if (question._id === action.payload._id) {
                    return { ...question, ...action.payload };
                }
                return question;
            });
        case 'delete-question':
            return state.filter((question) => question._id !== action.payload._id);
        case 'initial-state':
            return action.payload.reverse();
        case 'flush':
            return [];
        default:
            return state || [];
    }
}
