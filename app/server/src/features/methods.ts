import { PrismaClient } from '@app/prisma';
import { fromGlobalId } from 'graphql-relay';

import { Node } from '@local/graphql-types';
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
export async function getNode(globalId: string, prisma: PrismaClient) {
    async function findNode() {
        const { type, id } = fromGlobalId(globalId);

        switch (type as TNodes) {
            case 'User':
                return findUserById(id, prisma);
            case 'Event':
                return findEventById(id, prisma);
            case 'Organization':
                return findOrgById(id, prisma);
            default:
                return null;
        }
    }
    const result = await findNode();
    if (!result) return null;
    return { ...result, id: globalId };
}

export async function resolveType<T extends Node>(obj: T) {
    const { type } = fromGlobalId(obj.id);
    return type as TNodes;
}
