import bcrypt from 'bcryptjs';
import { PrismaClient } from '../src/__generated__/prisma';
const prisma = new PrismaClient();

// Based off of the number of browser devices used in e2e testing
// Ensure this value is kept in sync with the env var under app/e2e/.env.test
const DEVICE_AMMOUNT = 6;

async function main() {
    // Ensure database tables are empty
    await prisma.event.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
    // Default User
    for (let i = 0; i < DEVICE_AMMOUNT; i++) {
        await prisma.user.create({
            data: {
                email: `user${i + 1}@example.com`,
                firstName: 'Test',
                lastName: 'User',
                fullName: 'Test User',
                password: await bcrypt.hash('Password1!', 10),
                preferredLang: 'EN',
            },
        });
    }
    // Organizers
    for (let i = 0; i < DEVICE_AMMOUNT; i++) {
        await prisma.user.create({
            data: {
                email: `organizer${i + 1}@example.com`,
                firstName: 'Test',
                lastName: 'Organizer',
                fullName: 'Test Organizer',
                password: await bcrypt.hash('Password1!', 10),
                preferredLang: 'EN',
                canMakeOrgs: true,
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
