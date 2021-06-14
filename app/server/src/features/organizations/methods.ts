import { PrismaClient } from '@app/prisma';
import { CreateOrganization, UpdateOrganization } from '@local/graphql-types';
import { errors } from '../utils';

/**
 * find an organization by user id
 */
export async function findOrgsByUserId(userId: string, prisma: PrismaClient) {
    const queryResults = await prisma.orgMember.findMany({ where: { userId }, include: { organization: true } });
    return queryResults.map(({ organization }) => organization);
}

/**
 * Orgs are not private, if in the future they are,
 * we would need to pass in the user to this function
 * instead we can just return whatever orgs we find via prisma
 */
export async function findOrgById(orgId: string, prisma: PrismaClient) {
    const queryResult = await prisma.organization.findUnique({ where: { id: orgId } });
    return queryResult;
}

/**
 * How a user creates an org. As of right now, they are required to have the
 * `canMakeOrgs` permission set to true
 */
export async function createOrg(userId: string, prisma: PrismaClient, { name }: CreateOrganization) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new Error(errors.DNE('Login')); // user doesn't exist for some reason...

    // create the org, while adding the current user as a member
    // reference: https://www.prisma.io/docs/guides/performance-and-optimization/prisma-client-transactions-guide/#dependent-writes
    const createdOrg = await prisma.organization.create({
        data: {
            name,
            members: { create: [{ userId }] },
        },
    });

    return createdOrg;
}

/**
 * In this case, we only check if the user is a member of the organization
 * in the future we might have more specific permissions to check
 */
export async function updateOrg(userId: string, prisma: PrismaClient, { name, orgId }: UpdateOrganization) {
    // check if the user is a member of this organization, for now this is sufficient for being able to update the org
    const result = await prisma.orgMember.findFirst({ where: { userId, orgId }, select: { userId: true } });

    // result is null if the user is not part of the organization
    if (!result) throw new Error(errors.permissions);

    // update the org and return the result
    const updatedOrg = await prisma.organization.update({
        where: { id: orgId },
        data: {
            name,
        },
    });
    return updatedOrg;
}

export async function deleteOrg() {
    // UNIMPLEMENTED on purpose
    // probably don't want deletes to happen since permissions are not robust (yet) and
    // cascades are scary with that in mind
    // ie we'll want a backup or recovery process along with more robust permissions before we can delete willy nilly
    return null;
}

/**
 * Look up all members by organization id
 */
export async function findMembersByOrgId(prisma: PrismaClient, orgId: string) {
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
export async function findEventsByOrgId(prisma: PrismaClient, orgId: string) {
    return prisma.event.findMany({ where: { orgId }, orderBy: { createdAt: 'desc' } });
}

export async function isViewerMember(userId: string | null, prisma: PrismaClient, orgId: string) {
    if (!userId) return false; // non logged in viewer cannot be a member
    const result = await prisma.orgMember.findUnique({ where: { userId_orgId: { userId, orgId } } });
    return Boolean(result);
}
