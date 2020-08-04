import axios from 'utils/axios';
import errors from 'utils/errors';

export interface ReportForm {
    description?: string;
    date?: Date;
}

export interface FeedbackForm extends ReportForm {
    // Add more fields in the future
}

export interface BugReportForm extends ReportForm {
    // Add more fields in the future
}

export async function createFeedbackReport(form: FeedbackForm) {
    const { date, description } = form;
    if (!date || !description) {
        throw errors.fieldError();
    }
    const body = { date, description };
    return axios.post('/api/feedback/create-report', body);
}

export async function updateFeedbackReport(form: FeedbackForm, _id: string) {
    const { description } = form;
    if (!description) {
        throw errors.fieldError();
    }
    if (!_id) {
        throw errors.internalError();
    }

    const body = { _id, newDescription: description };
    return axios.post('/api/feedback/update-report', body);
}

export async function createBugReport(form: BugReportForm, townhallId: string) {
    const { date, description } = form;
    if (!date || !description) {
        throw errors.fieldError();
    }

    if (!townhallId) {
        throw errors.internalError();
    }

    const body = { date, description, townhallId };
    return axios.post('/api/bugs/create-report', body);
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
    return axios.post('/api/bugs/update-report', body);
}
