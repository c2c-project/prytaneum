import bcrypt from 'bcryptjs';
import { PrismaClient } from '../src/__generated__/prisma';
const prisma = new PrismaClient();

async function main() {
    await prisma.event.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
    const encryptedPassword = await bcrypt.hash('password', 10);

    const testUser = await prisma.user.upsert({
        where: { email: 'test@prytaneum.io' },
        update: {},
        create: {
            email: 'test@prytaneum.io',
            firstName: 'Test',
            lastName: 'User',
            fullName: 'Test User',
            password: encryptedPassword,
            preferredLang: 'EN',
        },
    });

    console.log('DB Seeded.');
    console.log({ testUser });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
