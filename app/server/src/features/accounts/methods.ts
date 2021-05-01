import { User } from '@app/prisma';
import { PrismaClient } from '@app/prisma';
import { Maybe, errors } from '@local/features/utils';

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
