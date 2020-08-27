import React from 'react';
import { AxiosResponse } from 'axios';

import { updateFeedbackReport, deleteFeedbackReport } from '../api';
import { FeedbackForm, BugReportForm } from '../types';

export interface ReportEndpointHandlers {
    submitEndpoint: (
        form: FeedbackForm | BugReportForm
    ) => Promise<AxiosResponse<unknown>>;
    deleteEndpoint: (_id: string) => Promise<AxiosResponse<unknown>>;
}

// By default will use feedback reports functions
export const defaultEndpointHandlers = {
    submitEndpoint: (form: FeedbackForm) => updateFeedbackReport(form),
    deleteEndpoint: (_id: string) => deleteFeedbackReport(_id),
};

export default React.createContext<ReportEndpointHandlers>(
    defaultEndpointHandlers
);
