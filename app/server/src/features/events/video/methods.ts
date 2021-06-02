import { PrismaClient } from '@app/prisma';
import { CreateVideo, UpdateVideo, DeleteVideo } from '@local/graphql-types';
import { errors } from '@local/features/utils';
import { canUserModify } from '../methods';

/**
 * add a video to the given event
 */
export async function createVideo(userId: string, prisma: PrismaClient, input: CreateVideo) {
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
export async function deleteVideo(userId: string, prisma: PrismaClient, input: DeleteVideo) {
    const { eventId, id } = input;

    const hasPermissions = await canUserModify(userId, eventId, prisma);
    if (!hasPermissions) throw new Error(errors.permissions);

    return prisma.eventVideo.delete({ where: { id } });
}

/**
 * update a video
 */
export async function updateVideo(userId: string, prisma: PrismaClient, input: UpdateVideo) {
    const { eventId, videoId } = input;

    const hasPermissions = await canUserModify(userId, eventId, prisma);
    if (!hasPermissions) throw new Error(errors.permissions);

    const data: Record<string, string> = {};
    if (input.url) data.url = input.url;
    if (input.lang) data.lang = input.lang;

    return prisma.eventVideo.update({
        where: { id: videoId },
        data,
    });
}
