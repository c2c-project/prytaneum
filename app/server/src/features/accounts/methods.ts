import { User } from '@app/prisma';
import { PrismaClient } from '@app/prisma';
import { Maybe, errors } from '@local/features/utils';
import { RegistrationForm } from '@local/graphql-types';
import bcrypt from 'bcrypt';

type MinimalUser = Pick<RegistrationForm, 'email' | 'firstName' | 'lastName'>;
/**
 * registers a user optionally with a password
 */
async function register(prisma: PrismaClient, userData: MinimalUser, textPassword: string | null = null) {
    const { email, firstName, lastName } = userData;
    const encryptedPassword = await bcrypt.hash(textPassword, 10);
    return prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`,
            password: encryptedPassword,
            preferredLang: 'EN',
        },
    });
}

/**
 * looks up the user given the user id
 */
export function userById(userId: Maybe<string>, prisma: PrismaClient) {
    if (!userId) return null;
    return prisma.user.findUnique({ where: { userId } });
}

/**
 * get organizations of this particular user
 * NOTE: the performance of this for one field probably leaves much to be wanted, two joins for one field
 */
export async function userOrgs(userId: Maybe<string>, prisma: PrismaClient) {
    if (!userId) return null;

    // query
    const results = await prisma.user.findUnique({
        where: { userId },
        include: {
            memberOf: {
                include: {
                    organization: true,
                },
            },
        },
    });

    // prepare data for graphql layer
    const formattedData = results?.memberOf.map(({ organization }) => organization);

    return formattedData;
}

/**
 * function called when a user is registering themselves
 */
export async function registerSelf(prisma: PrismaClient, input: Maybe<RegistrationForm> | undefined) {
    if (!input) throw new Error(errors.invalidArgs);
    if (input.password !== input.confirmPassword) throw new Error('Passwords must match');

    return register(prisma, input, input.password);
}
