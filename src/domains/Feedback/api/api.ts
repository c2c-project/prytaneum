import axios from 'utils/axios';
import errors from 'utils/errors';
import {
    FeedbackForm,
    FeedbackReport,
    BugReport,
    BugReportForm,
} from '../types';

// Feedback reports API functions
export async function createFeedbackReport(form: FeedbackForm, date: string) {
    const { description } = form;
    if (!description) {
        throw errors.fieldError();
    }
    if (!date) {
        throw errors.internalError();
    }
    const body = { date, description };
    return axios.post<unknown>('/api/feedback/create-report', body);
}

export async function getFeedbackReportsBySubmitter(
    page: number,
    ascending: string,
    submitterId: string
) {
    if (!page || !ascending) {
        throw errors.fieldError();
    }

    if (!submitterId) {
        throw errors.internalError();
    }

    const params = {
        page,
        ascending,
    };
    return axios.get<{ reports: FeedbackReport[]; count: number }>(
        `/api/feedback/get-reports/${submitterId}`,
        {
            params,
        }
    );
}

export async function updateFeedbackReport(form: FeedbackForm) {
    const { description, _id } = form;
    if (!description) {
        throw errors.fieldError();
    }
    if (!_id) {
        throw errors.internalError();
    }

    const body = { _id, newDescription: description };
    return axios.post<unknown>('/api/feedback/update-report', body);
}

export async function deleteFeedbackReport(_id: string) {
    if (!_id) {
        throw errors.internalError();
    }
    const body = { _id };
    return axios.post('/api/feedback/delete-report', body);
}

// Bug reports API functions
export async function createBugReport(
    form: BugReportForm,
    date: string,
    townhallId: string
) {
    const { description } = form;

    if (!description) {
        throw errors.fieldError();
    }

    if (!date || !townhallId) {
        throw errors.internalError();
    }

    const body = { date, description, townhallId };
    return axios.post<unknown>('/api/bugs/create-report', body);
}

export async function getBugReportsBySubmitter(
    page: number,
    ascending: string,
    submitterId: string
) {
    if (!page || !ascending) {
        throw errors.fieldError();
    }

    if (!submitterId) {
        throw errors.internalError();
    }

    const params = {
        page,
        ascending,
    };
    return axios.get<{ reports: BugReport[]; count: number }>(
        `/api/bugs/get-reports/${submitterId}`,
        {
            params,
        }
    );
}

export async function updateBugReport(form: BugReportForm) {
    const { description, _id } = form;
    if (!description) {
        throw errors.fieldError();
    }
    if (!_id) {
        throw errors.internalError();
    }
    const body = { _id, newDescription: description };
    return axios.post<unknown>('/api/bugs/update-report', body);
}

export async function deleteBugReport(_id: string) {
    if (!_id) {
        throw errors.internalError();
    }
    const body = { _id };
    return axios.post('/api/bugs/delete-report', body);
}
