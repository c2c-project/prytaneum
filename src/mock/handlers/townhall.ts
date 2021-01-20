import { rest } from 'msw';
import {
    makeTownhalls,
    makeTownhall,
    makeQuestion,
    TownhallForm,
    QuestionForm,
} from 'prytaneum-typings';

export default [
    rest.post('/api/townhalls', (req, res, ctx) => {
        const form = req.body as TownhallForm;
        if (form.description === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    rest.put('/api/townhalls/:townhallId', (req, res, ctx) => {
        const form = req.body as TownhallForm;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { townhallId } = req.params as {
            townhallId: string;
        };
        if (form.description === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    rest.get('/api/townhalls', (req, res, ctx) => {
        return res(ctx.json(makeTownhalls(50)), ctx.status(200));
    }),

    rest.get('/api/townhalls/:townhallId', (req, res, ctx) => {
        const { townhallId } = req.params as { townhallId: string };
        if (townhallId === '0') {
            return res(
                ctx.json({
                    townhall: null,
                }),
                ctx.status(400)
            );
        }
        return res(ctx.json(makeTownhall()), ctx.status(200));
    }),

    rest.post('/api/townhalls/:townhallId/questions', (req, res, ctx) => {
        const { townhallId } = req.params as { townhallId: string };
        const form = req.body as QuestionForm;

        if (form.question === 'fail' || townhallId === '0') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),
    rest.post('/api/townhalls/:townhallId/configure', (req, res, ctx) => {
        // const { townhallId } = req.params as { townhallId: string };
        // const form = req.body as TownhallSettings;
        // TODO: way for this to fail
        return res(ctx.status(200));
    }),
    rest.get('/api/townhalls/:townhallId/questions', (req, res, ctx) => {
        if (Math.random() > 0.5)
            return res(ctx.status(200), ctx.json([makeQuestion()]));
        return res(ctx.status(200), ctx.json([]));
    }),
    rest.put(
        '/api/townhalls/:townhallId/questions/:questionId/like',
        (req, res, ctx) => {
            return res(ctx.status(200));
        }
    ),
    rest.get('/api/townhalls/:townhallId/chat-messages', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
    }),
];
