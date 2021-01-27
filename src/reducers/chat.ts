import type { SocketIOEvents, ChatMessage } from 'prytaneum-typings';

declare module 'react-redux' {
    interface DefaultRootState {
        chat: ChatMessage[];
    }
}

export type ChatActions = SocketIOEvents['chat-message-state'] | { type: 'chat-initial-state'; payload: ChatMessage[] };

export default function chatReducer(state: ChatMessage[], action: ChatActions) {
    switch (action.type) {
        case 'create-chat-message':
            return [...state, action.payload];
        case 'update-chat-message':
            return state;
        case 'delete-chat-message':
            return state;
        case 'chat-initial-state':
            return [...action.payload];
        default:
            return state || [];
    }
}
