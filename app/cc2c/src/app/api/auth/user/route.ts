import * as bcrypt from 'bcrypt';
import { prisma, runMutation } from '@local/core';

interface RequestBody {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: Request) {
    const result = await runMutation(async () => {
        const body: RequestBody = await req.json();

        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email.toLowerCase(),
                password: await bcrypt.hash(body.password, 10),
            },
        });

        const { password, ...userWithoutPass } = newUser;
        return userWithoutPass;
    });

    return new Response(JSON.stringify(result));
}
