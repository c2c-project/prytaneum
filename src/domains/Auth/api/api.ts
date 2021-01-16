import type {
    ForgotPassForm,
    ForgotPassRequestForm,
    RegisterForm,
    ClientSafeUser,
} from 'prytaneum-typings';

import axios from 'utils/axios';
import errors from 'utils/errors';

/** Function to POST to /api/users/login if email is valid
 *  @category Domains/Auth
 *  @constructor login
 *  @param {string} email the email to login with
 *  @param {string} password the password to try to login with username
 */
export async function login(email?: string, password?: string) {
    if (!email || !password) {
        throw errors.fieldError();
    }
    // check if valid
    if (!email.match(/\w+/g) || !password.match(/\w+/g)) {
        throw errors.fieldError();
    }
    // TODO: clientSafeUser instead of user
    return axios.post<{ user: ClientSafeUser }>('/api/users/login', {
        email,
        password,
    });
}

export async function forgotPassReset(token: string, form: ForgotPassForm) {
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

    return axios.post(`/api/users/reset-password/${token}`, {
        ...form,
    });
}

/** Function to request a password reset
 *  @category Domains/Auth
 *  @constructor forgotPassRequest
 *  @param {ForgotPassForm} form the form to submit the reset through
 */
export async function forgotPassRequest(form: ForgotPassRequestForm) {
    if (!form.email) {
        throw errors.fieldError();
    }
    const match = form.email.match(/(\w+\.*)*\w+@(\w+\.)+\w+/gi);
    if (!match || match[0].length !== form.email.length) {
        throw errors.invalidEmail();
    }
    return axios.post('/api/users/forgot-password', { ...form });
}

/** Function to register a new user, pulls the data from the form, checks if its valid, then returns either a POST, or an error if something is invalid
 *  @category Domains/Auth
 *  @constructor register
 *  @param {RegisterForm} form the form to submit the new user registration through
 */
export async function register(form: RegisterForm, query?: string) {
    const { password, email, confirmPassword } = form;
    let url = '/api/users/register';
    if (query) url = `${url}${query}`;

    if (!password || !email || !confirmPassword) {
        throw errors.fieldError();
    }

    const match = email.match(/(\w+\.*)*\w+@(\w+\.)+\w+/gi);
    if (!match || match[0].length !== email.length) {
        throw errors.invalidEmail();
    }

    if (password !== confirmPassword) {
        throw errors.passMatch();
    }
    return axios.post<{ user: ClientSafeUser }>(url, { ...form });
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

export async function getMyInfo() {
    // gets user info from the token in header
    return axios.get<ClientSafeUser>('/api/users/me');
}

export async function logout() {
    return axios.post('/api/users/logout');
}
