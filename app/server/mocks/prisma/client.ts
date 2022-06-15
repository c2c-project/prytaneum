import { PrismaClient } from '../../src/__generated__/prisma';

// Error occurs due to non-prytaneum code unless prisma is the default export
const prisma = new PrismaClient();
export default prisma;
