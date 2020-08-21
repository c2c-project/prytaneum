import axios from 'utils/axios';
import errors from 'utils/errors';
import * as AuthTypes from '../types';

/** Function to POST to /api/users/login if username is valid
 *  @category Domains/Auth
 *  @constructor login
 *  @param {string} username the username to login with
 *  @param {string} password the password to try to login with username
*/
export async function login(username?: string, password?: string) {
    if (!username || !password) {
        throw errors.fieldError();
    }
    // check if valid
    if (!username.match(/\w+/g) || !password.match(/\w+/g)) {
        throw errors.fieldError();
    }
    return axios.post('/api/users/login', {
        username,
        password,
    });
}

/** Function to POST to /api/users/login to login as a temporary account, ie no password, only a display name
 *  @category Domains/Auth
 *  @constructor loginTemp
 *  @param {string} username the username to login with
*/
export async function loginTemp(username: string) {
    if (!username.match(/\w+/g)) {
        throw errors.fieldError();
    }
    return axios.post('/api/users/login-temporary', {
        username,
    });
}

export async function forgotPassReset(
    token: string | unknown,
    form: AuthTypes.ForgotPassForm
) {
    const { password, confirmPassword } = form;

    if (!password || !confirmPassword) {
        throw errors.fieldError();
    }

    if (password !== confirmPassword) {
        throw errors.passMatch();
    }

    if (!token) {
        throw errors.missingToken();
    }

    return axios.post('/api/users/consume-password-reset-token', {
        token,
        form,
    });
}

interface ForgotPassRequestForm {
    email: string;
}

/** Function to request a password reset
 *  @category Domains/Auth
 *  @constructor forgotPassRequest
 *  @param {ForgotPassForm} form the form to submit the reset through
*/
export async function forgotPassRequest(form: AuthTypes.ForgotPassRequestForm) {
    if (!form.email) {
        throw errors.fieldError();
    }
    const match = form.email.match(/(\w+\.*)*\w+@(\w+\.)+\w+/gi);
    if (!match || match[0].length !== form.email.length) {
        throw errors.invalidEmail();
    }
    return axios.post('/api/users/request-password-reset', { form });
}

interface RegisterForm {
    username?: string;
    password?: string;
    email?: string;
    confirmPassword?: string;
}

/** Function to register a new user, pulls the data from the form, checks if its valid, then returns either a POST, or an error if something is invalid
 *  @category Domains/Auth
 *  @constructor register
 *  @param {RegisterForm} form the form to submit the new user registration through
*/
export async function register(form: AuthTypes.RegisterForm) {
    const { username, password, email, confirmPassword } = form;

    if (!username || !password || !email || !confirmPassword) {
        throw errors.fieldError();
    }

    const match = email.match(/(\w+\.*)*\w+@(\w+\.)+\w+/gi);
    if (!match || match[0].length !== email.length) {
        throw errors.invalidEmail();
    }

    if (password !== confirmPassword) {
        throw errors.passMatch();
    }
    return axios.post('/api/users/register', { form });
}

/** Function to confirm user from email
 *  @category Domains/Auth
 *  @constructor verifyEmail
 *  @param {string} userId the userId to check
*/
export async function verifyEmail(userId: string) {
    if (!userId) {
        throw errors.invalidInfo();
    }
    return axios.post('/api/confirm/user-email', { userId });
}
