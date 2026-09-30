import type { PrismaClient } from '@local/__generated__/prisma';

export type FgdtDummyUserMapping = {
    participantKey: string;
    email: string;
    userId: string;
};

export const FGDT_DUMMY_USER_COUNT = 20;

export function getFgdtDummyUserIdentity(index: number): { participantKey: string; email: string } {
    if (!Number.isInteger(index) || index < 1 || index > FGDT_DUMMY_USER_COUNT) {
        throw new Error(`FGDT dummy user index must be between 1 and ${FGDT_DUMMY_USER_COUNT}.`);
    }
    const number = index.toString().padStart(2, '0');
    const participantKey = `fgdt-demo-${number}`;
    return { participantKey, email: `${participantKey}@prytaneum.invalid` };
}

/** Add or safely normalize the reusable local FGDT demo users. */
export async function seedFgdtUsers(prisma: PrismaClient): Promise<FgdtDummyUserMapping[]> {
    const mappings: FgdtDummyUserMapping[] = [];

    for (let index = 1; index <= FGDT_DUMMY_USER_COUNT; index++) {
        const number = index.toString().padStart(2, '0');
        const { participantKey, email } = getFgdtDummyUserIdentity(index);
        const firstName = `Simulated Participant ${number}`;
        const lastName = 'FGDT';
        const user = await prisma.user.upsert({
            where: { email },
            create: {
                email,
                firstName,
                lastName,
                fullName: `${firstName} ${lastName}`,
                password: null,
                preferredLang: 'EN',
                isAdmin: false,
                canMakeOrgs: false,
            },
            update: {
                preferredLang: 'EN',
                isAdmin: false,
                canMakeOrgs: false,
            },
        });
        mappings.push({ participantKey, email, userId: user.id });
    }

    return mappings;
}
