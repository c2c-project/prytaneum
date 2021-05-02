import type { FeedbackReport, BugReport } from 'prytaneum-typings';

export type ReportTypes = 'Feedback' | 'Bug';

export type Report = (FeedbackReport & { type: 'Feedback' }) | (BugReport & { type: 'Bug' });
