import { rest } from 'msw';

export default [
    // Feedback reports
    rest.post('/api/feedback/create-report', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { date, description } = req.body as {
            date: string;
            description: string;
        };
        if (description === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    // TODO: Return fake feedback reports after David review PR
    rest.post('/api/feedback/get-reports', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { page, ascending } = req.params as {
            page: number;
            ascending: string;
        };
        if (page === -1) {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    rest.post('/api/feedback/update-report', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { newDescription, _id } = req.body as {
            newDescription: string;
            _id: string;
        };
        if (newDescription === 'fail') {
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

    // Bug reports
    rest.post('/api/bugs/create-report', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { date, description, townhallId } = req.body as {
            date: string;
            description: string;
            townhallId: string;
        };
        if (description === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    // TODO: Return fake bug reports after David review PR
    rest.post('/api/bugs/get-reports', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { page, ascending } = req.params as {
            page: number;
            ascending: string;
        };
        if (page === -1) {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    rest.post('/api/bugs/update-report', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { newDescription, _id } = req.body as {
            newDescription: string;
            _id: string;
        };
        if (newDescription === 'fail') {
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
];
