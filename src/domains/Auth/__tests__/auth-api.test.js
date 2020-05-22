import * as Auth from '../auth-api';
import axios from '../../../utils/axios';
import errors from '../../../utils/errors';

beforeEach(() => {
    jest.spyOn(axios, 'post');
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('#login', () => {
    it('should reject blank username and password', async () => {
        await expect(Auth.login('', '')).rejects.toThrow(errors.fieldError());
        expect(axios.post).not.toHaveBeenCalled();
    });
    it('should reject blank username', async () => {
        await expect(Auth.login('', 'password')).rejects.toThrow(
            errors.fieldError()
        );
        expect(axios.post).not.toHaveBeenCalled();
    });
    it('should reject blank password', async () => {
        await expect(Auth.login('username', '')).rejects.toThrow(
            errors.fieldError()
        );
        expect(axios.post).not.toHaveBeenCalled();
    });
    it('should accept a username and password pair', async () => {
        const resolvedValue = { status: 200 };
        axios.post.mockResolvedValue(resolvedValue);
        await expect(Auth.login('username', 'password')).resolves.toBe(
            resolvedValue
        );
        expect(axios.post).toHaveBeenCalledWith('/api/users/login', {
            username: 'username',
            password: 'password',
        });
    });
});

describe('#login-temp', () => {
    it('should reject blank username', async () => {
        await expect(Auth.loginTemp('')).rejects.toThrow(errors.fieldError());
        expect(axios.post).not.toHaveBeenCalled();
    });
    it('should accept a username', async () => {
        const resolvedValue = { status: 200 };
        axios.post.mockResolvedValue(resolvedValue);
        await expect(Auth.loginTemp('username')).resolves.toBe(resolvedValue);
        expect(axios.post).toHaveBeenCalledWith('/api/users/login-temporary', {
            username: 'username',
        });
    });
});
