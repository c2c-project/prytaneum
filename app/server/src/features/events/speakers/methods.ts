import { PrismaClient } from '@app/prisma';
import { errors } from '@local/features/utils';
import { DeleteSpeaker, CreateSpeaker, UpdateSpeaker } from '@local/graphql-types';
import { register } from '@local/features/accounts/methods';
import { canUserModify } from '@local/features/events/methods';

export function findSpeakerAccByEmail(email: string, prisma: PrismaClient) {
    if (!email) return null;
    return prisma.user.findUnique({ where: { email } });
}

export async function createSpeaker(userId: string, prisma: PrismaClient, input: CreateSpeaker) {
    // unpack
    const { email, name, description, title, pictureUrl, eventId } = input;

    // permission check
    const hasPermissions = await canUserModify(userId, eventId, prisma);
    if (!hasPermissions) throw new Error(errors.permissions);

    // find user by email
    const speakerAccount = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    let speakerId = speakerAccount?.id;

    // register the speaker with an account if they're not already in the database
    if (!speakerId) {
        const regResults = await register(prisma, { email });
        speakerId = regResults.id;
    }

    return prisma.eventSpeaker.create({
        data: {
            eventId,
            name,
            description,
            title,
            pictureUrl,
            email,
        },
    });
}

export async function updateSpeaker(userId: string, prisma: PrismaClient, input: UpdateSpeaker) {
    // unpack
    const { id, eventId, title, description, pictureUrl, name } = input;

    // permission check
    const hasPermissions = await canUserModify(userId, eventId, prisma);
    if (!hasPermissions) throw new Error(errors.permissions);

    return prisma.eventSpeaker.update({
        where: {
            id,
        },
        data: {
            title: title || undefined,
            description: description || undefined,
            pictureUrl: pictureUrl || undefined,
            name: name || undefined,
        },
    });
}

export async function deleteSpeaker(userId: string, prisma: PrismaClient, input: DeleteSpeaker) {
    const { id, eventId } = input;

    // permission check
    const hasPermissions = await canUserModify(userId, eventId, prisma);
    if (!hasPermissions) throw new Error(errors.permissions);

    return prisma.eventSpeaker.delete({
        where: {
            id,
        },
    });
}
