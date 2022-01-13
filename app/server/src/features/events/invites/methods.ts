import { PrismaClient } from '@app/prisma';
import jwt from 'jsonwebtoken';
import { errors } from '@local/features/utils';
import { CreateInvite } from '@local/graphql-types';
import { sendEmail } from '@local/lib/email/email';
import { register } from '@local/features/accounts/methods';
import { fromGlobalId } from 'graphql-relay';
import { canUserModify } from '../methods';
import { server } from '@local/index';

interface inviteMessage {
    eventName: string;
    eventId: string;
    startTime: Date;
    endTime: Date;
    token: string;
}

const getInviteMessage = (vars: inviteMessage) => `
    You have been invited to participate in this Prytaneum event: ${vars.eventName} 
    starting at ${vars.startTime}
    Join using the link https://prytaneum.io/events/${vars.eventId}/live?token=${vars.token}
`;

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

    // Construct invite message
    const inviteMessage = getInviteMessage({
        eventName: queryResult.title,
        eventId,
        startTime: queryResult.startDateTime,
        endTime: queryResult.endDateTime,
        token,
    });
    return sendEmail(email, 'Prytaneum Invite', inviteMessage, new Date(), '');
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
