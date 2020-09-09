import React from 'react';
import teamMember1 from 'assets/teamMembers/teamMember1.jpg';
import GithubIcon from '@material-ui/icons/GitHub';
import { Description as ResumeIcon } from '@material-ui/icons';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import faker from 'faker';

export default [
    {
        teamName: 'Front-end Developers',
        teamMembers: [
            {
                // picturePath: '',
                fullName: 'Anthony Hallak',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        icon: <GithubIcon />,
                        name: 'Github',
                        link: 'https://github.com',
                    },
                    {
                        icon: <LinkedInIcon />,
                        name: 'LinkedIn',
                        link: 'https://www.linkedin.com',
                    },
                ],
            },
            {
                // picturePath: '',
                fullName: 'Carolyn Kong',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        icon: <GithubIcon />,
                        name: 'Github',
                        link: 'https://github.com',
                    },
                    {
                        icon: <LinkedInIcon />,
                        name: 'LinkedIn',
                        link: 'https://www.linkedin.com',
                    },
                ],
            },
            {
                // picturePath: '',
                fullName: 'David Silva',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        icon: <GithubIcon />,
                        name: 'Github',
                        link: 'https://github.com',
                    },
                ],
            },
            {
                // picturePath: '',
                fullName: 'Francisco Gallego',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        icon: <GithubIcon />,
                        name: 'Github',
                        link: 'https://github.com',
                    },
                    {
                        icon: <LinkedInIcon />,
                        name: 'LinkedIn',
                        link: 'https://www.linkedin.com',
                    },
                ],
            },
        ],
    },
    {
        teamName: 'Back-end Developers',
        teamMembers: [
            {
                // picturePath: '',
                fullName: 'Jerry Tan',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        icon: <GithubIcon />,
                        name: 'Github',
                        link: 'https://github.com',
                    },
                    {
                        icon: <LinkedInIcon />,
                        name: 'LinkedIn',
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
                        icon: <GithubIcon />,
                        name: 'Github',
                        link: 'https://github.com/johan1505',
                    },
                    {
                        icon: <ResumeIcon />,
                        name: 'Resume',
                        link:
                            'https://johan1505.github.io/Personal-Website/Documents/Resume.pdf',
                    },
                ],
            },
            {
                // picturePath: '',
                fullName: 'Kelton Adey',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        icon: <GithubIcon />,
                        name: 'Github',
                        link: 'https://github.com',
                    },
                    {
                        icon: <LinkedInIcon />,
                        name: 'LinkedIn',
                        link: 'https://www.linkedin.com',
                    },
                ],
            },
            {
                // picturePath: '',
                fullName: 'Karan Singh',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        icon: <GithubIcon />,
                        name: 'Github',
                        link: 'https://github.com',
                    },
                    {
                        icon: <LinkedInIcon />,
                        name: 'LinkedIn',
                        link: 'https://www.linkedin.com',
                    },
                ],
            },
            {
                // picturePath: '',
                fullName: 'Stanley Muzhuthettu',
                description: faker.lorem.paragraph(),
                subtitle: faker.random.words(1),
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
                references: [
                    {
                        icon: <GithubIcon />,
                        name: 'Github',
                        link: 'https://github.com',
                    },
                    {
                        icon: <LinkedInIcon />,
                        name: 'LinkedIn',
                        link: 'https://www.linkedin.com',
                    },
                ],
            },
        ],
    },
];
