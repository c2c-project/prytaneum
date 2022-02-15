import { PrismaClient } from '@local/__generated__/prisma';

/**
 * permisison check to see if a user can create an event
 */
export async function isMemberOfOrg(userId: string, orgId: string, prisma: PrismaClient) {
    // check if the user is part of the organization they are trying to create an event for
    const _isMember = await prisma.orgMember.findUnique({ where: { userId_orgId: { userId, orgId } } });
    return Boolean(_isMember);
}
