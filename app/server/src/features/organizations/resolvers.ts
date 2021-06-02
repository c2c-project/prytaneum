/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectionFromArray, fromGlobalId } from 'graphql-relay';
import * as Organization from './methods';
import { Resolvers, errors, toGlobalId, runMutation } from '../utils';

const toOrgId = toGlobalId('Organization');
const toUserId = toGlobalId('User');
const toEventId = toGlobalId('Event');

export const resolvers: Resolvers = {
    Query: {
        async myOrgs(parent, args, ctx, info) {
            if (!ctx.viewer.id) return null;
            const userOrgs = await Organization.findOrgsByUserId(ctx.viewer.id, ctx.prisma);
            return userOrgs.map(toOrgId);
        },
    },
    Mutation: {
        async createOrganization(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const createdOrg = await Organization.createOrg(ctx.viewer.id, ctx.prisma, args.input);
                return toOrgId(createdOrg);
            });
        },
        async updateOrganizationById(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const updatedOrg = await Organization.updateOrg(ctx.viewer.id, ctx.prisma, args.input);
                return toOrgId(updatedOrg);
            });
        },
        deleteOrganizationById() {
            // unimplemented on purpose
            // return Organization.deleteOrg();
            return { isError: true, message: 'Unable to delete', body: null };
        },
    },
    Organization: {
        async members(parent, args, ctx, info) {
            const { id: orgId } = fromGlobalId(parent.id);
            const orgMembers = await Organization.findMembersByOrgId(ctx.prisma, orgId);
            return connectionFromArray(orgMembers.map(toUserId), args);
        },
        async events(parent, args, ctx, info) {
            const { id: orgId } = fromGlobalId(parent.id);
            const orgEvents = await Organization.findEventsByOrgId(ctx.prisma, orgId);
            return connectionFromArray(orgEvents.map(toEventId), args);
        },
        async isViewerMember(parent, args, ctx, info) {
            const { id: orgId } = fromGlobalId(parent.id);
            return Organization.isViewerMember(ctx.viewer.id, ctx.prisma, orgId);
        },
    },
};
