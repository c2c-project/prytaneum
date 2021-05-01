import faker from 'faker';
import { User } from '@app/prisma';

/**
 * generate the user
 */
export const gen = (): User => {
    const firstName = faker.name.findName();
    const lastName = faker.name.lastName();
    return {
        userId: faker.random.uuid(),
        createdAt: faker.date.past(),
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        email: faker.internet.email(),
        password: faker.internet.password(),
        preferredLang: 'EN',
        canMakeOrgs: Math.random() > 0.5,
    };
};
