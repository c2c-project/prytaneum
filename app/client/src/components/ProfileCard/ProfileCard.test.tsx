/* eslint-disable */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import faker from 'faker/locale/en';
import { ReferenceNames } from 'types';
import ProfileCard from './ProfileCard';

jest.mock('@material-ui/core/useMediaQuery', () => () => true);

describe('ProfileCard', () => {
    let container: HTMLDivElement | null = null;
    const dummyTeamMember = {
        picturePath: faker.image.avatar(),
        fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        description: faker.lorem.paragraph(2),
        subtitle: faker.random.words(2),
        startDate: faker.date.recent().toISOString(),
        endDate: faker.date.future().toISOString(),
        references: [
            {
                name: 'Github' as ReferenceNames,
                link: 'https://github.com',
            },
        ],
    };

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
        }
        container = null;
        jest.restoreAllMocks();
    });

    // eslint-disable-next-line jest/expect-expect
    it('should render', () => {
        ReactTestUtils.act(() => {
            render(<ProfileCard teamMember={dummyTeamMember} />, container);
        });
    });

    // it('should open dialog', () => {
    //     ReactTestUtils.act(() => {
    //         render(<ProfileCard teamMember={dummyTeamMember} />, container);
    //     });
    //     const openDialogButton = document.querySelector(
    //         '#openDialogButton'
    //     ) as HTMLButtonElement;

    //     ReactTestUtils.act(() => {
    //         openDialogButton.dispatchEvent(
    //             new MouseEvent('click', { bubbles: true })
    //         );
    //     });

    //     const titleDialog = document.querySelector(
    //         '#profile-card-dialog-title'
    //     ) as HTMLHeadElement;
    //     expect(titleDialog.textContent).toBe(dummyTeamMember.fullName);

    //     const descriptionDialog = document.querySelector(
    //         '#profile-card-dialog-description'
    //     ) as HTMLParagraphElement;
    //     expect(descriptionDialog.textContent).toBe(dummyTeamMember.description);
    // });

    // it('should not open dialog if button is not clicked', () => {
    //     ReactTestUtils.act(() => {
    //         render(<ProfileCard teamMember={dummyTeamMember} />, container);
    //     });

    //     const titleDialog = document.querySelector(
    //         '#profile-card-dialog-title'
    //     ) as HTMLHeadElement;
    //     expect(titleDialog).toBeFalsy();

    //     const descriptionDialog = document.querySelector(
    //         '#profile-card-dialog-description'
    //     ) as HTMLParagraphElement;
    //     expect(descriptionDialog).toBeFalsy();
    // });
    // TODO: convert this to snapshot testing
    // eslint-disable-next-line jest/no-commented-out-tests
    // it('should open dialog and then close it', () => {
    //     ReactTestUtils.act(() => {
    //         render(<ProfileCard teamMember={dummyTeamMember} />, container);
    //     });
    //     const openDialogButton = document.querySelector(
    //         '#openDialogButton'
    //     ) as HTMLButtonElement;

    //     ReactTestUtils.act(() => {
    //         openDialogButton.dispatchEvent(
    //             new MouseEvent('click', { bubbles: true })
    //         );
    //     });

    //     const descriptionDialog = document.querySelector(
    //         '#profile-card-dialog-description'
    //     ) as HTMLParagraphElement;
    //     expect(descriptionDialog.textContent).toBe(dummyTeamMember.description);

    //     const closeDialogButton = document.querySelector(
    //         '[aria-label="close"]'
    //     ) as HTMLButtonElement;

    //     ReactTestUtils.act(() => {
    //         closeDialogButton.dispatchEvent(
    //             new MouseEvent('click', { bubbles: true })
    //         );
    //     });

    //     const falsyDescriptionDialog = document.querySelector(
    //         '#profile-card-dialog-description'
    //     ) as HTMLParagraphElement;
    //     expect(falsyDescriptionDialog).toBeFalsy();
    // });
});
