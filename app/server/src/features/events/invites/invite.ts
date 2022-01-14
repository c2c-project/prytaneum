import jwt from 'jsonwebtoken';
import { sendEmail } from '@local/lib/email/email';

export interface InviteEmailTemplateVariables {
    eventStartDate: string,
    inviteUrl: string,
    eventName: string
}

export const sendInviteEmail = (eventName: string, eventId: string, startTime: Date, endTime: Date, invitee: string | Array<string>, token: string) => {
    const inviteUrl = `prytaneum.io/events/${eventId}/live?token=${token}`;

    sendEmail({
        to: invitee,
        subject: 'Prytaneum Invite',
        template: 'prytaneum-invite',
        'h:X-Mailgun-Variables': JSON.stringify({
            eventStartDate: startTime.toUTCString(),
            inviteUrl,
            eventName
        } as InviteEmailTemplateVariables)
    })
}

/**
 * @description generates a link to unsubscribe from emails
 * @param {string} email
 * @return {string} link string
 */
export const generateUnsubscribeLink = (email: string, townHallId: string): string => {
    const jwtOptions: jwt.SignOptions = {
        algorithm: 'HS256',
    };
    const payload = { email, townHallId };
    const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOptions);
    return `prytaneum.io/unsubscribe/${token}`;
};

interface RecipiantVariables {
    [key: string]: { fName: string; inviteLink: string; unsubLink: string };
}

/**
 * @description Takes in inviteeList and constructs list of emails and strigified recipiantVariables
 * @param inviteeList list of invitee data
 * @return Returns the recipiant variables along with the list of recipiant emails
 */
// export const generateRecipiantVariables = (
//     inviteeList: Array<InviteeData>,
//     townHallId: string
// ): { emails: Array<string>; recipiantVariables: string } => {
//     const emails = [];
//     const recipiantVariables: RecipiantVariables = {};
//     for (let i = 0; i < inviteeList.length; i += 1) {
//         const { fName, email } = inviteeList[i];
//         const inviteLink = generateInviteLink(email, townHallId);
//         const unsubLink = generateUnsubscribeLink(email, townHallId);
//         recipiantVariables[email] = { fName, inviteLink, unsubLink };
//         emails.push(email);
//     }
//     return { emails, recipiantVariables: JSON.stringify(recipiantVariables) };
// };

/**
 * @description sends out invites to a list of potential users
 * @param {string} inviteeList list of invitee data
 * @param {string} inviteData Invite specific data
 * @return {Promise<Array<string | Mailgun.messages.SendResponse>>} promise that resolves to the mailgun email results in array
 */
// export const inviteMany = async (
//     inviteeList: Array<InviteeData>,
//     inviteData: InviteData
// ): Promise<Array<string | Mailgun.messages.SendResponse>> => {
//     const results: Array<Promise<string | Mailgun.messages.SendResponse>> = [];
//     const {
//         MoC,
//         topic,
//         eventDateTime,
//         constituentScope,
//         deliveryTime,
//         townHallId,
//     } = inviteData;
//     const inviteBody = getInviteString({
//         MoC,
//         topic,
//         eventDateTime,
//         constituentScope,
//     });
//     const inviteString = addUnsubLink(
//         inviteBody,
//         'Unsubscribe: %recipient.unsubLink%'
//     );
//     const subject = 'Prytaneum Invite';
//     // TODO Test with 1k invitees to handle Mailgun limit
//     const subsetSize = 1000;
//     for (let i = 0; i < inviteeList.length; i += subsetSize) {
//         // Take max of 1k invitees and format to list of emails and string of recipiantVariables
//         const subset = inviteeList.slice(
//             i,
//             Math.min(inviteeList.length, i + subsetSize)
//         );
//         const { emails, recipiantVariables } = generateRecipiantVariables(
//             subset,
//             townHallId
//         );
//         results.push(
//             Email.sendEmail(
//                 emails,
//                 subject,
//                 inviteString,
//                 deliveryTime,
//                 recipiantVariables
//             )
//         );
//     }
//     return Promise.all(results);
// };

/**
 * @description Valides a given delivery time header
 * @param {string | undefined} deliveryTimeString delivery time taken from header
 * @returns {Date} Given date as Date object if defined. Defaults to current Date object if undefined.
 * @throws ClientError: If a given string is defined but invalid throws a formatting error
 */
export const validateDeliveryTime = (deliveryTimeString: string | undefined): Date => {
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