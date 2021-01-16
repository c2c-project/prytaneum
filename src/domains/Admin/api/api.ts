import type { Roles, User } from 'prytaneum-typings';
import axios from 'utils/axios';
import errors from 'utils/errors';

interface RequestBody {
    form: User;
}

type Update = RequestBody & { id: string };

export async function getUserList() {
    return axios.get<{ list: User[] }>('/api/users/list');
}

export async function getUser(_id: string) {
    if (!_id) {
        throw errors.internalError();
    }
    return axios.get<{ user: User }>(`/api/users/${_id}`);
}

// FIXME:
export async function promoteUser(form: User, id: string) {
    // const { _id, email, timeStamp, status, actionHistoryData } = form;

    // if (
    //     !_id ||
    //     !name ||
    //     !email ||
    //     !timeStamp ||
    //     !status ||
    //     !actionHistoryData
    // ) {
    //     throw errors.fieldError();
    // }
    if (!id) {
        throw errors.internalError();
    }
    const body: Update = { form, id };
    return axios.post<unknown>(`/api/users/${id}/update`, body);
}

export async function generateLink(role: Roles) {
    return axios.post<{ token: string }>('/api/users/invite', { role });
}
