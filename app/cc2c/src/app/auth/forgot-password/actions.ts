'use server';

import mg from '@local/lib/email/client';
import jwt from 'jsonwebtoken';

export async function sendForgotPasswordEmail(formData: FormData) {
    try {
        // Verify env variables
        if (!process.env.MAILGUN_DOMAIN) throw new Error('MAILGUN_DOMAIN not configured');
        if (!process.env.MAILGUN_FROM_EMAIL) throw new Error('MAILGUN_FROM_EMAIL not configured');
        if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not configured');
        if (!process.env.ORIGIN_URL) throw new Error('ORIGIN_URL not configured');

        const email = formData.get('email') as string | null;
        if (!email) throw new Error('Missing email field');

        const resetPasswordToken = jwt.sign({ email }, process.env.JWT_SECRET);

        const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: `CC2C <${process.env.MAILGUN_FROM_EMAIL}>`,
            to: email,
            subject: 'CC2C Password Reset',
            template: 'cc2c-reset-password',
            'v:reset-password-url': `${process.env.ORIGIN_URL}/auth/reset-password/?token=${resetPasswordToken}`,
        });

        if (result.status !== 200) throw new Error(`Error sending email: ${result.message}`);
        return { isError: false, message: 'Email sent successfully' };
    } catch (error) {
        console.error(error);
        return { isError: true, message: error instanceof Error ? error.message : 'Unknown error occured' };
    }
}
