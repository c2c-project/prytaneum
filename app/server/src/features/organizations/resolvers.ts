import * as Organization from './methods';
import { Resolvers } from '../utils';

export const resolvers: Resolvers = {
    Query: {
        myOrgs(parent, input, ctx, info) {
            return Organization.orgsByUserId(ctx.userId, ctx.prisma);
        },
        orgById(parent, input, ctx, info) {
            return Organization.orgsById(input.id, ctx.prisma);
        },
    },
    Mutation: {
        createOrganization(parent, input, ctx, info) {
            return Organization.createOrg(ctx.userId, ctx.prisma, input.input);
        },
        updateOrganizationById(parent, input, ctx, info) {
            return Organization.updateOrg(ctx.userId, ctx.prisma, input.input);
        },
        deleteOrganizationById() {
            return Organization.deleteOrg();
        },
    },
    Organization: {
        members(parent, input, ctx, info) {
            return Organization.membersByOrgId(ctx.userId, ctx.prisma, parent.orgId);
        },
        events(parent, input, ctx, info) {
            return Organization.eventsByOrgId(ctx.prisma, parent.orgId);
        },
    },
};
