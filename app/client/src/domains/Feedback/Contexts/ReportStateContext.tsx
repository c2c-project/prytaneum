/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Report } from '../types';

interface ReportStateHandlers {
    updateReport: (report: Report) => void;
    refetchReports: () => void;
}
const defaultFunctions: ReportStateHandlers = {
    updateReport: (report: Report) => {},
    refetchReports: () => {},
};

export default React.createContext<ReportStateHandlers>(defaultFunctions);
