import qs from 'qs';
import type {
    TownhallForm,
    Townhall,
    TownhallSettings,
    ChatMessageForm,
    ChatMessage,
} from 'prytaneum-typings';

import axios from 'utils/axios';

/**
 * create a townhall
 */
export async function createTownhall(form: TownhallForm) {
    return axios.post<{ _id: string }>('/api/townhalls', qs.stringify(form));
}

/**
 * update a townhall
 */
export async function updateTownhall(form: TownhallForm, townhallId: string) {
    return axios.put<{ _id: string }>(
        `/api/townhalls/${townhallId}`,
        qs.stringify(form)
    );
}

/**
 * delete a townhall
 */
export async function deleteTownhall(townhallId: string) {
    return axios.delete<never>(`/api/townhalls/${townhallId}`);
}
/**
 * configure a townhall
 */
export async function configureTownhall(
    townhallId: string,
    settings: TownhallSettings
) {
    const url = `/api/townhalls/${townhallId}/configure`;
    return axios.post(url, settings);
}

/**
 * start a townhall
 */
export async function startTownhall(townhallId: string) {
    const url = `/api/townhalls/${townhallId}/start`;
    return axios.post(url);
}

/**
 * end a townhall that is currently in progress
 */
export async function endTownhall(townhallId: string) {
    const url = `/api/townhalls/${townhallId}/end`;
    return axios.post(url);
}

/**
 * retrieve a list of townhalls
 */
export async function getTownhallList() {
    return axios.get<Townhall[]>('/api/townhalls');
}

/**
 * retrieve a specific townhall
 */
export async function getTownhall(id: string) {
    return axios.get<Townhall>(`/api/townhalls/${id}`);
}

export async function createChatMessage(
    townhallId: string,
    messageForm: ChatMessageForm
) {
    return axios.post(
        `/api/townhalls/${townhallId}/chat-messages`,
        messageForm
    );
}

export async function updateChatMessage(
    townhallId: string,
    chatMessageId: string
) {
    return axios.put(
        `/api/townhalls/${townhallId}/chat-messasges/${chatMessageId}`
    );
}

export async function deleteChatMessage(
    townhallId: string,
    chatMessageId: string
) {
    return axios.delete(
        `/api/townhalls/${townhallId}/chat-messages/${chatMessageId}`
    );
}

export async function getChatmessages(townhallId: string) {
    return axios.get<ChatMessage[]>(
        `/api/townhalls/${townhallId}/chat-messages`
    );
}
