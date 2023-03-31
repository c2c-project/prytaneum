import Mailgun from 'mailgun-js';
import jwt from 'jsonwebtoken';

import { sendEmail } from '@local/lib/email';
import { PrismaClient, User } from '@local/__generated__/prisma';
import { register } from '@local/features/accounts/methods';
import { toGlobalId } from '@local/features/utils';

const toEventId = toGlobalId('Event');

export interface InviteeData {
    first: string;
    last: string;
    email: string;
}

export interface InviteData {
    deliveryTimeString?: string; // ISO/UTC format
    deliveryTime: Date;
    eventId: string;
    previewEmail?: string;
}

/**
 * @description generates a link that hashes the info for the user.
 * @param {string} email
 * @return {string} link string
 */
const generateInviteLink = async (
    invitee: InviteeData,
    eventId: string,
    endDateTime: Date,
    prisma: PrismaClient
): Promise<string> => {
    const { email, first, last } = invitee;
    let user: User;
    const result = await prisma.user.findUnique({ where: { email } });
    if (!result) {
        const randomPassword =
            Math.random().toString(36).slice(-8) + 'zZ' + Math.floor(Math.random() * 10).toString() + '!';
        user = await register(prisma, { email, firstName: first, lastName: last }, randomPassword);
    } else {
        user = result;
    }
    console.log(user);
    // Get time until event endDateTime in hours
    const hoursUntilEventEndTime = Math.floor((endDateTime.getTime() - Date.now()) / 1000 / 60 / 60);
    const jwtOptions: jwt.SignOptions = {
        algorithm: 'HS256',
        expiresIn: (hoursUntilEventEndTime + 24).toString() + 'h',
    };
    const payload = { email, eventId, autoLogin: true };
    const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOptions);
    return `${process.env.ORIGIN}/events/${eventId}/live?token=${token}`;
};

/**
 * @description generates a link to unsubscribe from emails
 * @param {string} email
 * @return {string} link string
 */
const generateUnsubscribeLink = (email: string, eventId: string): string => {
    const jwtOptions: jwt.SignOptions = {
        algorithm: 'HS256',
    };
    const payload = { email, eventId };
    const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOptions);
    return `${process.env.ORIGIN}/unsubscribe/${token}`;
};

interface RecipiantVariables {
    [key: string]: { first: string; inviteLink: string; unsubLink: string };
}

/**
 * @description Takes in inviteeList and constructs list of emails and strigified recipiantVariables
 * @param inviteeList list of invitee data
 * @return Returns the recipiant variables along with the list of recipiant emails
 */
const generateRecipiantVariables = async (
    inviteeList: Array<InviteeData>,
    eventId: string,
    endDateTime: Date,
    prisma: PrismaClient
): Promise<{ emails: Array<string>; recipiantVariables: string }> => {
    const emails = [];
    const recipiantVariables: RecipiantVariables = {};
    for (let i = 0; i < inviteeList.length; i += 1) {
        const { first, email } = inviteeList[i];
        const inviteLink = await generateInviteLink(inviteeList[i], eventId, endDateTime, prisma);
        const unsubLink = generateUnsubscribeLink(email, eventId);
        recipiantVariables[email] = { first, inviteLink, unsubLink };
        emails.push(email);
    }
    return { emails, recipiantVariables: JSON.stringify(recipiantVariables) };
};

const formatDate = (dt: Date): string => {
    const padL = (nr: number, chr = '0') => `${nr}`.padStart(2, chr);
    return `${padL(dt.getMonth() + 1)}/${padL(dt.getDate())}/${dt.getFullYear()} ${padL(dt.getHours())}:${padL(
        dt.getMinutes()
    )}:${padL(dt.getSeconds())}`;
};

/**
 * @description sends out invites to a list of potential users
 * @param {string} inviteeList list of invitee data
 * @param {string} inviteData Invite specific data
 * @return {Promise<Array<string | Mailgun.messages.SendResponse>>} promise that resolves to the mailgun email results in array
 */
const inviteMany = async (
    inviteeList: Array<InviteeData>,
    inviteData: InviteData,
    prisma: PrismaClient
): Promise<Array<string | Mailgun.messages.SendResponse>> => {
    const { eventId, deliveryTime } = inviteData;
    // Get event from eventId and check it exists
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new Error('Event not found');
    const { title, startDateTime, endDateTime } = event;
    const globalEventId = toEventId(event).id;
    // Format start date as string for template variable
    const eventStartDate = formatDate(startDateTime);

    const results: Array<Promise<string | Mailgun.messages.SendResponse>> = [];
    const subsetSize = 1000;
    for (let i = 0; i < inviteeList.length; i += subsetSize) {
        // Take max of 1k invitees and format to list of emails and string of recipiantVariables
        const subset = inviteeList.slice(i, Math.min(inviteeList.length, i + subsetSize));
        const { emails, recipiantVariables } = await generateRecipiantVariables(
            subset,
            globalEventId,
            endDateTime,
            prisma
        );
        results.push(
            sendEmail({
                to: emails,
                subject: 'Prytaneum Invite',
                // text: inviteString,
                template: 'prytaneum-student-invite',
                'recipient-variables': recipiantVariables,
                'h:X-Mailgun-Variables': JSON.stringify({ eventName: title, eventStartDate }),
                'o:deliverytime': deliveryTime.toUTCString(),
                'v:invite-url': '%recipient.inviteLink%',
            })
        );
    }
    return Promise.all(results);
};

const validateData = (data: InviteData): void => {
    if (data.eventId === undefined) throw new Error('Invalid Form Data');
};

/**
 * @description Valides a given delivery time header
 * @param {string | undefined} deliveryTimeString delivery time taken from header
 * @returns {Date} Given date as Date object if defined. Defaults to current Date object if undefined.
 * @throws ClientError: If a given string is defined but invalid throws a formatting error
 */
const validateDeliveryTime = (deliveryTimeString: string | undefined): Date => {
    let deliveryTime: Date;
    if (deliveryTimeString === undefined) {
        // Deliver right away by default if no deliveryTime is given
        deliveryTime = new Date(Date.now());
    } else if (Number.isNaN(Date.parse(deliveryTimeString))) {
        // Check if the ISO format is valid by parsing string, returns NaN if invalid
        throw new Error('Invalid ISO Date format');
    } else {
        // Delivery time is set to the time given
        deliveryTime = new Date(deliveryTimeString);
    }
    return deliveryTime;
};

const inviteCSVList = async (
    inviteeList: Array<InviteeData>,
    data: InviteData,
    prisma: PrismaClient,
    previewEmail?: string
): Promise<Array<string | Mailgun.messages.SendResponse>> => {
    const unsubSet = new Set();
    // await notifications.getUnsubList(data.region) // Checked if undefined earlier
    const filteredInviteeList = inviteeList.filter((item: InviteeData) => {
        return !unsubSet.has(item.email);
    });
    if (filteredInviteeList.length === 0) {
        throw new Error('No valid invitees');
    }
    if (previewEmail)
        filteredInviteeList.push({
            email: previewEmail,
            first: 'first',
            last: 'last',
        } as InviteeData);
    return inviteMany(filteredInviteeList, data, prisma);
};

/**
 * Metadata for uploaded csv file
 */
export interface NotificationMetaData {
    name: string;
    size: number; // Size in bytes
    sentDateTime: string; // UTC Format
}

export default {
    inviteMany,
    validateDeliveryTime,
    inviteCSVList,
    validateData,
};
