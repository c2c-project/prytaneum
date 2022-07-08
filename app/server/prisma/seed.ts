import { PrismaClient } from '../src/__generated__/prisma';
const prisma = new PrismaClient();

async function main() {
    // Ensure database tables are empty
    await prisma.event.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
