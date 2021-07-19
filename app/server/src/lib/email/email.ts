import mg from './client';

export interface Email {
    to: string | Array<string>,
    subject: string,
    text: string,
    deliveryTime: Date,
    recipientVariables: string,
}

/**
 * @description internal function to use mg api to send email
 * @param {string} to email adress being sent to
 * @param {string} subject subject of the email
 * @param {string} text body of the email
 * @param {Date} deliveryTime Time that the email should be sent out (If the date is in the past it will be sent immediately)
 * @param {string} recipientVariables stringified recipient variables for email template
 * @param {string} customAPIKey? optional custom API key for mailgun
 * @param {string} customDomain? optional custom domain for mailgun
 * @returns {Promise<string>}
 */
export async function sendEmail(
    to: string | Array<string>,
    subject: string,
    text: string,
    deliveryTime: Date,
    recipientVariables: string
) {
    if (!process.env.MAILGUN_DOMAIN) throw new Error('MAILGUN_DOMAIN not configured');
    
    if (process.env.NODE_ENV === 'test') {
        return new Promise<string>((resolve) => resolve('success'));
    }
    if (process.env.NODE_ENV === 'development') {
        return mg.messages.create(process.env.MAILGUN_DOMAIN, {
            to,
            from: `Prytaneum <${process.env.MAILGUN_FROM_EMAIL}>`,
            subject,
            text,
            'recipient-variables': recipientVariables,
            'o:deliverytime': deliveryTime.toUTCString(),
            'o:testmode': 'true',
        });
    }
    return mg.messages.create(process.env.MAILGUN_DOMAIN, {
        to,
        from: `Prytaneum <${process.env.MAILGUN_FROM_EMAIL}>`,
        subject,
        text,
        'recipient-variables': recipientVariables,
        'o:deliverytime': deliveryTime.toUTCString(),
    });
}
