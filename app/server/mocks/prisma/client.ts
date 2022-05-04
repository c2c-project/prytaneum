import { PrismaClient } from '../../src/__generated__/prisma';

// Error occurs unless prisma is a default export
const prisma = new PrismaClient();
export default prisma;
