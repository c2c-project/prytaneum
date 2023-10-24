import * as bcrypt from 'bcrypt';
import { prisma, ProtectedError, runMutation } from '@local/core';

import type { TeacherSignUpFormData } from '@local/lib';

export async function POST(req: Request) {
    const result = await runMutation(async () => {
        const body: TeacherSignUpFormData = await req.json();

        // Validate Authorization Code
        if (body.authorizationCode !== process.env.REGISTRATION_AUTHORIZATION_CODE) {
            throw new ProtectedError({ userMessage: 'Invalid authorization code' });
        }

        const lowerCaseEmail = body.email.toLowerCase().replace(/ /g, ''); // Remove spaces and make lowercase

        // If authorization code is valid, create teacher account
        const newUser = await prisma.user.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: lowerCaseEmail,
                password: await bcrypt.hash(body.password, 10),
                shadowAccount: false,
                role: 'TEACHER',
            },
        });

        // Create prytaneum account for user as well
        const response = await fetch(`${process.env.PRYTANEUM_URL}/api/create-account`, {
            method: 'POST',
            body: JSON.stringify({ email: lowerCaseEmail, firstName: body.firstName, lastName: body.lastName }),
        });

        if (response.ok) console.log(`Successfully created Prytaneum account: ${lowerCaseEmail}`);
        else {
            console.error(response);
            console.error(`Error creating Prytaneum account: ${lowerCaseEmail}`);
        }

        const { password, ...userWithoutPass } = newUser;
        return userWithoutPass;
    });

    return new Response(JSON.stringify(result));
}
