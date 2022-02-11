import bcrypt from 'bcryptjs';
import { PrismaClient } from '@local/__generated__/prisma';
import { toGlobalId } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';

import * as jwt from '@local/lib/jwt';
import type {
    DeleteAccountForm,
    LoginForm,
    RegistrationForm,
    UpdateEmailForm,
    UpdatePasswordForm,
} from '@local/graphql-types';

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
    if (!user?.password) throw new ProtectedError({ userMessage: ProtectedError.loginErrorMessage });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) throw new ProtectedError({ userMessage: ProtectedError.loginErrorMessage });

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
 */
export async function findEventsByUserId(userId: string, prisma: PrismaClient) {
    const results = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            moderatorOf: {
                include: {
                    event: true,
                }
            },
            invitedOf: {
                include: {
                    event: true,
                }
            }
        }
    });

    if (!results) return null;

    // prepare data for graphql layer
    const userIsModerator = results.moderatorOf.map(({ event }) => event);
    const userIsInvited = results.invitedOf.map(({ event }) => event);
    const formattedData = userIsModerator.concat(userIsInvited);

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
            internalMessage: 'A user with the email already exists.',
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
