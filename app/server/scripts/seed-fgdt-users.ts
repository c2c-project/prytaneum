/* eslint-disable no-console */
import { PrismaClient } from '../src/__generated__/prisma';
import { seedFgdtUsers } from '../src/features/events/feedback/simulation/dummyUsers';

async function main() {
    const prisma = new PrismaClient();
    try {
        const mappings = await seedFgdtUsers(prisma);
        console.log(JSON.stringify(mappings, null, 2));
    } finally {
        await prisma.$disconnect();
    }
}

if (require.main === module) {
    main().catch((error) => {
        console.error(error instanceof Error ? error.message : error);
        process.exitCode = 1;
    });
}
