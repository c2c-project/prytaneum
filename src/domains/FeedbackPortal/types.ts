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
    submitterId: string;
    type: 'Feedback' | 'Bug';
};

export type FeedbackReport = Report;
export type BugReport = Report & { townhallId: string };
