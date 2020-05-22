import axios from '../../utils/axios';
import errors from '../../utils/errors';

export async function login(username, password) {
    // check if valid
    if (!username.match(/\w+/g) || !password.match(/\w+/g)) {
        throw errors.fieldError();
    }
    return axios.post('/api/users/login', {
        username,
        password,
    });
}

export async function loginTemp(username) {
    if (!username.match(/\w+/g)) {
        throw errors.fieldError();
    }
    return axios.post('/api/users/login-temporary', {
        username,
    });
}

export async function logout() {}

export async function forgotPassConsume() {}

export async function forgotPassRequest() {}

export async function register() {}
