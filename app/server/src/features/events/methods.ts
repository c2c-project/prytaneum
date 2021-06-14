/* eslint-disable @typescript-eslint/indent */
import { Event, PrismaClient } from '@app/prisma';
import { CreateEvent, DeleteEvent, UpdateEvent } from '@local/graphql-types';
import { errors, filterFields } from '@local/features/utils';

export { isModerator } from './moderation/methods';

/**
 * get a specific event by its id
 */
export async function findEventById(eventId: string, prisma: PrismaClient) {
    return prisma.event.findUnique({ where: { id: eventId } });
}

/**
 * permisison check to see if a user can create an event
 */
export async function isMember(userId: string, orgId: string, prisma: PrismaClient) {
    // check if the user is part of the organization they are trying to create an event for
    const _isMember = await prisma.orgMember.findUnique({ where: { userId_orgId: { userId, orgId } } });
    return _isMember;
}

/**
 * Omit rather than pick -- if anything changes on the event type, it's adding more settings
 * so we'd rather just have typescript throw a fit than miss a setting in the default type
 * when the shape of the event type changes
 */
type Settings = Omit<
    Event,
    | 'title'
    | 'description'
    | 'topic'
    | 'startDateTime'
    | 'endDateTime'
    | 'orgId'
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'currentQuestion'
>;
/**
 * create an event
 */
export async function createEvent(userId: string, prisma: PrismaClient, input: CreateEvent) {
    const { title, description, topic, startDateTime, endDateTime, orgId } = input;

    if (!isMember(userId, orgId, prisma)) throw new Error(errors.permissions);

    // default values for different settings
    const defaultSettings: Settings = {
        isActive: false,
        isQuestionFeedVisible: true,
        isCollectRatingsEnabled: true,
        isForumEnabled: true,
        isPrivate: true,
        createdById: userId,
    };

    const result = await prisma.event.create({
        data: {
            title,
            description: description || '',
            topic,
            startDateTime,
            endDateTime,
            orgId,
            ...defaultSettings,
        },
    });
    return result;
}

/**
 * general permission check if the user can update
 */
export async function canUserModify(userId: string, id: string, prisma: PrismaClient) {
    const queryResult = await prisma.event.findUnique({
        select: {
            organization: {
                select: {
                    members: {
                        where: {
                            userId,
                        },
                    },
                },
            },
        },
        where: { id },
    });
    const _isMember = queryResult ? queryResult.organization.members.length > 0 : false;
    return _isMember;
}

/**
 * update an event
 */
export async function updateEvent(userId: string, prisma: PrismaClient, input: UpdateEvent) {
    // check if user has valid permissions
    if (!canUserModify(userId, input.eventId, prisma)) throw new Error(errors.permissions);

    const fields = filterFields({
        input,
        allowedFields: {
            topic: true,
            title: true,
            description: true,
            endDateTime: true,
            startDateTime: true,
            isCollectRatingsEnabled: true,
            isForumEnabled: true,
            isPrivate: true,
            isQuestionFeedVisible: true,
        },
    });

    return prisma.event.update({ where: { id: input.eventId }, data: { ...fields } });
}

/**
 * delete an event
 */
export async function deleteEvent(userId: string, prisma: PrismaClient, input: DeleteEvent) {
    if (!userId) throw new Error(errors.noLogin);

    // check if the user has valid permissions
    if (!canUserModify(userId, input.eventId, prisma)) throw new Error(errors.permissions);

    return prisma.event.delete({ where: { id: input.eventId } });
}

/**
 * fetch an event list
 */
export async function findPublicEvents(prisma: PrismaClient) {
    return prisma.event.findMany();
}

/**
 * find the speakers for the given event
 */
export async function findSpeakersByEventId(eventId: string, prisma: PrismaClient) {
    return prisma.eventSpeaker.findMany({ where: { eventId } });
}

/**
 * find the videos for the given event
 */
export async function findVideosByEventId(eventId: string, prisma: PrismaClient) {
    return prisma.eventVideo.findMany({ where: { eventId } });
}

/**
 * find moderators for a the given event
 */
export async function findModeratorsByEventId(eventId: string, prisma: PrismaClient) {
    const results = await prisma.eventModerator.findMany({ where: { eventId }, include: { user: true } });
    return results.map(({ user }) => user);
}

/**
 * find an organization based on the event (probably inefficient)
 */
export async function findOrgByEventId(eventId: string, prisma: PrismaClient) {
    const result = await prisma.event.findUnique({ where: { id: eventId }, select: { organization: true } });

    if (!result) return null;

    return result.organization;
}

/**
 * find questions by event id
 */
export async function findQuestionsByEventId(eventId: string, prisma: PrismaClient) {
    return prisma.eventQuestion.findMany({ where: { eventId }, orderBy: { createdAt: 'desc' } });
}

/**
 * start or end an event
 */
export async function changeEventStatus(userId: string, prisma: PrismaClient, eventId: string, status: boolean) {
    const hasPermission = await canUserModify(userId, eventId, prisma);
    if (!hasPermission) throw new Error(errors.permissions);

    return prisma.event.update({ where: { id: eventId }, data: { isActive: status } });
}

/**
 * find queued questions by event id
 * if position is greater than -1, then the question is queued
 */
export async function findQueuedQuestionsByEventId(eventId: string, prisma: PrismaClient) {
    return prisma.event.findUnique({
        where: { id: eventId },
        select: { questions: { where: { position: { gt: -1 } }, orderBy: { position: 'asc' } } },
    });
}
