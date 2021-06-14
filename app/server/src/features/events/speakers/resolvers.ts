/* eslint-disable @typescript-eslint/no-unused-vars */
import { fromGlobalId } from 'graphql-relay';
import { Resolvers, errors, runMutation, toGlobalId } from '@local/features/utils';
import * as Speaker from './methods';

const toSpeakerId = toGlobalId('EventSpeaker');

export const resolvers: Resolvers = {
    Mutation: {
        createSpeaker(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const createdSpeaker = await Speaker.createSpeaker(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    eventId,
                });
                return toSpeakerId(createdSpeaker);
            });
        },
        deleteSpeaker(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: speakerId } = fromGlobalId(args.input.id);
                const deletedSpeaker = await Speaker.deleteSpeaker(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    eventId,
                    id: speakerId,
                });
                return toSpeakerId(deletedSpeaker);
            });
        },
        updateSpeaker(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: speakerId } = fromGlobalId(args.input.id);
                const updatedSpeaker = await Speaker.updateSpeaker(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    eventId,
                    id: speakerId,
                });
                return toSpeakerId(updatedSpeaker);
            });
        },
    },
    EventSpeaker: {
        user(parent, args, ctx, info) {
            // TODO: this is dumb, figure out a better way to model this in the db probably?
            // I probably have a userId on the parent or something idk too tired atm
            if (!parent.email) return null;
            return Speaker.findSpeakerAccByEmail(parent.email, ctx.prisma);
        },
    },
};
