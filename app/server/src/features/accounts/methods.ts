import bcrypt from 'bcryptjs';
import { PrismaClient } from '@local/__generated__/prisma';
import { toGlobalId } from '@local/features/utils';

import * as jwt from '@local/lib/jwt';
import {
    DeleteAccountForm,
    LoginForm,
    RegistrationForm,
    UpdateEmailForm,
    UpdatePasswordForm,
} from '@local/graphql-types';

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

    const registeredUser = await register(prisma, input, input.password);
    const token = await jwt.sign({ id: toUserId(registeredUser).id });

    return { registeredUser, token };
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

    // NOTE: graphql will remove any sensitive fields, such as password, since it is not a query-able field
    return { user, token };
}

/**
 * updates the user's email
 */
export async function updateEmail(prisma: PrismaClient, input: UpdateEmailForm) {
    const { currentEmail, newEmail } = input;

    // TODO Require email validation via link with token to confirm the update

    // validiation if no other user exists with the new email
    const user = await prisma.user.findUnique({ where: { email: newEmail } });
    if (user)
        throw new Error('Updating email failed: Another user exists with this email. Please input a different email.');

    // update user email
    const updatedUser = await prisma.user.update({
        where: { email: currentEmail },
        data: { email: newEmail },
    });

    // generate token
    const token = await jwt.sign({ id: toUserId(updatedUser).id });

    // return update user and token
    return { updatedUser, token };
}

/**
 * updates the user's password
 */
export async function updatePassword(prisma: PrismaClient, input: UpdatePasswordForm) {
    const { email, oldPassword, newPassword, confirmNewPassword } = input;

    // fetch user for password validation
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error('Account not found.');

    const userWithGlobalId = toUserId(user);

    // if there is no password, the user must finish registering their account, how to let them know... TODO:
    if (!userWithGlobalId || !userWithGlobalId.password) throw new Error('Updating password failed: Missing password.');

    const isValidPassword = await bcrypt.compare(oldPassword, userWithGlobalId.password);

    // validation if password matches actual password
    if (!isValidPassword) throw new Error('Updating password failed: Invalid password.');

    // validation if new password is at least 8 characters
    if (newPassword.length < 8) throw new Error('New password must be at least 8 characters.');

    // validation if new password is strong
    // strong passwords are alphanumeric with a mixture of lowercase/uppercase characters and at least one special character
    const regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&*., ?])');
    if (!regex.test(newPassword))
        throw new Error(
            'New password must contain a mixture of lowercase and uppercase letters, at least one number, and at least one special character.'
        );

    // validation if new passwords match
    if (newPassword !== confirmNewPassword) throw new Error('Passwords must match.');

    const encryptedPassword = newPassword ? await bcrypt.hash(newPassword, 10) : null;

    // update user password
    const updatedUser = await prisma.user.update({
        where: { email },
        data: { password: encryptedPassword },
    });

    // generate token
    const token = await jwt.sign({ id: toUserId(updatedUser).id });

    // return updated user and token
    return { updatedUser, token };
}

/**
 * deletes the user's account
 */
export async function deleteAccount(prisma: PrismaClient, input: DeleteAccountForm) {
    const { email, password, confirmPassword } = input;

    // fetch user for password validation
    const user = await prisma.user.findUnique({ where: { email } });
    const userWithGlobalId = toUserId(user);

    // if there is no password, the user must finish registering their account, how to let them know... TODO:
    if (!userWithGlobalId || !userWithGlobalId.password) throw new Error('Deleting account failed: Missing password.');

    // validation if password matches actual password
    const isValidPassword = await bcrypt.compare(password, userWithGlobalId.password);

    if (!isValidPassword) throw new Error('Deleting account failed: Invalid password.');

    // validation if passwords match
    if (password !== confirmPassword) throw new Error('Passwords must match.');

    // delete user by email
    const deletedUser = await prisma.user.delete({ where: { email } });

    // return deleted user
    return { deletedUser };
}
