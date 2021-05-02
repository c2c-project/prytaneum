import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import faker from 'faker/locale/en';

import { ReferenceNames } from 'types';
import Team from './Team';

describe('Team', () => {
    let container: HTMLDivElement | null = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
        }
        container = null;
        jest.restoreAllMocks();
    });

    // eslint-disable-next-line jest/expect-expect
    it('should render', () => {
        const dummyTeam = {
            name: faker.company.companyName(),
            members: [
                {
                    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
                    description: faker.lorem.paragraph(),
                    subtitle: faker.random.words(2),
                    startDate: faker.date.recent().toISOString(),
                    endDate: faker.date.future().toISOString(),
                    picturePath: faker.image.imageUrl(),
                    references: [
                        {
                            name: 'Email' as ReferenceNames,
                            link: 'https://www.gmail.com',
                        },
                    ],
                },
            ],
        };

        ReactTestUtils.act(() => {
            render(<Team team={dummyTeam} />, container);
        });
    });
});
