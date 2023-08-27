import * as bcrypt from 'bcrypt';
import { prisma, ProtectedError, runMutation } from '@local/core';

import type { FacultySignUpFormData } from '@local/lib';

export async function POST(req: Request) {
    const result = await runMutation(async () => {
        const body: FacultySignUpFormData = await req.json();

        // Validate Authorization Code
        if (body.authorizationCode !== process.env.REGISTRATION_AUTHORIZATION_CODE) {
            throw new ProtectedError({ userMessage: 'Invalid authorization code' });
        }

        // If authorization code is valid, create teacher account
        const newUser = await prisma.user.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email.toLowerCase(),
                password: await bcrypt.hash(body.password, 10),
                shadowAccount: false,
                role: 'TEACHER',
            },
        });

        const { password, ...userWithoutPass } = newUser;
        return userWithoutPass;
    });

    return new Response(JSON.stringify(result));
}
