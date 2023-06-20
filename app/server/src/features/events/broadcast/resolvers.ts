/* eslint-disable @typescript-eslint/no-unused-vars */
import { errors, Resolvers, runMutation, toGlobalId, withFilter } from '@local/features/utils';
import { EventBroadcastMessageEdgeContainer } from '@local/graphql-types';
import { ProtectedError } from '@local/lib/ProtectedError';
import { fromGlobalId } from 'graphql-relay';
import * as Broadcast from './methods';

const toUserId = toGlobalId('User');
const toBroadcastMessageId = toGlobalId('EventBroadcastMessage');

export const resolvers: Resolvers = {
    Query: {
        async eventBroadcastMessages(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(args.eventId);
            const broadcastMessages = await Broadcast.findBroadcastMessagesByEventId(eventId, ctx.prisma);
            return broadcastMessages.map(toBroadcastMessageId);
        },
    },
    Mutation: {
        async createBroadcastMessage(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const createBroadcastMessage = await Broadcast.createBroadcastMessage(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    eventId,
                });
                const formattedBroadcastMessage = toBroadcastMessageId(createBroadcastMessage);
                const edge = {
                    node: formattedBroadcastMessage,
                    cursor: formattedBroadcastMessage.id,
                };
                ctx.pubsub.publish({
                    topic: 'broadcastMessageCreated',
                    payload: { eventId, broadcastMessageCreated: { edge } },
                });
                return edge;
            });
        },
        async editBroadcastMessage(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: broadcastMessageId } = fromGlobalId(args.input.broadcastMessageId);
                const editEventBroadcastMessage = await Broadcast.editBroadcastMessage(
                    broadcastMessageId,
                    args.input.broadcastMessage,
                    ctx.prisma
                );
                const formattedBroadcastMessage = toBroadcastMessageId(editEventBroadcastMessage);
                const edge = {
                    node: formattedBroadcastMessage,
                    cursor: formattedBroadcastMessage.id,
                };
                ctx.pubsub.publish({
                    topic: 'broadcastMessageEdited',
                    payload: { eventId: editEventBroadcastMessage.eventId, broadcastMessageEdited: { edge } },
                });
                return edge;
            });
        },
        async deleteBroadcastMessage(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: broadcastMessageId } = fromGlobalId(args.input.broadcastMessageId);
                const deleteEventBroadcastMessage = await Broadcast.updateBroadcastMessageVisibility(
                    broadcastMessageId,
                    args.input.toggleBroadcastMessageVisibility,
                    ctx.prisma
                );
                const formattedBroadcastMessage = toBroadcastMessageId(deleteEventBroadcastMessage);
                const edge = {
                    node: formattedBroadcastMessage,
                    cursor: formattedBroadcastMessage.id,
                };
                ctx.pubsub.publish({
                    topic: 'broadcastMessageDeleted',
                    payload: { eventId: deleteEventBroadcastMessage.eventId, broadcastMessageDeleted: { edge } },
                });
                return edge;
            });
        },
    },
    Subscription: {
        broadcastMessageCreated: {
            subscribe: withFilter<{ broadcastMessageCreated: EventBroadcastMessageEdgeContainer; eventId: string }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('broadcastMessageCreated'),
                (payload, args, ctx) => {
                    const { eventId: broadcastMessageEventId } = payload;
                    const { id: eventId } = fromGlobalId(args.eventId);
                    return eventId === broadcastMessageEventId;
                }
            ),
        },
        broadcastMessageDeleted: {
            subscribe: withFilter<{ broadcastMessageDeleted: EventBroadcastMessageEdgeContainer; eventId: string }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('broadcastMessageDeleted'),
                (payload, args, ctx) => {
                    const { eventId: broadcastMessageEventId } = payload;
                    const { id: eventId } = fromGlobalId(args.eventId);
                    return eventId === broadcastMessageEventId;
                }
            ),
        },
    },
    EventBroadcastMessage: {
        async createdBy(parent, args, ctx, info) {
            const { id: broadcastMessageId } = fromGlobalId(parent.id);
            const submitter = await Broadcast.findSubmitterByBroadcastMessageId(broadcastMessageId, ctx.prisma);
            return toUserId(submitter);
        },
    },
};
