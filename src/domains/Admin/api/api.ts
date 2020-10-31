import axios from 'utils/axios';
import errors from 'utils/errors';
import { User } from 'types';

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

export async function promoteUser(form: User, id: string) {
    // const { _id, name, email, timeStamp, status, actionHistoryData } = form;

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
