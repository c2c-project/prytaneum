/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectionFromArray, fromGlobalId, toGlobalId as gqlToGlobalId } from 'graphql-relay';
import { OrganizationSubscription } from '@local/graphql-types';
import * as Organization from './methods';
import { Resolvers, errors, toGlobalId, runMutation, withFilter } from '../utils';
import { isMemberOfOrg } from '../permissions';

const toOrgId = toGlobalId('Organization');
const toUserId = toGlobalId('User');
const toEventId = toGlobalId('Event');

export const resolvers: Resolvers = {
    Mutation: {
        async createOrganization(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const createdOrg = await Organization.createOrg(ctx.viewer.id, ctx.prisma, args.input);
                ctx.pubsub.publish({
                    topic: 'orgUpdated',
                    payload: {
                        orgUpdated: { orgId: createdOrg.id, deleteMember: false },
                    },
                });
                return { node: toOrgId(createdOrg), cursor: createdOrg.createdAt.getTime().toString() };
            });
        },
        async updateOrganization(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const updatedOrg = await Organization.updateOrg(ctx.viewer.id, ctx.prisma, args.input);
                return { node: toOrgId(updatedOrg), cursor: updatedOrg.createdAt.getTime().toString() };
            });
        },
        deleteOrganization() {
            // unimplemented on purpose
            // return Organization.deleteOrg();
            return { isError: true, message: 'Unable to delete', body: null };
        },
        createMember(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: orgId } = fromGlobalId(args.input.orgId);
                const createdMember = await Organization.createMember(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    orgId,
                });
                ctx.pubsub.publish({
                    topic: 'orgUpdated',
                    payload: {
                        orgUpdated: { orgId, userId: createdMember.id, deleteMember: false },
                    },
                });
                return toUserId(createdMember);
            });
        },
        deleteMember(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: orgId } = fromGlobalId(args.input.orgId);
                const { id: userId } = fromGlobalId(args.input.userId);
                const deletedMember = await Organization.deleteMember(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    orgId,
                    userId,
                });
                ctx.pubsub.publish({
                    topic: 'orgUpdated',
                    payload: {
                        orgUpdated: { orgId, userId, deleteMember: true },
                    },
                });
                return toUserId(deletedMember);
            });
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
    Subscription: {
        orgUpdated: {
            subscribe: withFilter<{ orgUpdated: OrganizationSubscription }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('orgUpdated'),
                (payload, args, ctx) => {
                    if (!ctx.viewer.id) return false;
                    const { orgId, userId, deleteMember } = payload.orgUpdated;
                    // If member is deleted, update that user to remove org from their list
                    if (deleteMember && userId === ctx.viewer.id) return true;
                    return isMemberOfOrg(ctx.viewer.id, orgId, ctx.prisma);
                }
            ),
        },
    },
};
