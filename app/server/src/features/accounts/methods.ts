import bcrypt from 'bcrypt';
import { PrismaClient } from '@app/prisma';
import { toGlobalId } from '@local/features/utils';

import * as jwt from '@local/lib/jwt';
import { LoginForm, RegistrationForm } from '@local/graphql-types';

const toUserId = toGlobalId('User');

type MinimalUser = Pick<RegistrationForm, 'email'> & Partial<Pick<RegistrationForm, 'firstName' | 'lastName'>>;

/**
 * registers a user optionally with a password
 */
export async function register(prisma: PrismaClient, userData: MinimalUser, textPassword: string | null = null) {
    const { email, firstName, lastName } = userData;
    const encryptedPassword = textPassword ? await bcrypt.hash(textPassword, 10) : null;
    return prisma.user.create({
        data: {
            email,
            firstName: firstName || null,
            lastName: lastName || null,
            fullName: firstName && lastName ? `${firstName} ${lastName}` : null,
            password: encryptedPassword,
            preferredLang: 'EN', // TODO:
        },
    });
}

/**
 * looks up the user given the user id
 */
export function findUserById(id: string, prisma: PrismaClient) {
    return prisma.user.findUnique({ where: { id } });
}

/**
 * get organizations of this particular user
 * NOTE: the performance of this for one field probably leaves much to be wanted, two joins for one field
 */
export async function findOrgsByUserId(userId: string, prisma: PrismaClient) {
    const results = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            memberOf: {
                include: {
                    organization: true,
                },
            },
        },
    });

    if (!results) return null;

    // prepare data for graphql layer
    const formattedData = results.memberOf.map(({ organization }) => organization);

    return formattedData;
}

/**
 * function called when a user is registering themselves
 */
export async function registerSelf(prisma: PrismaClient, input: RegistrationForm) {
    if (input.password !== input.confirmPassword) throw new Error('Passwords must match');

    return register(prisma, input, input.password);
}

/**
 * logs in a user and returns the user and a token to be used as a cookie
 */
export async function loginWithPassword(prisma: PrismaClient, input: LoginForm) {
    //
    // ─── LOGIN VALIDATION ───────────────────────────────────────────────────────────
    //

    // https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#incorrect-and-correct-response-examples
    const errorMessage = 'Login failed; Invalid email or password.';

    const { email, password } = input;

    const user = await prisma.user.findUnique({ where: { email } });
    const userWithGlobalId = toUserId(user);

    // if there is no password, the user must finish registering their account, how to let them know... TODO:
    if (!userWithGlobalId || !userWithGlobalId.password) throw new Error(errorMessage);

    const isValidPassword = await bcrypt.compare(password, userWithGlobalId.password);

    if (!isValidPassword) throw new Error(errorMessage);

    //
    // ─── TOKEN GENERATION ───────────────────────────────────────────────────────────
    //

    // TODO: refresh vs access tokens? I may want to issue a short lived token
    // so that way I can store a refresh token in the user (although not the whole token, just the issuedAt of the refresh token)
    const token = await jwt.sign({ id: userWithGlobalId.id });

    // NOTE: graphql will remove any sensitive fields, such as password, since they it is not a query-able field
    return { user, token };
}
