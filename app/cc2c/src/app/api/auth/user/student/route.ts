import * as bcrypt from 'bcrypt';
import { prisma, ProtectedError, runMutation } from '@local/core';

import type { StudentSignUpFormData } from '@local/lib';

export async function POST(req: Request) {
    const result = await runMutation(async () => {
        const body: StudentSignUpFormData = await req.json();

        // Validate classId
        const _class = await prisma.class.findUnique({
            where: {
                termId: body.classId,
            },
        });

        if (!_class) {
            throw new ProtectedError({ userMessage: 'Invalid classId' });
        }

        const newUser = await prisma.user.create({
            data: {
                studentId: body.studentId,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email.toLowerCase(),
                password: await bcrypt.hash(body.password, 10),
                researchProjectConsent: body.consent,
                shadowAccount: false,
            },
        });

        await prisma.student.create({
            data: {
                userId: newUser.id,
                classId: _class.id,
            },
        });

        const { password, ...userWithoutPass } = newUser;
        return userWithoutPass;
    });

    return new Response(JSON.stringify(result));
}
