import axios from 'utils/axios';
import errors from 'utils/errors';
import { UserPromotionType, UserProfile } from '../types';

interface RequestBody {
    form: UserPromotionType;
}

type Update = RequestBody & { id: string };

export async function getUserList() {
    return axios.get<{ list: UserProfile[] }>('/api/users/list');
}

export async function getUser(id: string) {
    return axios.get<{ user: UserProfile }>(`/api/users/${id}`);
}

export async function promoteUser(form: UserPromotionType, id: string) {
    if (!id) {
        throw errors.internalError();
    }
    const body: Update = { form, id };
    return axios.post<unknown>(`/api/users/${id}/update`, body);
}
