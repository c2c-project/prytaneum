import axios from 'utils/axios';
import errors from 'utils/errors';
import { UserProfile } from '../types';

interface RequestBody {
    form: UserProfile;
}

type Update = RequestBody & { id: string };

export async function getUserList() {
    return axios.get<{ list: UserProfile[] }>('/api/users/list');
}

export async function getUser(_id: string) {
    if (!_id) {
        throw errors.internalError();
    }
    return axios.get<{ user: UserProfile }>(`/api/users/${_id}`);
}

export async function promoteUser(form: UserProfile, id: string) {
    const { _id, name, email, timeStamp, status, actionHistoryData } = form;

    if (
        !_id ||
        !name ||
        !email ||
        !timeStamp ||
        !status ||
        !actionHistoryData
    ) {
        throw errors.fieldError();
    }
    if (!id) {
        throw errors.internalError();
    }
    const body: Update = { form, id };
    return axios.post<unknown>(`/api/users/${id}/update`, body);
}
