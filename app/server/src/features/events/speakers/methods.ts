import { PrismaClient } from '@app/prisma';
import { Maybe, errors } from '@local/features/utils';
import { DeleteSpeaker, SpeakerForm, UpdateSpeaker } from '@local/graphql-types';
import { register } from '@local/features/accounts/methods';
import { canUserModify } from '@local/features/events/methods';

export function speakerById(prisma: PrismaClient) {}

export function findSpeakerAcc(userId: string, prisma: PrismaClient) {
    return prisma.user.findUnique({ where: { userId } });
}

export async function createSpeaker(userId: Maybe<string>, prisma: PrismaClient, input: Maybe<SpeakerForm>) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    // unpack
    const { email, eventId, name, description, title, picture } = input;

    // permission check
    const hasPermissions = await canUserModify(userId, eventId, prisma);
    if (!hasPermissions) throw new Error(errors.permissions);

    // find user by email
    const speakerAccount = await prisma.user.findUnique({ where: { email }, select: { userId: true } });
    let speakerId = speakerAccount?.userId;

    // register the speaker with an account if they're not already in the database
    if (!speakerId) {
        const regResults = await register(prisma, { email });
        speakerId = regResults.userId;
    }

    return prisma.eventSpeaker.create({
        data: {
            userId: speakerId,
            eventId,
            name,
            description,
            title,
            pictureUrl: picture,
        },
    });
}

export async function updateSpeaker(userId: Maybe<string>, prisma: PrismaClient, input: Maybe<UpdateSpeaker>) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    // unpack
    const { userId: speakerId, eventId, title, description, picture, name } = input;

    // permission check
    const hasPermissions = await canUserModify(userId, eventId, prisma);
    if (!hasPermissions) throw new Error(errors.permissions);

    return prisma.eventSpeaker.update({
        where: {
            eventId_userId: {
                userId: speakerId,
                eventId,
            },
        },
        data: {
            title: title || undefined,
            description: description || undefined,
            pictureUrl: picture || undefined,
            name: name || undefined,
            userId: speakerId,
        },
    });
}

export async function deleteSpeaker(userId: Maybe<string>, prisma: PrismaClient, input: Maybe<DeleteSpeaker>) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    const { eventId, userId: speakerId } = input;

    // permission check
    const hasPermissions = await canUserModify(userId, eventId, prisma);
    if (!hasPermissions) throw new Error(errors.permissions);

    return prisma.eventSpeaker.delete({
        where: {
            eventId_userId: {
                eventId,
                userId: speakerId,
            },
        },
    });
}
