import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import multer from 'fastify-multer';

import { getOrCreateServer } from '@local/core/server';
import { sendEmail } from '@local/lib/email/email';
import { ProtectedError } from '@local/lib/ProtectedError';
import { FastifyRequest } from 'fastify/types/request';
import Invite, { InviteData, InviteeData } from '@local/lib/invite';
import { getPrismaClient } from '@local/core/utils';
import { fromGlobalId } from 'graphql-relay';

const server = getOrCreateServer();
const downloadPath = path.join(__dirname, '..', '..', '..', 'downloads');

// Multer setup
const storage = multer.diskStorage({
    destination(req, file, cb) {
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath);
        }
        cb(null, downloadPath);
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
});

// eslint-disable-next-line @typescript-eslint/ban-types
const fileFilter = (req: unknown, file: any, cb: any) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true); // Accept
    } else {
        cb(new Error('Invalid File')); // Reject
    }
};

// TODO Discuss storing locally or in memory
const inviteUpload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10 MB limit
    },
    fileFilter,
});

interface FastifyMulterRequest extends FastifyRequest {
    file?: Express.Multer.File;
}

const readCSV = async (filePath: string) => {
    const csvFile = fs.readFileSync(filePath);
    const csvData = csvFile.toString();
    return new Promise((resolve) => {
        Papa.parse(csvData, {
            header: true,
            complete: (results) => {
                console.log('Complete', results.data.length, 'records.');
                resolve(results.data);
            },
        });
    });
};

server.route({
    method: 'POST',
    url: '/graphql/invite-csv',
    preHandler: inviteUpload.single('invite-list'),
    handler: async (req: FastifyMulterRequest, reply) => {
        const { file } = req;
        const prisma = getPrismaClient(reply.log);

        try {
            // TODO: Autheticate & check that user has permission to invite
            // let viewerId = await extractAuthenticationJwt(req).catch(() => reply.clearCookie('jwt').send());
            // if (viewerId) {
            //     const { id } = fromGlobalId(viewerId);
            //     viewerId = id;
            // }
            // if (!viewerId) throw new Error('Must be authenticated to invite users.');

            if (!file) {
                server.log.error('File undefined');
                throw new Error('The uploaded file could not be read.');
            }

            // Validate data
            const inviteData = req.body as InviteData;
            Invite.validateData(inviteData);
            inviteData.eventId = fromGlobalId(inviteData.eventId).id;
            inviteData.deliveryTime = Invite.validateDeliveryTime(inviteData.deliveryTimeString);
            const inviteeData: Array<InviteeData> = (await readCSV(file.path)) as Array<InviteeData>;

            // Remove file after use
            if (fs.existsSync(file.path))
                fs.unlink(file.path, (err) => {
                    if (err) server.log.error(err);
                });
            if (inviteeData.length > 0) {
                const results = await Invite.inviteCSVList(inviteeData, inviteData, prisma);
                server.log.info(JSON.stringify(results));
            }

            reply.code(200).send({
                isError: false,
                message: '',
                body: null,
            });
            return;
        } catch (error) {
            server.log.error(error);
            if (file && fs.existsSync(file.path)) {
                // Remove file after use
                fs.unlink(file.path, (err) => {
                    if (err) server.log.error(err);
                });
            }
            reply.code(200).send({
                isError: true,
                message: error instanceof Error ? error.message : 'An unknown error occurred.',
                body: null,
            });
        }
    },
});

export interface InviteEmailTemplateVariables {
    eventStartDate: string;
    inviteUrl: string;
    eventName: string;
}

export const sendInviteEmail = (
    eventName: string,
    eventId: string,
    startTime: Date,
    endTime: Date,
    invitee: string | Array<string>,
    token: string
) => {
    const inviteUrl = `prytaneum.io/events/${eventId}/live?token=${token}`;

    sendEmail({
        to: invitee,
        subject: 'Prytaneum Invite',
        template: 'prytaneum-invite',
        'h:X-Mailgun-Variables': JSON.stringify({
            eventStartDate: startTime.toUTCString(),
            inviteUrl,
            eventName,
        } as InviteEmailTemplateVariables),
    });
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
    return `prytaneum.io/unsubscribe/${token}`;
};

export interface RecipientVariables {
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
        throw new ProtectedError({
            userMessage: ProtectedError.internalServerErrorMessage,
            internalMessage: 'Invalid ISO Date format',
        });
    } else {
        // Delivery time is set to the time given
        deliveryTime = new Date(deliveryTimeString);
    }
    return deliveryTime;
};
