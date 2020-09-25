import teamMember1 from 'assets/teamMembers/teamMember1.jpg';
import { ReferenceNames, Team, TeamMember } from 'types';
import faker from 'faker';

const devTeam = [
    {
        name: 'Front-end Developers',
        members: [
            {
                fullName: 'Anthony Hallak',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent().toISOString(),
                endDate: faker.date.future().toISOString(),
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
                startDate: faker.date.recent().toISOString(),
                endDate: faker.date.future().toISOString(),
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
                startDate: faker.date.recent().toISOString(),
                endDate: faker.date.future().toISOString(),
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
                startDate: faker.date.recent().toISOString(),
                endDate: faker.date.future().toISOString(),
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
    } as Team,
    {
        name: 'Back-end Developers',
        members: [
            {
                fullName: 'Jerry Tan',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent().toISOString(),
                endDate: faker.date.future().toISOString(),
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
                startDate: faker.date.recent().toISOString(),
                endDate: faker.date.future().toISOString(),
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
                startDate: faker.date.recent().toISOString(),
                endDate: faker.date.future().toISOString(),
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
                startDate: faker.date.recent().toISOString(),
                endDate: faker.date.future().toISOString(),
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
                startDate: faker.date.recent().toISOString(),
                endDate: faker.date.future().toISOString(),
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
    } as Team,
];

export const addTeamMember = (newMember: TeamMember, teamName: string) => {
    const teamIndex = devTeam.findIndex((subTeam) => subTeam.name === teamName);

    if (teamIndex === -1) {
        // teamName was not found
        throw Error('Team not found');
    }
    devTeam[teamIndex].members.push(newMember);
};

export default (): Team[] => devTeam;
