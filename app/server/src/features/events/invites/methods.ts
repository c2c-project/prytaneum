import { fromGlobalId } from 'graphql-relay';

import { getOrCreateServer } from '@local/core/server';
import { PrismaClient } from '@local/__generated__/prisma';
import { register } from '@local/features/accounts/methods';
import { canUserModify } from '@local/features/events/methods';
import { sendInviteEmail } from './invite';
import { errors } from '@local/features/utils';
import { verify, sign } from '@local/lib/jwt';
import { ProtectedError } from '@local/lib/ProtectedError';
import type { CreateInvite, User } from '@local/graphql-types';

const server = getOrCreateServer();

export async function invite(viewerId: string, prisma: PrismaClient, { email, eventId }: CreateInvite) {
    // Check if event exists
    const { id: globalEventId } = fromGlobalId(eventId);
    const queryResult = await prisma.event.findUnique({ where: { id: globalEventId } });
    if (!queryResult)
        throw new ProtectedError({
            userMessage: 'Event not found.',
            internalMessage: `Count not find event with id ${eventId}.`,
        });

    // Check if viewer has permission to invite
    if (!canUserModify(viewerId, globalEventId, prisma)) throw new ProtectedError({ userMessage: errors.permissions });

    // check if email already exists
    let userResult = await prisma.user.findFirst({ where: { email } });

    // create user if email is not in accounts system
    let invitedUserId = userResult?.id;
    if (!invitedUserId) {
        userResult = await register(prisma, { email });
        invitedUserId = userResult.id;
    }
    // Add to invitedOf for event
    await prisma.eventInvited.create({
        data: {
            user: { connect: { id: invitedUserId } },
            event: { connect: { id: globalEventId } },
        },
    });

    // Sign token
    const token = await sign({ eventId, invitedUserId }); // TODO: expire at some point

    // Send Email
    return sendInviteEmail(
        queryResult.title,
        eventId,
        queryResult.startDateTime,
        queryResult.endDateTime,
        email,
        token
    );
}

export async function validateInviteWithoutToken(viewerId: string, eventId: string, prisma: PrismaClient) {
    try {
        const result = await prisma.eventInvited.findFirst({
            where: { userId: viewerId, eventId: eventId },
        });
        if (!result) throw new Error('User not invited to event.');
        const user = await prisma.user.findUnique({ where: { id: viewerId } });
        if (!user) throw new Error('User not found.');
        return { valid: true, user };

    } catch (err) {
        server.log.error(err);
        return { valid: false, user: null };
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function validateInvite(
    token: string,
    eventId: string,
    prisma: PrismaClient
): Promise<{ valid: boolean; user: null | User }> {
    try {
        const result = (await verify(token)) as { email: string; eventId: string };
        if (!result.eventId) return { valid: false, user: null };
        const { id: globalEventId } = fromGlobalId(result.eventId);

        // Ensure token is being used for the correct event
        if (eventId !== globalEventId) return { valid: false, user: null };
        // Get user if valid
        const user = await prisma.user.findUnique({ where: { email: result.email } });
        if (!user) throw new Error('User not found.');
        // Ensure user is invited to event
        const invitedResult = await prisma.eventInvited.findFirst({
            where: { userId: user.id, eventId: globalEventId },
        });
        if (!invitedResult) throw new Error('User not invited to event.');
        return { valid: true, user };
    } catch (err) {
        server.log.error(err);
        return { valid: false, user: null };
    }
}
