import * as bcrypt from 'bcrypt';
import { prisma, signJwtAccessToken } from '@local/core';

interface RequestBody {
    email: string;
    password: string;
}

export async function POST(req: Request) {
    try {
        const body: RequestBody = await req.json();

        const user = await prisma.user.findFirst({
            where: { email: body.email },
        });

        if (!user) throw new Error('No user found');

        const isCorrectPassword = await bcrypt.compare(body.password, user.password);
        if (!isCorrectPassword) throw new Error('Incorrect password');
        const { password, ...userWithoutPass } = user;
        const accessToken = signJwtAccessToken(userWithoutPass);
        const result = {
            ...userWithoutPass,
            accessToken,
        };
        console.log('result', result);

        return new Response(JSON.stringify(result));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify(null));
    }
}
