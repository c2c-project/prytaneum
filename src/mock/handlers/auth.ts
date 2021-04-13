/* eslint-disable */
import { rest } from 'msw';
import faker from 'faker/locale/en';
import { 
    makeUser, 
    User, 
    ForgotPassForm, 
    RegisterForm, 
    ForgotPassRequestForm, 
} from 'prytaneum-typings';

// used to decide whether or not to fail in mocks
let failBit = 0;

export const makeUsers = (num?: number): User[] => {
    const ret = [];
    const iterations = num || 1;
    for (let i = 0; i < iterations; i += 1) {
        ret.push(makeUser());
    }
    return ret;
};

export default [
    rest.post('/api/users/login', (req, res, ctx) => {
        // we do nothing with the password for now
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password } = req.body as {
            email: string;
            password: string;
        };
        if (password === 'fail') {
            return res(ctx.status(400));
        }
        return res(
            ctx.cookie('jwt', 'not a real jwt'),
            ctx.status(200),
            ctx.json({
                _id: faker.random.alphaNumeric(5),
                roles: ['user', 'admin', 'organizer'],
            })
        );
    }),

    rest.post('/api/users/consume-password-reset-token', (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { token, form } = req.body as {
            token: string;
            form: ForgotPassForm;
        };
        if (form.password === 'fail') {
            return res(ctx.status(400));
        }
        return res(ctx.status(200), ctx.text('Password has been reset'));
    }),

    rest.post('/api/users/request-password-reset', (req, res, ctx) => {
        const { form } = req.body as {
            form: ForgotPassRequestForm;
        };
        if (form.email === 'fail1234@gmail.com') {
            res(ctx.status(400));
        }
        return res(ctx.status(200));
    }),

    rest.post('/api/users/register', (req, res, ctx) => {
        const { form } = req.body as {
            form: RegisterForm;
        };
        if (form.email === 'fail@fail.com') {
            return res(ctx.status(400), ctx.text('Deliberate failure'));
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
    rest.get('/api/users/me', (req, res, ctx) => {
        const { jwt } = req.cookies;
        // return res(ctx.status(401));
        // if (jwt) return res(ctx.status(200), ctx.json(makeUser()));
        // return res(ctx.status(204));
        return res(ctx.status(200), ctx.json(makeUser()));
    }),
    rest.get('/api/users/logout', (req, res, ctx) => {
        // deletes the cookie
        return res(ctx.cookie('jwt', ''), ctx.status(200));
    }),

    rest.put('/api/users/me/name', (req, res, ctx) => {
        const { fname, lname } = req.body as { fname: string; lname: string };

        // fake fail case
        if (fname === 'fail' || lname === 'fail') {
            return res(ctx.status(400), ctx.text('failed on purpose for name change'));
        }

        // make a fake user and just reassign its names
        let toReturnUser = makeUser();
        toReturnUser.name.first = fname;
        toReturnUser.name.last = lname;
        return res(
            ctx.status(200),
            ctx.json({
                user: toReturnUser,
            })
        );
    }),
    rest.put('/api/users/me/email', (req, res, ctx) => {
        const { email } = req.body as { email: string };

        // fake fail case
        if (email === 'fail@fail.com') {
            return res(ctx.status(400), ctx.text('failed on purpose for email change'));
        }

        // make a fake user and just reassign its email
        let toReturnUser = makeUser();
        toReturnUser.email.address = email;
        return res(ctx.status(200), ctx.json({ user: toReturnUser }));
    }),
    rest.put('/api/users/me/notifications', (req, res, ctx) => {
        // to simulate failure, we just fail 50% of the time for this mock
        if (failBit === 1) {
            failBit ^= 1;
            return res(ctx.status(400), ctx.text('failed on purpose for notif change'));
        }

        let { enabled, types } = req.body as { enabled: boolean; types: string[] };
        // make a fake user and reassign its settings
        let toReturnUser = makeUser();
        toReturnUser.settings.notifications.enabled = !enabled;
        toReturnUser.settings.notifications.types = types;
        failBit ^= 1;
        return res(ctx.status(200), ctx.json({ user: toReturnUser }));
    }),
];
