/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */
import axios from 'utils/axios';
import errors from 'utils/errors';
import API from './index';

beforeEach(() => {
    jest.spyOn(axios, 'post');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('#login', () => {
    it('should reject blank fields', async () => {
        await expect(API.login('', '')).rejects.toThrow(errors.fieldError());
        expect(axios.post).not.toHaveBeenCalled();
        await expect(API.login('', 'password')).rejects.toThrow(
            errors.fieldError()
        );
        expect(axios.post).not.toHaveBeenCalled();
        await expect(API.login('email', '')).rejects.toThrow(
            errors.fieldError()
        );
        expect(axios.post).not.toHaveBeenCalled();
    });
    it('should accept a email and password pair', async () => {
        const resolvedValue = { status: 200 };
        (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
            resolvedValue
        );
        await expect(API.login('email', 'password')).resolves.toBe(
            resolvedValue
        );
        expect(axios.post).toHaveBeenCalledWith('/api/users/login', {
            email: 'email',
            password: 'password',
        });
    });
});

describe('#forgotPassReset', () => {
    it('should reject mismatching passwords', async () => {
        await expect(
            API.forgotPassReset('123', {
                password: '1',
                confirmPassword: '2',
            })
        ).rejects.toThrow(errors.passMatch());
        expect(axios.post).not.toHaveBeenCalled();
    });
    it('should reject a blank fields', async () => {
        await expect(
            API.forgotPassReset('123', { password: '', confirmPassword: '' })
        ).rejects.toThrow(errors.fieldError());
        await expect(
            API.forgotPassReset('123', { password: '1', confirmPassword: '' })
        ).rejects.toThrow(errors.fieldError());
        await expect(
            API.forgotPassReset('123', { password: '', confirmPassword: '1' })
        ).rejects.toThrow(errors.fieldError());
    });
    it('should reject a falsy token', async () => {
        await expect(
            API.forgotPassReset('', { password: '', confirmPassword: '' })
        ).rejects.toThrow(errors.fieldError());
        expect(axios.post).not.toHaveBeenCalled();
    });
    it('should accept valid input', async () => {
        const resolvedValue = { status: 200 };
        const form = {
            password: '1',
            confirmPassword: '1',
        };
        const token = '123';
        (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
            resolvedValue
        );
        await expect(API.forgotPassReset(token, form)).resolves.toBe(
            resolvedValue
        );
        expect(axios.post).toHaveBeenCalledWith(
            `/api/users/reset-password/${token}`,
            {
                ...form,
            }
        );
    });
});

describe('#forgotPassRequest', () => {
    it('should reject blank fields', async () => {
        await expect(API.forgotPassRequest({ email: '' })).rejects.toThrow(
            errors.fieldError()
        );
    });
    it('should reject various invalid emails', async () => {
        await expect(
            API.forgotPassRequest({ email: 'name@name@example.com' })
        ).rejects.toThrow(errors.invalidEmail());
        await expect(
            API.forgotPassRequest({ email: 'a.@b.com' })
        ).rejects.toThrow(errors.invalidEmail());
        await expect(
            API.forgotPassRequest({ email: '.a@b.com' })
        ).rejects.toThrow(errors.invalidEmail());
        await expect(
            API.forgotPassRequest({ email: 'a@.b.com' })
        ).rejects.toThrow(errors.invalidEmail());
        await expect(
            API.forgotPassRequest({ email: 'a@b..com' })
        ).rejects.toThrow(errors.invalidEmail());
    });
    it('should accept valid emails', async () => {
        const resolvedValue = { status: 200 };
        (axios as jest.Mocked<typeof axios>).post.mockResolvedValue(
            resolvedValue
        );
        await expect(
            API.forgotPassRequest({ email: 'a.b.c.d@email.com' })
        ).resolves.toBe(resolvedValue);
        expect(axios.post).toHaveBeenCalledWith('/api/users/forgot-password', {
            email: 'a.b.c.d@email.com',
        });
        await expect(
            API.forgotPassRequest({ email: 'user@example.com' })
        ).resolves.toBe(resolvedValue);
        expect(axios.post).toHaveBeenCalledWith('/api/users/forgot-password', {
            email: 'user@example.com',
        });
        await expect(
            API.forgotPassRequest({ email: 'mysite@you.me.net' })
        ).resolves.toBe(resolvedValue);
        expect(axios.post).toHaveBeenCalledWith('/api/users/forgot-password', {
            email: 'mysite@you.me.net',
        });
        await expect(
            API.forgotPassRequest({ email: 'my.own.site@ourearth.org' })
        ).resolves.toBe(resolvedValue);
        expect(axios.post).toHaveBeenCalledWith('/api/users/forgot-password', {
            email: 'my.own.site@ourearth.org',
        });
    });
});
