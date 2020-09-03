import { rest } from 'msw';
import * as AuthTypes from 'domains/Auth/types';

export default [
    rest.post('/api/users/login', (req, res, ctx) => {
        // we do nothing with the password for now
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    rest.post('/api/users/consume-password-reset-token', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { token, form } = req.body as {
            token: string;
            form: AuthTypes.ForgotPassForm;
        };
        if (form.password === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200, 'Password Reset'));
    }),

    rest.post('/api/users/request-password-reset', (req, res, ctx) => {
        const { form } = req.body as {
            form: AuthTypes.ForgotPassRequestForm;
        };
        if (form.email === 'fail1234@gmail.com') {
            res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    rest.post('/api/users/register', (req, res, ctx) => {
        const { form } = req.body as {
            form: AuthTypes.RegisterForm;
        };
        if (form.username === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    rest.post('/api/confirm/user-email', (req, res, ctx) => {
        const { userId } = req.body as { userId: string };
        if (userId === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),
];
