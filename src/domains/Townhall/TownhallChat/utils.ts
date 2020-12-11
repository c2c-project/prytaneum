import type { ChatMessage } from 'prytaneum-typings';

type CreatePayload = {
    type: 'create-chat-message';
    payload: ChatMessage;
};
type UpdatePayload = {
    type: 'update-chat-message';
    payload: ChatMessage;
};
type DeletePayload = {
    type: 'delete-chat-message';
    payload: ChatMessage;
};
type ModeratePayload = {
    type: 'moderate-chat-message';
    payload: ChatMessage;
};
export type InitialState = { type: 'initial-state'; payload: ChatMessage[] };

export type Actions =
    | CreatePayload
    | UpdatePayload
    | DeletePayload
    | ModeratePayload
    | InitialState;

export function chatReducer(state: ChatMessage[], action: Actions) {
    switch (action.type) {
        case 'create-chat-message':
            return [...state, action.payload];
        case 'update-chat-message':
            return state;
        case 'delete-chat-message':
            return state;
        case 'initial-state':
            return [...action.payload];
        default:
            return state;
    }
}
