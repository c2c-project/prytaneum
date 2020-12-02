import type { ChatMessage } from 'prytaneum-typings';

export interface NewMessage {
    type: 'new-message';
    payload: ChatMessage;
}

export interface UpdateMessage {
    type: 'update-message';
    payload: ChatMessage;
}

export interface DeleteMessage {
    type: 'delete-message';
    payload: Pick<ChatMessage, '_id'>;
}

export type Actions = NewMessage | UpdateMessage | DeleteMessage;

export function chatReducer(state: ChatMessage[], action: Actions) {
    switch (action.type) {
        case 'new-message':
            return [...state, action.payload];

        case 'update-message':
            return state;

        case 'delete-message':
            return state;

        default:
            return state;
    }
}
