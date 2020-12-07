/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { FeedbackReport, BugReport } from '../types';

type Report = FeedbackReport | BugReport;

interface ReportStateHandlers {
    updateReport: (report: Report) => void;
    refetchReports: () => void;
}
const defaultFunctions: ReportStateHandlers = {
    updateReport: (report: Report) => {},
    refetchReports: () => {},
};

export default React.createContext<ReportStateHandlers>(defaultFunctions);
