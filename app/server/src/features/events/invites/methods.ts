import { PrismaClient } from '@app/prisma';
import jwt from 'jsonwebtoken';
import { errors } from '@local/features/utils';
import { CreateInvite } from '@local/graphql-types';
import { sendInviteEmail } from './invite';
import { register } from '@local/features/accounts/methods';
import { fromGlobalId } from 'graphql-relay';
import { canUserModify } from '../methods';
import { server } from '@local/index';

export async function invite(viewerId: string, prisma: PrismaClient, { email, eventId }: CreateInvite) {
    // Check if event exists
    const { id: globalEventId } = fromGlobalId(eventId);
    const queryResult = await prisma.event.findUnique({ where: { id: globalEventId } });
    if (!queryResult) throw new Error('Event not found');

    // Check if viewer has permission to invite
    if (!canUserModify(viewerId, globalEventId, prisma)) throw new Error(errors.permissions);

    // check if email already exists
    let userResult = await prisma.user.findFirst({ where: { email } });

    // create user if email is not in accounts system
    let invitedUserId = userResult?.id;
    if (!invitedUserId) {
        userResult = await register(prisma, { email });
        invitedUserId = userResult.id;
    }

    // Sign token
    const token = jwt.sign({ eventId, invitedUserId }, process.env.JWT_SECRET); // TODO expire at some point

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

export async function validateInvite(token: string, eventId: string, prisma: PrismaClient) {
    try {
        const result = jwt.verify(token, process.env.JWT_SECRET) as { eventId: string; invitedUserId: string };
        if (!result.eventId) return { valid: false };
        const { id: tokenEventId } = fromGlobalId(result.eventId);

        // Ensure token is being used for the correct event
        if (eventId !== tokenEventId) return { valid: false };
        return { valid: true };
    } catch (err) {
        server.log.error(err);
        return { valid: false };
    }
}
