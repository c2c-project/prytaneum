import jwt from 'jsonwebtoken';
// import fs from 'fs';
// import util from 'util';
// import { pipeline } from 'stream';
// import path from 'path';

// import { sendEmail } from '@local/lib/email/email';
// import { FastifyRequest } from 'fastify/types/request';
// import { errors } from '@local/features/utils';

// const pump = util.promisify(pipeline);

// const paramsJsonSchema = {
//     type: 'object',
//     properties: {
//         email: { type: 'string' },
//         age: { type: 'number' }
//     }
// }

// const schema = {
//     params: paramsJsonSchema
// }

// interface MulterRequest extends FastifyRequest {
//     file: any
// }

export async function routes () {
    // server.post('/invite', { schema }, async (request, reply) => {
    //     const data = await (request as MulterRequest).file();
    //     if (!data) reply.send(new Error(errors.fileNotFound));
    //     const filePath = path.join(__dirname, '/downloads', data.filename);
    //     try {
    //         // Validate the filetype
    //         if (data.mimetype !== 'text/csv') throw new Error('Invalid filetype, expected .csv');
    
    //         // Make directory for files if it does not exists
    //         if (!fs.existsSync(path.join(__dirname, '/downloads'))) {
    //             fs.mkdirSync(path.join(__dirname, '/downloads'));
    //         }
    
    //         // Write file to disk
    //         await pump(data.file, fs.createWriteStream(filePath));
    
    //         // remove file and throw an error if the file exceeded the size limit
    //         if (data.file.truncated) {
    //             console.log('truncated');
    //             fs.unlink(filePath, (err) => {
    //                 if (err) console.error(JSON.stringify(err));
    //             });
    //             reply.send(new Error(errors.fileSize));    
    //         }
            
    //         // Remove file after use
    //         fs.unlink(filePath, (err) => {
    //             if (err) console.error(JSON.stringify(err));
    //         });
    //         reply.send();
    //     } catch (error) {
    //         console.error(error);
    //         fs.unlink(filePath, (err) => {
    //             if (err) console.error(JSON.stringify(err));
    //         });
    //     }
    // })
}



/**
 * @description gets a customized email template message for invites
 * @param {string} MoC Member of Congress
 * @param {string} topic Topic for the Town Hall
 * @param {string} eventDateTime The event date and time
 * @param {string} constituentScope the constituent scope
 * @returns {string} the filled out invite template string
 */
// export const getInviteString = ({
//     MoC,
//     topic,
//     eventDateTime,
//     constituentScope,
// }): string => `Dear  %recipient.fName%,
    
//     Your Member of Congress,${MoC} will be participating in an online Deliberative Townhall on ${topic} at ${eventDateTime}. This event is organized by Connecting to Congress, an independent, non-partisan initiative led by the Ohio State University, whose mission is to connect a representative sample of constituents with their elected officials in productive online townhall meetings. All ${constituentScope} constituents are invited to attend this event; if you would like to participate, please register here %recipient.inviteLink%.
//     The townhall will be online using the GoToWebcast platform, which has a limit of 3000 participants per event. After you register, you will receive an email with a unique link to join the online townhall,  which you can access via smartphone, tablet  or computer.
//     The townhall will be moderated by the Connecting to Congress team. This is an opportunity for you to ask ${MoC} questions and let them know about any concerns or problems you have had as a result of the COVID-19 pandemic. Our goal for these Deliberative Townhalls is to help elected officials hear from not just the loudest and most powerful voices in the conversation, but a representative cross-section of their constituents, so they can better represent their district. We hope you will participate!
//     Best,
//     The Connecting to Congress Team
//     For more information, please visit: https://connectingtocongress.org/
//     `;

/**
 * @description Adds unsub link to a message with newline
 * @param {string} message Message body
 * @param {string} unsubLink the unsubscribe link
 */
export const addUnsubLink = (message: string, unsubLink: string): string => {
    const updatedMessage = `${message}\n${unsubLink}`;
    return updatedMessage;
};

/**
 * @description generates a link that hashes the info for the user.
 * @param {string} email
 * @return {string} link string
 */
export const generateInviteLink = (email: string, townHallId: string): string => {
    const jwtOptions: jwt.SignOptions = {
        algorithm: 'HS256',
    };
    const payload = { email, townHallId };
    const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOptions);
    return `${process.env.HOST}/invited/${token}`;
};

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
    return `${process.env.HOST}/unsubscribe/${token}`;
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