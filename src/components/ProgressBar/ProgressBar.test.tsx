import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Progress, { DataEntry } from './ProgressBar';

const timelineData: DataEntry[] = [
    {
        label: 'Introduced',
        value: 0,
    },
    {
        label: 'Under Vote',
        value: 50,
    },
    {
        label: 'Passed into Law',
        value: 100,
    },
];

describe('Progress', function () {
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
        ReactTestUtils.act(() => {
            render(
                <Progress timeline={timelineData} currentVal={100} />,
                container
            );
        });
    });
});
