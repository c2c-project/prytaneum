import { AxiosResponse } from 'axios';

export interface ReportForm {
    _id?: string;
    description?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FeedbackForm extends ReportForm {
    // Add more fields in the future
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BugReportForm extends ReportForm {
    // Add more fields in the future
}

type Report = Required<ReportForm> & {
    date: string;
    user: { _id: string };
};

export type FeedbackReport = Report;
export type BugReport = Report & { townhallId: string };

export type ReportObject = {
    Report: FeedbackReport | BugReport;
    submitEndpoint: (
        form: FeedbackForm | BugReportForm
    ) => Promise<AxiosResponse<unknown>>;
    deleteEndpoint: (_id: string) => Promise<AxiosResponse<unknown>>;
};
