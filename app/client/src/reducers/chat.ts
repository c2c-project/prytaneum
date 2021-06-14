import { createAction, createReducer } from '@reduxjs/toolkit';
import type { SocketIOEvents, ChatMessage } from 'prytaneum-typings';

declare module 'react-redux' {
    interface DefaultRootState {
        chat: ChatState;
    }
}

export type ChatState = { unread: ChatMessage[]; read: ChatMessage[]; breakoutId: string; isActive: boolean };

export type ChatActions = SocketIOEvents['chat-message-state'] | { type: 'chat-initial-state'; payload: ChatMessage[] };

export const addChatMessage = createAction<ChatMessage>('breakout/add-message');
export const updateChatMessage = createAction<ChatMessage>('breakout/update-message');
export const deleteChatMessage = createAction<string>('breakout/delete-message');
export const readChatMessages = createAction('breakout/read-messages');
export const initializeChatMessages = createAction<ChatMessage[]>('chat/initialize');
export const breakoutStart = createAction<{ breakoutId: string }>('breakout/start');
export const breakoutEnd = createAction('breakout/end');
export const breakoutRoomChange = createAction<{ breakoutId: string }>('breakout/change');

export default createReducer<ChatState>({ unread: [], read: [], breakoutId: '', isActive: false }, (builder) => {
    builder.addCase(addChatMessage, (state, action) => ({ ...state, unread: [...state.unread, action.payload] }));
    builder.addCase(updateChatMessage, (state, action) => ({
        ...state,
        read: state.read.map((message) => (message._id === action.payload._id ? action.payload : message)),
        unread: state.unread.map((message) => (message._id === action.payload._id ? action.payload : message)),
    }));
    builder.addCase(deleteChatMessage, (state, action) => ({
        ...state,
        read: state.read.filter(({ _id }) => _id === action.payload),
        unread: state.unread.filter(({ _id }) => _id === action.payload),
    }));
    builder.addCase(readChatMessages, (state) => ({
        ...state,
        unread: [],
        read: [...state.read, ...state.unread],
    }));

    builder.addCase(breakoutStart, (state, action) => ({
        ...state,
        isActive: true,
        breakoutId: action.payload.breakoutId,
    }));

    builder.addCase(breakoutEnd, () => ({ read: [], unread: [], isActive: false, breakoutId: '' }));

    builder.addCase(initializeChatMessages, (state, action) => ({ ...state, read: [], unread: action.payload }));
    builder.addCase(breakoutRoomChange, (_state, action) => ({
        read: [],
        unread: [],
        isActive: true,
        breakoutId: action.payload.breakoutId,
    }));
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
