interface User {
    _id: string;
}

export interface ReportForm {
    description?: string;
    date?: Date;
    user?: User;
}

export interface FeedbackForm extends ReportForm {}

export interface BugReportForm extends ReportForm {
    townhallId?: string;
}
