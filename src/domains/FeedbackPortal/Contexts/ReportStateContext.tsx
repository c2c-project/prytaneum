/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { FeedbackReport, BugReport } from '../types';

type Report = FeedbackReport | BugReport;

interface ReportStateHandlers {
    updateReport: (report: Report) => void;
    deleteReport: (reportId: string) => void;
}
const defaultFunctions: ReportStateHandlers = {
    updateReport: (report: Report) => {},
    deleteReport: (reportId: string) => {},
};

export default React.createContext<ReportStateHandlers>(defaultFunctions);
