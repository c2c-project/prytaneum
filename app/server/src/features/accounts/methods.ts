import bcrypt from 'bcryptjs';
import { PrismaClient } from '@local/__generated__/prisma';
import { ProtectedError } from '@local/lib/ProtectedError';
import { errors, toGlobalId } from '@local/features/utils';

import * as jwt from '@local/lib/jwt';
import type {
    DeleteAccountForm,
    LoginForm,
    RegistrationForm,
    UpdateEmailForm,
    UpdatePasswordForm,
    ResetPasswordRequestForm,
    ResetPasswordForm,
    UpdateOrganizerForm,
} from '@local/graphql-types';

import { getOrCreateServer } from '@local/core/server';
import { sendEmail } from '@local/lib/email/email';
import { fromGlobalId } from 'graphql-relay';

const toUserId = toGlobalId('User');

type MinimalUser = Pick<RegistrationForm, 'email'> & Partial<Pick<RegistrationForm, 'firstName' | 'lastName'>>;

/**
 * Helper function for when we're trying to validate the input credentials match ones in our records.
 * If the authentication attempt is valid, then the user object will be returned.
 */
async function validateAuthenticationAttempt(prisma: PrismaClient, email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    // If there is no password set, the user likely needs to finish registering their account.
    // TODO: In order not to let an attacker know that this is the case, it's best to send
    // a follow up email to the user's account rather than display a specific error message in the app itself.
    if (!user?.password)
        throw new ProtectedError({
            userMessage: ProtectedError.loginErrorMessage,
            internalMessage: `User with email: ${email} does not exist or has no password set.`,
        });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword)
        throw new ProtectedError({
            userMessage: ProtectedError.loginErrorMessage,
            internalMessage: 'Incorrect password.',
        });

    return user;
}

function validatePasswordsMatch(password: string, confirmPassword: string) {
    if (password !== confirmPassword) throw new ProtectedError({ userMessage: 'Passwords must match.' });
}

async function hashPassword(password: string) {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw new ProtectedError({
            userMessage: 'Internal server error. Please try again later.',
            internalMessage: 'Error hashing password: ' + error.message,
        });
    }
}

/**
 * Naive implementation of checking how strong a password is. TODO: implement pwned passwords api, probably just use another package
 */
function validateNewPassword(password: string) {
    // validation if new password is at least 8 characters
    if (password.length < 8) throw new ProtectedError({ userMessage: 'New passwords must be at least 8 characters.' });
    if (password.length > 128)
        throw new ProtectedError({ userMessage: 'New passwords must be less than 128 characters.' });

    let hasLowerCase = false;
    let hasUpperCase = false;
    let hasNumber = false;
    let hasSpecialCharacter = false;

    // https://www.asciitable.com/
    const isInRangeInclusive = (num: number, lo: number, hi: number) => num >= lo && num <= hi;
    const isLowerCase = (charCode: number) => isInRangeInclusive(charCode, 97, 122);
    const isUpperCase = (charCode: number) => isInRangeInclusive(charCode, 65, 90);
    const isNumber = (charCode: number) => isInRangeInclusive(charCode, 48, 57);
    // Basically everything, but a space, invisible chars, or delete.
    const isSpecialChar = (charCode: number) =>
        isInRangeInclusive(charCode, 33, 47) ||
        isInRangeInclusive(charCode, 58, 64) ||
        isInRangeInclusive(charCode, 91, 96) ||
        isInRangeInclusive(charCode, 123, 126);

    for (let char of password) {
        if (isLowerCase(char.charCodeAt(0))) hasLowerCase = true;
        if (isUpperCase(char.charCodeAt(0))) hasUpperCase = true;
        if (isNumber(char.charCodeAt(0))) hasNumber = true;
        if (isSpecialChar(char.charCodeAt(0))) hasSpecialCharacter = true;
    }

    let errorMessage = 'Password missing required complexity:';

    if (!hasLowerCase) errorMessage += '\nlower case character';
    if (!hasUpperCase) errorMessage += '\nupper case character';
    if (!hasNumber) errorMessage += '\nnumber character';
    if (!hasSpecialCharacter) errorMessage += '\nspecial character';
    errorMessage += '.';

    const isPasswordStrongEnough = hasLowerCase && hasUpperCase && hasNumber && hasSpecialCharacter;
    if (!isPasswordStrongEnough) throw new ProtectedError({ userMessage: errorMessage });
}

async function maybeValidateAndHashPassword(password: string | null) {
    if (!password) return null;
    validateNewPassword(password);
    return hashPassword(password);
}

/**
 * registers a user optionally with a password
 */
export async function register(prisma: PrismaClient, userData: MinimalUser, textPassword: string | null = null) {
    const { email, firstName, lastName } = userData;

    // validiation if no other user exists with the new email
    const user = await prisma.user.findUnique({ where: { email: email } });

    // https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#account-creation
    // This could technically be an attack vector. Say a user creates an account and is trying to see
    // if a particular email is already registered. We should throw the same type of protected error
    // that is used on the account creation page.
    if (!!user)
        throw new ProtectedError({
            userMessage: ProtectedError.accountCreationErrorMessage,
            // This is probably only useful for debugging purposes, but it's still fine to log this anyways.
            internalMessage: `A user with the email ${email} already exists.`,
        });

    // TODO remove once shadow user account setup prompt is implemented
    if (!textPassword)
        throw new ProtectedError({
            userMessage: 'Password is required.',
            internalMessage: 'Shadow account setup is not implemented yet.',
        });

    // It's okay to not have a password, it means this is a user being registered via invitation.
    const encryptedPassword = await maybeValidateAndHashPassword(textPassword);
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

type UsersSearchFilter = {
    firstName: string;
    lastName: string;
    email: string;
};

export async function findAllUsers(viewerId: string, filter: UsersSearchFilter, prisma: PrismaClient) {
    // Only admins should be able to query for all users.
    const queryResult = await prisma.user.findUnique({ where: { id: viewerId } });
    if (!queryResult) return [];
    if (!queryResult.isAdmin) throw new ProtectedError({ userMessage: 'Only admins can fetch all users.' });

    return prisma.user.findMany({
        where: {
            firstName: { contains: filter.firstName },
            lastName: { contains: filter.lastName },
            email: { contains: filter.email },
        },
    });
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
 * get events that this particular user is a moderator of, or has been invited to
 * @param userId
 * @param prisma
 * @returns Event[]
 */
export async function findUsersEventsByUserId(userId: string, prisma: PrismaClient) {
    const results = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            moderatorOf: {
                include: {
                    event: true,
                },
            },
            invitedOf: {
                include: {
                    event: true,
                },
            },
        },
    });

    if (!results) return null;

    let formattedData = results.moderatorOf.map(({ event }) => event);
    // Check if event id already exists in the array. If it does, don't add it again.
    results.invitedOf.forEach(({ event }) => {
        if (!formattedData.find(({ id }) => id === event.id)) formattedData.push(event);
    });
    return formattedData;
}

/**
 * function called when a user is registering themselves
 */
export async function registerSelf(prisma: PrismaClient, input: RegistrationForm) {
    validatePasswordsMatch(input.password, input.confirmPassword);

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

    const { email, password } = input;
    const user = await validateAuthenticationAttempt(prisma, email, password);

    //
    // ─── TOKEN GENERATION ───────────────────────────────────────────────────────────
    //

    // TODO: refresh vs access tokens? I may want to issue a short lived token
    // so that way I can store a refresh token in the user (although not the whole token, just the issuedAt of the refresh token)
    const token = await jwt.sign({ id: toUserId(user).id });

    // NOTE: graphql will remove any sensitive fields, such as password, since it is not a query-able field
    return { user, token };
}

/**
 * Updates the user's email. Presumably, the user is already logged in.
 */
export async function updateEmail(prisma: PrismaClient, input: UpdateEmailForm) {
    const { currentEmail, newEmail } = input;

    // TODO: Require email validation via link with token to confirm the update

    // validiation if no other user exists with the new email
    const user = await prisma.user.findUnique({ where: { email: newEmail } });

    // https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#account-creation
    // This could technically be an attack vector. Say a user creates an account and is trying to see
    // if a particular email is already registered. We should throw the same type of protected error
    // that is used on the account creation page.
    if (!!user)
        throw new ProtectedError({
            userMessage: ProtectedError.accountCreationErrorMessage,
            // This is probably only useful for debugging purposes, but it's still fine to log this anyways.
            internalMessage: `A user with the email ${newEmail} already exists.`,
        });

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
 * Updates the user's password. Presumably, the user is already logged in and trying to change their password.
 */
export async function updatePassword(prisma: PrismaClient, input: UpdatePasswordForm) {
    const { email, oldPassword, newPassword, confirmNewPassword } = input;

    validatePasswordsMatch(newPassword, confirmNewPassword);
    await validateAuthenticationAttempt(prisma, email, oldPassword);
    validateNewPassword(newPassword);

    const encryptedPassword = await hashPassword(newPassword);

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

    // Further validation that the passwords match.
    // It's okay to let the user know that their input passwords do not match. No security concerns.
    // If the passwords don't match, there's no need for additional work.
    validatePasswordsMatch(password, confirmPassword);
    await validateAuthenticationAttempt(prisma, email, password);

    // delete user by email
    const deletedUser = await prisma.user.delete({ where: { email } });

    // return deleted user
    return { deletedUser };
}

export async function resetPasswordRequest(prisma: PrismaClient, input: ResetPasswordRequestForm) {
    const result = await prisma.user.findUnique({
        where: { email: input.email },
    });

    const accountFound = !!result;

    // No need to send email if the account does not exist
    if (!accountFound)
        throw new ProtectedError({
            userMessage: 'Internal error occured, try again later.',
            internalMessage: 'No account with that email was found',
        });

    const token = await jwt.sign({ email: input.email });
    const passwordResetLink = `prytaneum.io/reset-password?token=${token}`;

    try {
        await sendEmail({
            to: input.email,
            subject: 'Password Reset',
            template: 'password-reset',
            'h:X-Mailgun-Variables': JSON.stringify({ passwordResetLink }),
        });
        return accountFound;
    } catch (err) {
        const server = getOrCreateServer();
        server.log.error(err);
        throw new ProtectedError({ userMessage: errors.email, internalMessage: err.message });
    }
}

export async function resetPassword(prisma: PrismaClient, input: ResetPasswordForm) {
    const { newPassword, confirmNewPassword, token } = input;
    let email;

    // Ensure token is valid
    try {
        const result = (await jwt.verify(token)) as { email?: string };
        if (!result.email) throw new Error(errors.jwt);
        email = result.email;
    } catch (err) {
        const server = getOrCreateServer();
        server.log.error(err);
        throw new Error(errors.jwt);
    }

    // Ensure passwords match
    if (newPassword !== confirmNewPassword) throw new Error('Passwords must match');

    const encryptedPassword = newPassword ? await bcrypt.hash(newPassword, 10) : null;

    // update user password
    await prisma.user.update({
        where: { email },
        data: { password: encryptedPassword },
    });
}

export async function updateOrganizer(viewerId: string, prisma: PrismaClient, input: UpdateOrganizerForm) {
    // Only admins should be able to query for all users.
    const queryResult = await prisma.user.findUnique({ where: { id: viewerId } });
    if (!queryResult) return null;
    if (!queryResult.isAdmin) throw new ProtectedError({ userMessage: 'Only admins can fetch all events.' });

    const { id, canMakeOrgs } = input;
    const { id: userId } = fromGlobalId(id);
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { canMakeOrgs },
    });
    return updatedUser;
}
