import { rest } from 'msw';
import {
    makeFeedbackReports,
    makeBugReports,
    FeedbackReportForm,
    BugReportForm,
    ReportReplyForm,
} from 'prytaneum-typings';

// TODO: Update once backend PR  is merged
export default [
    // Feedback reports
    rest.post('/api/feedback/create-report', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { description } = req.body as FeedbackReportForm;
        if (description === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    rest.get('/api/feedback/get-reports', (req, res, ctx) => {
        const page = req.url.searchParams.get('page');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const ascending = req.url.searchParams.get('ascending');

        if (!page) {
            return res(ctx.status(400));
        }
        return res(
            ctx.status(200),
            ctx.json({
                reports: makeFeedbackReports(10),
                count: 70,
            })
        );
    }),

    rest.post('/api/feedback/update-report', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { description } = req.body as FeedbackReportForm;

        if (description === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    rest.post('/api/feedback/delete-report', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id } = req.body as {
            _id: string;
        };
        return res(ctx.status(200));
    }),

    rest.put('/api/feedback-reports/:id/reply', (req, res, ctx) => {
        const { content } = req.body as ReportReplyForm;

        if (content === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    // Bug reports
    rest.post('/api/bugs/create-report', (req, res, ctx) => {
        const { description } = req.body as BugReportForm;
        if (description === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    rest.get('/api/bugs/get-reports', (req, res, ctx) => {
        const page = req.url.searchParams.get('page');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const ascending = req.url.searchParams.get('ascending');

        if (!page) {
            return res(ctx.status(400));
        }
        return res(
            ctx.status(200),
            ctx.json({
                reports: makeBugReports(10),
                count: 90,
            })
        );
    }),

    rest.post('/api/bugs/update-report', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { description } = req.body as BugReportForm;
        if (description === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    rest.post('/api/bugs/delete-report', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id } = req.body as {
            _id: string;
        };
        return res(ctx.status(200));
    }),

    rest.put('/api/bug-reports/:id/reply', (req, res, ctx) => {
        const { content } = req.body as ReportReplyForm;

        if (content === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),
];
