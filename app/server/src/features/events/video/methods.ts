import { PrismaClient } from '@app/prisma';
import { CreateVideo, UpdateVideo, DeleteVideo } from '@local/graphql-types';
import { Maybe, errors } from '@local/features/utils';
import { canUserModify } from '../methods';

/**
 * add a video to the given event
 */
export async function addVideo(userId: Maybe<string>, prisma: PrismaClient, input: Maybe<CreateVideo> | undefined) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    const { eventId, lang, url } = input;

    const hasPermissions = await canUserModify(userId, eventId, prisma);
    if (!hasPermissions) throw new Error(errors.permissions);

    return prisma.eventVideo.create({
        data: {
            lang,
            url,
            eventId,
        },
    });
}

/**
 * remove a video from an event
 */
export async function removeVideo(userId: Maybe<string>, prisma: PrismaClient, input: Maybe<DeleteVideo> | undefined) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    const { eventId, id } = input;

    const hasPermissions = await canUserModify(userId, eventId, prisma);
    if (!hasPermissions) throw new Error(errors.permissions);

    return prisma.eventVideo.delete({ where: { id } });
}

/**
 * update a video
 */
export async function updateVideo(userId: Maybe<string>, prisma: PrismaClient, input: Maybe<UpdateVideo> | undefined) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    const { eventId, videoId } = input;

    const hasPermissions = await canUserModify(userId, eventId, prisma);
    if (!hasPermissions) throw new Error(errors.permissions);

    const data: Record<string, string> = {};
    if (input.newUrl) data.url = input.newUrl;
    if (input.lang) data.lang = input.lang;

    return prisma.eventVideo.update({
        where: { id: videoId },
        data,
    });
}
