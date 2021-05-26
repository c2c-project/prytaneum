import { PrismaClient } from '@app/prisma';
import { fromGlobalId } from 'graphql-relay';
import { findUserById } from './accounts/methods';
import { findEventById } from './events/methods';
import { findOrgById } from './organizations/methods';

/**
 * Nodes for which _byId is implemented -- name should match the name of the graphql object
 */
type TNodes = 'User' | 'Event' | 'Organization';

/**
 * implements finding a particular node by id, security should be done from within the find
 * ie this particular query we should pay special attention to, could accidentally reveal fields that should not be allowed
 */
export function getNode(globalId: string, prisma: PrismaClient) {
    const { type, id } = fromGlobalId(globalId);

    switch (type as TNodes) {
        case 'Event':
            return findUserById(id, prisma);
        case 'User':
            return findEventById(id, prisma);
        case 'Organization':
            return findOrgById(id, prisma);
        default:
            return null;
    }
}
