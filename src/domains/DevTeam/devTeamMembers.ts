import teamMember1 from 'assets/teamMembers/teamMember1.jpg';
import { ReferenceNames } from 'types';
import faker from 'faker';

export default [
    {
        name: 'Front-end Developers',
        members: [
            {
                fullName: 'Anthony Hallak',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        name: 'Github' as ReferenceNames,
                        link: 'https://github.com',
                    },
                    {
                        name: 'LinkedIn' as ReferenceNames,
                        link: 'https://www.linkedin.com',
                    },
                ],
            },
            {
                fullName: 'Carolyn Kong',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        name: 'Github' as ReferenceNames,
                        link: 'https://github.com',
                    },
                    {
                        name: 'LinkedIn' as ReferenceNames,
                        link: 'https://www.linkedin.com',
                    },
                ],
            },
            {
                fullName: 'David Silva',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        name: 'Github' as ReferenceNames,
                        link: 'https://github.com',
                    },
                ],
            },
            {
                fullName: 'Francisco Gallego',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        name: 'Github' as ReferenceNames,
                        link: 'https://github.com',
                    },
                    {
                        name: 'LinkedIn' as ReferenceNames,
                        link: 'https://www.linkedin.com',
                    },
                ],
            },
        ],
    },
    {
        name: 'Back-end Developers',
        members: [
            {
                fullName: 'Jerry Tan',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        name: 'Github' as ReferenceNames,
                        link: 'https://github.com',
                    },
                    {
                        name: 'LinkedIn' as ReferenceNames,
                        link: 'https://www.linkedin.com',
                    },
                ],
            },
            {
                picturePath: teamMember1,
                fullName: 'Johan Guzman',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        name: 'Github' as ReferenceNames,
                        link: 'https://github.com/johan1505',
                    },
                    {
                        name: 'resume' as ReferenceNames,
                        link:
                            'https://johan1505.github.io/Personal-Website/Documents/Resume.pdf',
                    },
                ],
            },
            {
                fullName: 'Kelton Adey',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        name: 'Github' as ReferenceNames,
                        link: 'https://github.com',
                    },
                    {
                        name: 'LinkedIn' as ReferenceNames,
                        link: 'https://www.linkedin.com',
                    },
                ],
            },
            {
                fullName: 'Karan Singh',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        name: 'Github' as ReferenceNames,
                        link: 'https://github.com',
                    },
                    {
                        name: 'LinkedIn' as ReferenceNames,
                        link: 'https://www.linkedin.com',
                    },
                ],
            },
            {
                fullName: 'Stanley Muzhuthettu',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        name: 'Github' as ReferenceNames,
                        link: 'https://github.com',
                    },
                    {
                        name: 'LinkedIn' as ReferenceNames,
                        link: 'https://www.linkedin.com',
                    },
                ],
            },
        ],
    },
];
