import { prismaMock } from '../../../../../mocks/prisma/singleton';
import { FGDT_DUMMY_USER_COUNT, seedFgdtUsers } from './dummyUsers';

describe('seedFgdtUsers', () => {
    test('is idempotent and returns stable participant-to-user mappings', async () => {
        (prismaMock.user.upsert as any).mockImplementation(async ({ create }: any) => ({
            ...create,
            id: `00000000-0000-0000-0000-${create.email.slice(10, 12).padStart(12, '0')}`,
        }));

        const firstRun = await seedFgdtUsers(prismaMock);
        const secondRun = await seedFgdtUsers(prismaMock);

        expect(firstRun).toHaveLength(FGDT_DUMMY_USER_COUNT);
        expect(secondRun).toEqual(firstRun);
        expect(prismaMock.user.upsert).toHaveBeenCalledTimes(FGDT_DUMMY_USER_COUNT * 2);
        expect(firstRun[0]).toEqual({
            participantKey: 'fgdt-demo-01',
            email: 'fgdt-demo-01@prytaneum.invalid',
            userId: '00000000-0000-0000-0000-000000000001',
        });
        expect(prismaMock.user.upsert).toHaveBeenNthCalledWith(1, {
            where: { email: 'fgdt-demo-01@prytaneum.invalid' },
            create: expect.objectContaining({
                email: 'fgdt-demo-01@prytaneum.invalid',
                password: null,
                preferredLang: 'EN',
                isAdmin: false,
                canMakeOrgs: false,
            }),
            update: {
                preferredLang: 'EN',
                isAdmin: false,
                canMakeOrgs: false,
            },
        });
    });
});
