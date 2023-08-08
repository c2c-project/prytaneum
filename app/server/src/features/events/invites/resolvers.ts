import { fromGlobalId } from 'graphql-relay';
import type { CookieSerializeOptions } from '@fastify/cookie';

import * as jwt from '@local/lib/jwt';
import * as Invites from './methods';
import { Resolvers, errors, runMutation, toGlobalId, withFilter } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';
import { UserEdgeContainer } from '@local/graphql-types';

const toUserId = toGlobalId('User');

const cookieOptions: CookieSerializeOptions = {
    sameSite: 'lax',
};

export const resolvers: Resolvers = {
    Query: {
        async validateInvite(parent, args, ctx) {
            const { id: viewerId } = ctx.viewer;
            const { id: eventId } = fromGlobalId(args.input.eventId);
            const { token } = args.input;
            // If logged in without a token, check if the user is already invited.
            if (viewerId && !token) {
                const { valid, user } = await Invites.validateInviteWithoutToken(viewerId, eventId, ctx.prisma);
                return { valid, user: toUserId(user) };
            }
            if (!token) return { valid: false, user: null };
            const { valid, user } = await Invites.validateInvite(token, eventId, ctx.prisma);
            if (!user) return { valid, user: null };
            // If the user is already logged in, there is no need to set the cookie again.
            if (viewerId) return { valid, user: toUserId(user) };
            const loginToken = await jwt.sign({ id: toUserId(user).id });
            ctx.reply.setCookie('jwt', loginToken, cookieOptions);
            return { valid, user: toUserId(user) };
        },
    },
    Mutation: {
        async createInvite(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { invitedUser } = await Invites.invite(ctx.viewer.id, ctx.prisma, args.input);

                const { id: eventId } = fromGlobalId(args.input.eventId);
                const formattedUser = toUserId(invitedUser);
                const edge = {
                    node: formattedUser,
                    cursor: formattedUser.createdAt.getTime().toString(),
                };
                ctx.pubsub.publish({
                    topic: 'userInvited',
                    payload: {
                        userInvited: {
                            edge,
                        },
                        eventId,
                    },
                });
                return edge;
            });
        },
        async uninviteUser(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.eventId);
                const { id: userId } = fromGlobalId(args.userId);

                const { uninvitedUser } = await Invites.uninvite(ctx.viewer.id, eventId, userId, ctx.prisma);
                const formattedUser = toUserId(uninvitedUser);
                const edge = {
                    node: formattedUser,
                    cursor: formattedUser.createdAt.getTime().toString(),
                };
                ctx.pubsub.publish({
                    topic: 'userUninvited',
                    payload: {
                        userUninvited: {
                            edge,
                        },
                        eventId,
                    },
                });
                return edge;
            });
        },
    },
    Subscription: {
        userInvited: {
            subscribe: withFilter<{ userInvited: UserEdgeContainer; eventId: string }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('userInvited'),
                async (payload, args, ctx) => {
                    const { eventId } = payload;
                    const userId = ctx.viewer.id;
                    if (!userId) return false;
                    const { id: argEventId } = fromGlobalId(args.eventId);
                    console.log('eventId', eventId);
                    console.log('argEventId', argEventId);

                    return eventId === argEventId;
                }
            ),
        },
        userUninvited: {
            subscribe: withFilter<{ userUninvited: UserEdgeContainer; eventId: string }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('userUninvited'),
                async (payload, args, ctx) => {
                    const { eventId } = payload;
                    const userId = ctx.viewer.id;
                    if (!userId) return false;
                    const { id: argEventId } = fromGlobalId(args.eventId);
                    console.log('eventId', eventId);
                    console.log('argEventId', argEventId);

                    return eventId === argEventId;
                }
            ),
        },
    },
};
