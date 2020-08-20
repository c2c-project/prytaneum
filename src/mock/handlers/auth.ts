import { rest } from 'msw';

export default [
    rest.post('/api/users/login', (req, res, ctx) => {
        // we do nothing with the password for now
        const { username, password } = req.body as {
            username: string;
            password: string;
        };
        if (username === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.cookie('jwt', 'not a real jwt'), ctx.status(200));
    }),
    rest.post('/api/users/login-temporary', (req, res, ctx) => {
        const { username } = req.body as {
            username: string;
        };
        if (username === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.cookie('jwt', 'not a real jwt'), ctx.status(200));
    }),
];
