/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { FeedbackReport, BugReport } from '../types';

type Report = FeedbackReport | BugReport;

interface ReportFunctions {
    updateReport: (report: Report) => void;
    deleteReport: (reportId: string) => void;
}
const defaultFunctions: ReportFunctions = {
    updateReport: (report: Report) => {},
    deleteReport: (reportId: string) => {},
};

export default React.createContext<ReportFunctions>(defaultFunctions);
