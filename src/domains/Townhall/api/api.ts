import axios from 'utils/axios';
import errors from 'utils/errors';

import { Townhall, TownhallForm, TownhallQuestionForm } from '../types';

interface RequestBody {
    form: TownhallForm;
}
type Create = RequestBody;
type Update = RequestBody & { townhallId: string };

export async function createTownhall(form: TownhallForm) {
    const {
        title,
        date,
        description,
        scope,
        private: isPrivate,
        speaker,
        topic,
    } = form;
    if (
        !title ||
        !date ||
        !description ||
        !scope ||
        !speaker ||
        !topic ||
        isPrivate === undefined
    ) {
        throw errors.fieldError();
    }
    const body: Create = { form };
    return axios.post<unknown>('/api/townhalls/create', body);
}

export async function updateTownhall(form: TownhallForm, townhallId: string) {
    const {
        title,
        date,
        description,
        scope,
        private: isPrivate,
        speaker,
        topic,
    } = form;
    if (
        !title ||
        !date ||
        !description ||
        !scope ||
        !speaker ||
        !topic ||
        isPrivate === undefined
    ) {
        throw errors.fieldError();
    }

    // townhallId should be a part of the url
    if (!townhallId) {
        throw errors.internalError();
    }

    const body: Update = { form, townhallId };
    return axios.post<unknown>('/api/townhalls/update', body);
}

export async function getTownhallList(currentUser?: boolean) {
    const query = currentUser ? '?currentUser=true' : '';
    return axios.get<{ list: Townhall[] }>(`/api/townhalls/list${query}`);
}

export async function getTownhall(id: string) {
    return axios.get<{ townhall: Townhall }>(`/api/townhalls/${id}`);
}

export async function createQuestion(form: TownhallQuestionForm) {
    const body: { form: TownhallQuestionForm } = { form };
    return axios.post('/api/townhalls/:_id/create-question', body);
}
