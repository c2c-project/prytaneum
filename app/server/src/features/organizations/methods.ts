import { PrismaClient } from '@app/prisma';
import { CreateOrg, UpdateOrg } from '@local/graphql-types';
import { Maybe, errors } from '../utils';

/**
 * find an organization by user id
 */
export async function orgsByUserId(userId: Maybe<string>, prisma: PrismaClient) {
    if (!userId) return null;
    const results = await prisma.orgMember.findMany({ where: { userId }, include: { organization: true } });

    // prepare for graphql layer
    const formattedData = results.map(({ organization }) => organization);

    return formattedData;
}

/**
 * Orgs are not private, if in the future they are,
 * we would need to pass in the user to this function
 * instead we can just return whatever orgs we find via prisma
 */
export async function orgsById(orgId: string, prisma: PrismaClient) {
    return prisma.organization.findUnique({ where: { orgId } });
}

/**
 * How a user creates an org. As of right now, they are required to have the
 * `canMakeOrgs` permission set to true
 */
export async function createOrg(userId: Maybe<string>, prisma: PrismaClient, input: Maybe<CreateOrg> | undefined) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    // there is an assumption here: we assume that if input is present that name is defined
    // I think graphql gauarantees this? TODO: test this, then delete this comment
    const { name } = input;

    const user = await prisma.user.findUnique({ where: { userId } });

    if (!user) throw new Error(errors.DNE('User')); // user doesn't exist for some reason...

    if (!user.canMakeOrgs) throw new Error(errors.permissions); // user does not have permissions to create an org

    // create the org, while adding the current user as a member
    // reference: https://www.prisma.io/docs/guides/performance-and-optimization/prisma-client-transactions-guide/#dependent-writes
    return prisma.organization.create({
        data: {
            name,
            members: { create: [{ userId }] },
        },
    });
}

/**
 * In this case, we only check if the user is a member of the organization
 * in the future we might have more specific permissions to check
 */
export async function updateOrg(userId: Maybe<string>, prisma: PrismaClient, input: Maybe<UpdateOrg> | undefined) {
    // check for valid inputs
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    // unpack
    const { name, id } = input;

    // check if the user is a member of this organization, for now this is sufficient for being able to update the org
    const result = await prisma.orgMember.findFirst({ where: { userId, orgId: id }, select: { userId: true } });

    // result is null if the user is not part of the organization
    if (!result) throw new Error(errors.permissions);

    // update the org and return the result
    return prisma.organization.update({
        where: { orgId: id },
        data: {
            name,
        },
    });
}

export async function deleteOrg() {
    // UNIMPLEMENTED on purposes
    // probably don't want deletes to happen since permissions are not robust (yet) and
    // cascades are scary with that in mind
    // ie we'll want a backup or recovery process along with more robust permissions before we can delete willy nilly
    return null;
}

/**
 * Look up all members by organization id, requires user login
 */
export async function membersByOrgId(userId: Maybe<string>, prisma: PrismaClient, orgId: string) {
    if (!userId) return null;

    const results = await prisma.orgMember.findMany({
        where: {
            orgId,
        },
        include: {
            user: true,
        },
    });

    // format for graphql layer
    const formattedData = results.map(({ user }) => user);

    return formattedData;
}

/**
 * Look up events by organization id
 * does NOT require user login
 */
export async function eventsByOrgId(prisma: PrismaClient, orgId: string) {
    return prisma.event.findMany({ where: { orgId }, select: { updatedAt: false } });
}
