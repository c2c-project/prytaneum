import axios from 'utils/axios';
import errors from 'utils/errors';
import type { FeedbackReportForm, BugReportForm, FeedbackReport, BugReport } from 'prytaneum-typings';
import { ReportTypes } from '../types';

// Feedback reports API functions
export async function createFeedbackReport(form: FeedbackReportForm) {
    const { description } = form;
    if (!description) {
        throw errors.fieldError();
    }
    const body = { description };
    return axios.post<unknown>('/api/feedback/create-report', body);
}

export async function getFeedbackReportsBySubmitter(page: number, ascending: string) {
    if (!page || !ascending) {
        throw errors.fieldError();
    }

    const params = {
        page,
        ascending,
    };
    return axios.get<{ reports: FeedbackReport[]; count: number }>('/api/feedback/get-reports', {
        params,
    });
}

export async function updateFeedbackReport(form: FeedbackReportForm, _id: string) {
    const { description } = form;
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
export async function createBugReport(form: BugReportForm, townhallId: string) {
    const { description } = form;

    if (!description) {
        throw errors.fieldError();
    }

    if (!townhallId) {
        throw errors.internalError();
    }

    const body = { description, townhallId };
    return axios.post<unknown>('/api/bugs/create-report', body);
}

export async function getBugReportsBySubmitter(page: number, ascending: string) {
    if (!page || !ascending) {
        throw errors.fieldError();
    }

    const params = {
        page,
        ascending,
    };
    return axios.get<{ reports: BugReport[]; count: number }>('/api/bugs/get-reports', {
        params,
    });
}

export async function updateBugReport(form: BugReportForm, _id: string) {
    const { description } = form;
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

export async function replyToReport(_id: string, content: string, reportType: ReportTypes) {
    if (!_id || !reportType) {
        throw errors.internalError();
    }
    if (!content) {
        throw errors.fieldError();
    }

    const body = {
        content,
    };

    return axios.put(`/api/${reportType === 'Feedback' ? 'feedback-reports' : 'bug-reports'}/${_id}/reply`, body);
}
