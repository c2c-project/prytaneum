import * as bcrypt from 'bcrypt';
import { prisma, ProtectedError, runMutation, signJwtAccessToken } from '@local/core';

interface RequestBody {
    email: string;
    password: string;
}

export async function POST(req: Request) {
    const result = await runMutation(async () => {
        const body: RequestBody = await req.json();
        console.log('Authenticating ', body.email);

        const user = await prisma.user.findFirst({
            where: { email: body.email.toLowerCase() },
        });

        if (!user)
            throw new ProtectedError({
                internalMessage: 'No user found',
                userMessage: ProtectedError.loginErrorMessage,
            });

        const isCorrectPassword = await bcrypt.compare(body.password, user.password);

        if (!isCorrectPassword)
            throw new ProtectedError({
                internalMessage: 'Incorrect password',
                userMessage: ProtectedError.loginErrorMessage,
            });

        const { password, ...userWithoutPass } = user;
        const accessToken = signJwtAccessToken(userWithoutPass);
        const result = {
            ...userWithoutPass,
            accessToken,
        };

        return result;
    });

    return new Response(JSON.stringify(result));
}
