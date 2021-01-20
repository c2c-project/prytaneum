import { rest } from 'msw';
import faker from 'faker/locale/en';

const recent = faker.date.recent();
const future = faker.date.future();

const makeBaseReport = () => ({
    _id: faker.random.alphaNumeric(5),
    date: faker.date.between(recent, future),
    description: faker.lorem.paragraphs(),
    user: {
        _id: faker.random.alphaNumeric(5),
    },
});

const makeFeedbackReports = (amount: number) => {
    const feedbackReports = [];
    for (let i = 0; i < amount; i += 1) {
        feedbackReports.push(makeBaseReport());
    }
    return feedbackReports;
};

const makeBugReports = (amount: number) => {
    const bugReports = [];
    for (let i = 0; i < amount; i += 1) {
        const tempReport = makeBaseReport();
        bugReports.push({
            ...tempReport,
            townhallId: faker.random.alphaNumeric(12),
        });
    }
    return bugReports;
};

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

    // TODO: Return fake feedback reports after David reviews PR
    rest.get('/api/feedback/get-reports/:submitterId', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { submitterId } = req.params;
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
    rest.get('/api/bugs/get-reports/:submitterId', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { submitterId } = req.params;

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
