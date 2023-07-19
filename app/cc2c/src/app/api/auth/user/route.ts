import * as bcrypt from 'bcrypt';
import { prisma } from '@local/core/prisma';

interface RequestBody {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: Request) {
    try {
        const body: RequestBody = await req.json();

        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: await bcrypt.hash(body.password, 10),
            },
        });

        const { password, ...userWithoutPass } = newUser;
        return new Response(JSON.stringify(userWithoutPass));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify(null));
    }
}
