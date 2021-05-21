/* eslint-disable @typescript-eslint/indent */
import { Event, PrismaClient } from '@app/prisma';
import { CreateEvent, DeleteEvent, Maybe, UpdateEvent } from '@local/graphql-types';
import { errors, filterOutUndefined } from '@local/features/utils';

/**
 * get a specific event by its id
 */
export async function eventById(prisma: PrismaClient, id: string) {
    return prisma.event.findUnique({ where: { id } });
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
export async function createEvent(userId: Maybe<string>, prisma: PrismaClient, input: Maybe<CreateEvent> | undefined) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

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
export async function updateEvent(userId: Maybe<string>, prisma: PrismaClient, input: Maybe<UpdateEvent> | undefined) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    // check if user has valid permissions
    if (!canUserModify(userId, input.id, prisma)) throw new Error(errors.permissions);

    // get only the keys the user is trying to update
    // if for some reason the client passes a falsy value, we must filter it out
    // passing a falsy value is a valid operation in terms of graphql, but is not
    // for our application
    const updatedValues = filterOutUndefined(input);

    return prisma.event.update({ where: { id: input.id }, data: { ...updatedValues } });
}

/**
 * delete an event
 */
export async function deleteEvent(userId: Maybe<string>, prisma: PrismaClient, input: Maybe<DeleteEvent> | undefined) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    // check if the user has valid permissions
    if (!canUserModify(userId, input.id, prisma)) throw new Error(errors.permissions);

    return prisma.event.delete({ where: { id: input.id } });
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
export async function findSpeakersByEventId(id: string, prisma: PrismaClient) {
    return prisma.eventSpeaker.findMany({ where: { eventId: id } });
}

/**
 * find the videos for the given event
 */
export async function findVideosByEventId(id: string, prisma: PrismaClient) {
    return prisma.eventVideo.findMany({ where: { eventId: id } });
}

/**
 * find moderators for a the given event
 */
export async function findModeratorsByEventId(id: string, prisma: PrismaClient) {
    return prisma.eventModerator.findMany({ where: { eventId: id } });
}

/**
 * find an organization based on the event (probably inefficient)
 */
export async function findOrgByid(id: string, prisma: PrismaClient) {
    const result = await prisma.event.findUnique({ where: { id }, select: { organization: true } });

    if (!result) return null;

    return result.organization;
}

/**
 * find questions by id
 */
export async function findQuestionsByid(id: string, prisma: PrismaClient) {
    return prisma.eventQuestion.findMany({ where: { eventId: id } });
}

/**
 * start or end an event
 */
export async function changeEventStatus(
    userId: Maybe<string>,
    prisma: PrismaClient,
    id: Maybe<string>,
    status: boolean
) {
    if (!userId) throw new Error(errors.noLogin);
    if (!id) throw new Error(errors.invalidArgs);

    const hasPermission = await canUserModify(userId, id, prisma);
    if (!hasPermission) throw new Error(errors.permissions);

    return prisma.event.update({ where: { id }, data: { isActive: status } });
}
