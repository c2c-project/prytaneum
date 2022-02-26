import { PrismaClient } from '@local/__generated__/prisma';
import {
    CreateOrganization,
    UpdateOrganization,
    DeleteOrganization,
    CreateMember,
    DeleteMember,
    DeleteOrganization,
} from '@local/graphql-types';
import { isMemberOfOrg } from '@local/features/permissions';
import { register } from '@local/features/accounts/methods';
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

export async function deleteOrg(userId: string, prisma: PrismaClient, { orgId }: DeleteOrganization) {
   
    //current permissions to delete organization is if they are a member of the organization then they can delete
    const hasPermissions = await isMemberOfOrg(userId, orgId, prisma);
    if (!hasPermissions) throw new Error(errors.permissions);

    const deletedOrg = await prisma.organization.delete({
        where: { id: orgId },
    });

    return deletedOrg;
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

export async function createMember(userId: string, prisma: PrismaClient, input: CreateMember) {
    // first I have to check if the user has permission to add a member
    // the policy for now is that any member can add any other member
    const hasPermissions = await isMemberOfOrg(userId, input.orgId, prisma);
    if (!hasPermissions) throw new Error(errors.permissions);

    // then we'll have to check if the user exists
    // if they don't exist create a "shadow" account
    // if they do exist proceed as normal
    let user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user) user = await register(prisma, { email: input.email });

    // check if user is already a member
    const isUserMember = await isMemberOfOrg(user.id, input.orgId, prisma);
    if (isUserMember) return user;

    // add a table entry for the OrgMembers table
    await prisma.orgMember.create({
        data: {
            orgId: input.orgId,
            userId: user.id,
        },
    });

    // return the newly added user via lookup by email
    return user;
}

export async function deleteMember(userId: string, prisma: PrismaClient, input: DeleteMember) {
    const hasPermissions = await isMemberOfOrg(userId, input.orgId, prisma);
    if (!hasPermissions) throw new Error(errors.permissions);

    await prisma.orgMember.delete({ where: { userId_orgId: { userId: input.userId, orgId: input.orgId } } });

    return prisma.user.findUnique({ where: { id: input.userId } });
}
