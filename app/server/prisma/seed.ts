import bcrypt from 'bcryptjs';
import { PrismaClient } from '../src/__generated__/prisma';
const prisma = new PrismaClient();

async function main() {
    // Ensure database tables are empty
    await prisma.event.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
    // Default User
    await prisma.user.create({
        data: {
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            fullName: 'Test User',
            password: await bcrypt.hash('Password1!', 10),
            preferredLang: 'EN',
        },
    });
    // Organizer
    await prisma.user.create({
        data: {
            email: 'organizer@example.com',
            firstName: 'Test',
            lastName: 'Organizer',
            fullName: 'Test Organizer',
            password: await bcrypt.hash('Password1!', 10),
            preferredLang: 'EN',
            canMakeOrgs: true,
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
