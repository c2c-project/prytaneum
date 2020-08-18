import axios from 'utils/axios';
import errors from 'utils/errors';

export interface ReportForm {
    _id?: string;
    description?: string;
    date: Date | string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FeedbackForm extends ReportForm {
    // Add more fields in the future
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BugReportForm extends ReportForm {
    // Add more fields in the future
}

export type Report = Required<ReportForm>;
export type FeedbackReport = Required<ReportForm>;
export type BugReport = Required<BugReportForm> & { townhallId: string };

// Feedback reports API functions
export async function createFeedbackReport(form: FeedbackForm) {
    const { date, description } = form;
    if (!date || !description) {
        throw errors.fieldError();
    }
    const body = { date, description };
    return axios.post<unknown>('/api/feedback/create-report', body);
}

export async function getFeedbackReports(page: number, ascending: string) {
    if (!page || !ascending) {
        throw errors.fieldError();
    }
    const params = {
        page,
        ascending,
    };
    return axios.get<{ reports: FeedbackReport[] }>(
        '/api/feedback/get-reports',
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

export async function deleteFeedbackReport(form: FeedbackForm) {
    const { _id } = form;
    if (!_id) {
        throw errors.internalError();
    }
    const body = { _id };
    return axios.post('/api/feedback/delete-report', body);
}

// Bug reports API functions
export async function createBugReport(form: BugReportForm, townhallId: string) {
    const { date, description } = form;
    if (!date || !description) {
        throw errors.fieldError();
    }

    if (!townhallId) {
        throw errors.internalError();
    }

    const body = { date, description, townhallId };
    return axios.post<unknown>('/api/bugs/create-report', body);
}

export async function getBugReports(page: number, ascending: string) {
    if (!page || !ascending) {
        throw errors.fieldError();
    }
    const params = {
        page,
        ascending,
    };
    return axios.get<{ reports: BugReport[] }>('/api/bugs/get-reports', {
        params,
    });
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

export async function deleteBugReport(form: BugReportForm) {
    const { _id } = form;
    if (!_id) {
        throw errors.internalError();
    }
    const body = { _id };
    return axios.post('/api/bugs/delete-report', body);
}
