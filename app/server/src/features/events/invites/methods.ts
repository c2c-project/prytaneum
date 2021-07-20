import { PrismaClient } from '@app/prisma';
import jwt from 'jsonwebtoken';
import { errors } from '@local/features/utils';
import { CreateInvite } from '@local/graphql-types';
import { sendEmail } from '@local/lib/email/email';
import { canUserModify } from '../methods';

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
    Join using the link https://${process.env.HOST}:${process.env.PORT}/${vars.eventId}/live?token=${vars.token}
`;

export async function invite(userId: string, prisma: PrismaClient, { email, eventId }: CreateInvite) {
    if (!canUserModify(userId, eventId, prisma)) throw new Error(errors.permissions);
    const queryResult = await prisma.event.findUnique({ where: { id: eventId } });
    if (!queryResult) throw new Error('Event not found');
    const token = jwt.sign(eventId, process.env.JWT_SECRET); // TODO expire at some point
    const inviteMessage = getInviteMessage({
        eventName: queryResult.title,
        eventId,
        startTime: queryResult.startDateTime,
        endTime: queryResult.endDateTime,
        token
    });
    return sendEmail(email, 'Prytaneum Invite', inviteMessage, new Date(), '');
}
