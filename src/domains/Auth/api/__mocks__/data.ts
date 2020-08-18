import { rest } from 'msw';
import { worker } from 'mock/browser';

const handlers = [
    rest.post('/api/users/login', (req, res, ctx) => {
        return res(ctx.cookie('jwt', 'not a real jwt'));
    }),
    rest.post('/api/users/login-temporary', (req, res, ctx) => {
        return res(ctx.cookie('jwt', 'not a real jwt'));
    }),
    // rest.post('/api/users/')
];

worker.use(...handlers);
