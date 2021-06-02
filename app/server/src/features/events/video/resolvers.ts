/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolvers, errors, runMutation, toGlobalId } from '@local/features/utils';
import { fromGlobalId } from 'graphql-relay';
import * as Video from './methods';

const toVideoId = toGlobalId('EventVideo');

export const resolvers: Resolvers = {
    Mutation: {
        createVideo(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const newVid = await Video.createVideo(ctx.viewer.id, ctx.prisma, { ...args.input, eventId });
                return toVideoId(newVid);
            });
        },
        deleteVideo(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: videoId } = fromGlobalId(args.input.id);
                const removedVid = await Video.deleteVideo(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    eventId,
                    id: videoId,
                });
                return toVideoId(removedVid);
            });
        },
        updateVideo(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: videoId } = fromGlobalId(args.input.videoId);
                const updatedVid = await Video.updateVideo(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    eventId,
                    videoId,
                });
                return toVideoId(updatedVid);
            });
        },
    },
};
