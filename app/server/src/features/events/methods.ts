/* eslint-disable @typescript-eslint/indent */
import { Event, PrismaClient } from '@local/__generated__/prisma';
import { errors, filterFields, toGlobalId } from '@local/features/utils';
import { isMemberOfOrg } from '@local/features/permissions';
import { ProtectedError } from '@local/lib/ProtectedError';
import type { CreateEvent, DeleteEvent, UpdateEvent } from '@local/graphql-types';

export { isModerator } from './moderation/methods';
const toEventId = toGlobalId('Event');

/**
 * find broadcastMessages by event id
 */
export async function findBroadcastMessagesByEventId(eventId: string, prisma: PrismaClient) {
    return prisma.eventBroadcastMessage.findMany({
        where: { eventId, isVisible: true },
        orderBy: { createdAt: 'asc' },
    });
}

/**
 * Filter function for event questions
 */
export async function doesEventMatch(eventId: string, broadcastMessageId: string, prisma: PrismaClient) {
    // see if the event id matches the liked question
    const found = await prisma.eventBroadcastMessage.findFirst({
        where: { eventId, id: broadcastMessageId },
        select: { id: true },
    });

    return Boolean(found);
}

/**
 * get a specific event by its id
 */
export async function findEventById(eventId: string, prisma: PrismaClient) {
    return prisma.event.findUnique({ where: { id: eventId } });
}

/**
 * check if the event is private
 */
export async function isEventPrivate(eventId: string, prisma: PrismaClient, status: boolean) {
    return prisma.event.findUnique({ where: { id: eventId }, select: { isPrivate: status } });
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

    if (!isMemberOfOrg(userId, orgId, prisma)) throw new ProtectedError({ userMessage: errors.permissions });

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

            // add the current user (the creator) as a moderator
            moderators: {
                create: [
                    {
                        userId,
                    },
                ],
            },
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
            moderators: {
                select: {
                    userId: true,
                },
            },
        },
        where: { id },
    });
    const _isModerator = queryResult ? queryResult.moderators.find((mod) => mod.userId === userId) : false;
    const _isMember = queryResult ? queryResult.organization.members.length > 0 : false;
    return _isMember || _isModerator;
}

/**
 * update an event
 */
export async function updateEvent(userId: string, prisma: PrismaClient, input: UpdateEvent) {
    // check if user has valid permissions
    if (!canUserModify(userId, input.eventId, prisma)) throw new ProtectedError({ userMessage: errors.permissions });

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
    if (!userId) throw new ProtectedError({ userMessage: errors.noLogin });

    // check if the user has valid permissions
    if (!canUserModify(userId, input.eventId, prisma)) throw new ProtectedError({ userMessage: errors.permissions });
    const { eventId, title, confirmTitle } = input;

    const eventToDelete = await prisma.event.findUnique({ where: { id: eventId } });
    const eventWithGlobalId = toEventId(eventToDelete);

    //validation if event titles match
    if (title !== confirmTitle) throw new ProtectedError({ userMessage: 'Event titles must match.' });

    //validation is if event title matches actual event title
    if (title !== eventWithGlobalId?.title)
        throw new ProtectedError({ userMessage: 'Deleting event failed, invalid event title.' });

    //delete user by event id
    return prisma.event.delete({ where: { id: eventId } });
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
 * find invited users for the given event
 * @param eventId
 * @param prisma
 * @returns list of users
 */
export async function findInvitedByEventId(eventId: string, prisma: PrismaClient) {
    const results = await prisma.eventInvited.findMany({ where: { eventId }, include: { user: true } });
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
    return prisma.eventQuestion.findMany({ where: { eventId, isVisible: true }, orderBy: { createdAt: 'desc' } });
}

/**
 * find questions by event id and user id
 */
export async function findQuestionsByEventIdAndUser(eventId: string, userId: string, prisma: PrismaClient) {
    return prisma.eventQuestion.findMany({
        where: {
            eventId,
            createdById: userId,
            isVisible: true,
        },
        orderBy: { createdAt: 'desc' },
    });
}

/**
 * start or end an event
 */
export async function changeEventStatus(userId: string, prisma: PrismaClient, eventId: string, status: boolean) {
    const hasPermission = await canUserModify(userId, eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });

    return prisma.event.update({ where: { id: eventId }, data: { isActive: status } });
}

/**
 * find queued questions by event id
 * if position is greater than -1, then the question is queued
 */
export async function findQueuedQuestionsByEventId(eventId: string, prisma: PrismaClient) {
    return prisma.event.findUnique({
        where: { id: eventId },
        select: { questions: { where: { position: { equals: '-1' } }, orderBy: { position: 'asc' } } },
    });
}

/**
 * Find live feedback by event id
 */
export async function findLiveFeedbackByEventId(eventId: string, prisma: PrismaClient) {
    return prisma.event.findUnique({
        where: { id: eventId },
        select: { feedback: { orderBy: { createdAt: 'desc' } } },
    });
}

/**
 * Find live feedback prompts by event id
 */
export async function findLiveFeedbackPromptsByEventId(eventId: string, prisma: PrismaClient) {
    return prisma.event.findUnique({
        where: { id: eventId },
        select: { feedbackPrompt: { orderBy: { createdAt: 'asc' } } },
    });
}

/**
 * find queued questions by event id
 * if position is greater than -1, then the question is queued
 */
export async function findQuestionQueueByEventId(eventId: string, prisma: PrismaClient) {
    return prisma.event.findUnique({
        where: { id: eventId },
        select: {
            questions: { where: { position: { not: '-1' } }, orderBy: { position: 'asc' } },
            currentQuestion: true,
        },
    });
}

type EventsSearchFilter = {
    eventName: string;
    orgName: string;
};

export async function findAllEvents(viewerId: string, filter: EventsSearchFilter, prisma: PrismaClient) {
    // Only admins should be able to query for all users.
    const queryResult = await prisma.user.findUnique({ where: { id: viewerId } });
    if (!queryResult) return [];
    if (!queryResult.isAdmin) throw new ProtectedError({ userMessage: 'Only admins can fetch all events.' });

    return prisma.event.findMany({
        where: {
            title: { contains: filter.eventName },
        },
    });
}

export async function findParticipantsByEventId(eventId: string, prisma: PrismaClient) {
    const results = await prisma.eventParticipant.findMany({ where: { eventId }, include: { user: true } });
    return results.map(({ user }) => user);
}
