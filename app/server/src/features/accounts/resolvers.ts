/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectionFromArray, fromGlobalId } from 'graphql-relay';
import { Resolvers, toGlobalId, runMutation, errors } from '@local/features/utils';
import { CookieSerializeOptions } from 'fastify-cookie';
import * as User from './methods';
import { findAllEvents } from '../events/methods';
import * as jwt from '@local/lib/jwt';
import { ProtectedError } from '@local/lib/ProtectedError';

const toUserId = toGlobalId('User');
const toOrgId = toGlobalId('Organization');
const toEventId = toGlobalId('Event');

const cookieOptions: CookieSerializeOptions = {
    sameSite: 'lax',
};

export const resolvers: Resolvers = {
    Query: {
        async me(parent, args, ctx, info) {
            if (!ctx.viewer.id) return null; // can't lookup "me" if not logged in
            const user = await User.findUserById(ctx.viewer.id, ctx.prisma);
            return toUserId(user);
        },
        async validatePasswordResetToken(parent, args, ctx, info) {
            const { token } = args.input;

            try {
                await jwt.verify(token);
                return { valid: true, message: '' };
            } catch (err) {
                ctx.app.log.error(err);
                return { valid: false, message: errors.jwt };
            }
        },
        async isOrganizer(parent, args, ctx, info) {
            if (!ctx.viewer.id) return false;
            const email = await User.findEmailByUserId(ctx.viewer.id, ctx.prisma);
            return User.isOnOrganizerList(email?.email!);
        },
    },
    User: {
        async organizations(parent, args, ctx, info) {
            const { id: userId } = fromGlobalId(parent.id);
            const userOrgs = await User.findOrgsByUserId(userId, ctx.prisma);
            if (!userOrgs) return null;
            return connectionFromArray(userOrgs.map(toOrgId), args);
        },
        async events(parent, args, ctx, info) {
            const { id: userId } = fromGlobalId(parent.id);
            const userEvents = await User.findUsersEventsByUserId(userId, ctx.prisma);
            if (!userEvents) return null;
            return connectionFromArray(userEvents.map(toEventId), args);
        },
        async users(parent, args, ctx, info) {
            if (!ctx.viewer.id) return connectionFromArray([], args);
            const filter = {
                firstName: args.filter?.firstName ?? '',
                lastName: args.filter?.lastName ?? '',
                email: args.filter?.email ?? '',
            };
            const users = await User.findAllUsers(ctx.viewer.id, filter, ctx.prisma);
            if (!users) return connectionFromArray([], args);
            const formattedUsers = users.map(toUserId);
            const connection = connectionFromArray(formattedUsers, args);
            if (formattedUsers.length === 0)
                connection.pageInfo = { ...connection.pageInfo, startCursor: '', endCursor: '' };
            return connection;
        },
        async allEvents(parent, args, ctx, info) {
            if (!ctx.viewer.id) return connectionFromArray([], args);
            const filter = {
                eventName: args.filter?.eventName ?? '',
                orgName: args.filter?.orgName ?? '',
            };
            const events = await findAllEvents(ctx.viewer.id, filter, ctx.prisma);
            return connectionFromArray(events.map(toEventId), args);
        },
        async isOrganizer(parent, args, ctx, info) {
            if (!ctx.viewer.id) {
                return false;
            }
            return User.isOrganizer(ctx.viewer.id, ctx.prisma);
        },
    },
    Mutation: {
        async register(parent, args, ctx, info) {
            return runMutation(async () => {
                const { registeredUser, token } = await User.registerSelf(ctx.prisma, args.input);
                ctx.reply.setCookie('jwt', token, cookieOptions);
                return toUserId(registeredUser);
            });
        },
        async login(parent, args, ctx, info) {
            return runMutation(async () => {
                const { user, token } = await User.loginWithPassword(ctx.prisma, args.input);
                ctx.reply.setCookie('jwt', token, cookieOptions);
                return toUserId(user);
            });
        },
        logout(parent, args, ctx, info) {
            ctx.reply.clearCookie('jwt', cookieOptions);
            return new Date();
        },
        async updateEmail(parent, args, ctx, info) {
            return runMutation(async () => {
                const { updatedUser, token } = await User.updateEmail(ctx.prisma, args.input);
                ctx.reply.setCookie('jwt', token, cookieOptions);
                return toUserId(updatedUser);
            });
        },
        async updatePassword(parent, args, ctx, info) {
            return runMutation(async () => {
                const { updatedUser, token } = await User.updatePassword(ctx.prisma, args.input);
                ctx.reply.setCookie('jwt', token, cookieOptions);
                return toUserId(updatedUser);
            });
        },
        async resetPasswordRequest(parent, args, ctx, info) {
            return runMutation(async () => {
                const result = await User.resetPasswordRequest(ctx.prisma, args.input);
                return result;
            });
        },
        async resetPassword(parent, args, ctx, info) {
            return runMutation(async () => {
                return User.resetPassword(ctx.prisma, args.input);
            });
        },
        async deleteAccount(parent, args, ctx, info) {
            return runMutation(async () => {
                const { deletedUser } = await User.deleteAccount(ctx.prisma, args.input);
                ctx.reply.clearCookie('jwt', cookieOptions);
                return toUserId(deletedUser);
            });
        },
        async updateOrganizer(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const updatedUser = await User.updateOrganizer(ctx.viewer.id, ctx.prisma, args.input);
                return toUserId(updatedUser);
            });
        },
        async makeOrganizer(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const updatedUser = await User.makeOrganizer(ctx.prisma, args.input, ctx.viewer.id);
                return toUserId(updatedUser);
            });
        },
        async removeOrganizer(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const updatedUser = await User.removeOrganizer(ctx.prisma, args.input, ctx.viewer.id);
                return toUserId(updatedUser);
            });
        },
    },
};
