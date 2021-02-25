import { createAction, createReducer } from '@reduxjs/toolkit';
import type { SocketIOEvents, ChatMessage } from 'prytaneum-typings';

declare module 'react-redux' {
    interface DefaultRootState {
        chat: ChatState;
    }
}

export type ChatState = { unread: ChatMessage[]; read: ChatMessage[] };

export type ChatActions = SocketIOEvents['chat-message-state'] | { type: 'chat-initial-state'; payload: ChatMessage[] };

export const addChatMessage = createAction<ChatMessage>('chat/add-message');
export const updateChatMessage = createAction<ChatMessage>('chat/update-message');
export const deleteChatMessage = createAction<string>('chat/delete-message');
export const readChatMessages = createAction('chat/read-messages');
export const initializeChatMessages = createAction<ChatMessage[]>('chat/initialize');

export default createReducer<ChatState>({ unread: [], read: [] }, (builder) => {
    builder.addCase(addChatMessage, (state, action) => ({ ...state, unread: [...state.unread, action.payload] }));
    builder.addCase(updateChatMessage, (state, action) => ({
        read: state.read.map((message) => (message._id === action.payload._id ? action.payload : message)),
        unread: state.unread.map((message) => (message._id === action.payload._id ? action.payload : message)),
    }));
    builder.addCase(deleteChatMessage, (state, action) => ({
        read: state.read.filter(({ _id }) => _id === action.payload),
        unread: state.unread.filter(({ _id }) => _id === action.payload),
    }));
    builder.addCase(readChatMessages, (state) => ({
        unread: [],
        read: [...state.read, ...state.unread],
    }));

    builder.addCase(initializeChatMessages, (_state, action) => ({ read: [], unread: action.payload }));
});

// export default function chatReducer(state: ChatMessage[], action: ChatActions) {
//     switch (action.type) {
//         case 'create-chat-message':
//             return [...state, action.payload];
//         case 'update-chat-message':
//             return state;
//         case 'delete-chat-message':
//             return state;
//         case 'chat-initial-state':
//             return [...action.payload];
//         default:
//             return state || [];
//     }
// }
