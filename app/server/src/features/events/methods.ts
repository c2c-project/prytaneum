import { Event, PrismaClient } from '@app/prisma';
import { CreateEvent, DeleteEvent, Maybe, UpdateEvent } from '@local/graphql-types';
import { errors, filterOutFalsy } from '@local/features/utils';

/**
 * get a specific event by its id
 */
export async function eventById(prisma: PrismaClient, eventId: string) {
    return prisma.event.findUnique({ where: { eventId } });
}

/**
 * permisison check to see if a user can create an event
 */
async function canUserCreate(userId: string, orgId: string, prisma: PrismaClient) {
    // check if the user is part of the organization they are trying to create an event for
    const isMember = await prisma.orgMember.findUnique({ where: { userId_orgId: { userId, orgId } } });
    return isMember;
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
    | 'eventId'
    | 'createdAt'
    | 'updatedAt'
>;
/**
 * create an event
 */
export async function createEvent(userId: Maybe<string>, prisma: PrismaClient, input: Maybe<CreateEvent> | undefined) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    const { title, description, topic, startDateTime, endDateTime, orgId } = input;

    if (!canUserCreate(userId, orgId, prisma)) throw new Error(errors.permissions);

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
async function canUserModify(userId: string, eventId: string, prisma: PrismaClient) {
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
        where: { eventId: eventId },
    });
    const isMember = queryResult ? queryResult.organization.members.length > 0 : false;
    return isMember;
}

/**
 * update an event
 */
export async function updateEvent(userId: Maybe<string>, prisma: PrismaClient, input: Maybe<UpdateEvent> | undefined) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    // check if user has valid permissions
    if (!canUserModify(userId, input.eventId, prisma)) throw new Error(errors.permissions);

    // get only the keys the user is trying to update
    // if for some reason the client passes a falsy value, we must filter it out
    // passing a falsy value is a valid operation in terms of graphql, but is not
    // for our application
    const updatedValues = filterOutFalsy(input);

    return prisma.event.update({ where: { eventId: input.eventId }, data: { ...updatedValues } });
}

/**
 * delete an event
 */
export async function deleteEvent(userId: Maybe<string>, prisma: PrismaClient, input: Maybe<DeleteEvent> | undefined) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    // check if the user has valid permissions
    if (!canUserModify(userId, input.eventId, prisma)) throw new Error(errors.permissions);

    return prisma.event.delete({ where: { eventId: input.eventId } });
}
