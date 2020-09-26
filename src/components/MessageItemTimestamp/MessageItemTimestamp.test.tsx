import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';

import MessageItemTimestamp from './MessageItemTimestamp';

describe('MessageItemTimestamp', function () {
    let container: HTMLDivElement | null = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
        }
        container = null;
    });

    it('should render', () => {
        const time = 10;
        // eslint-disable-next-line
        const snapshot = renderer
            .create(
                <MessageItemTimestamp id='MessageItemTimestamp' time={time} />
            )
            .toJSON();
        ReactTestUtils.act(() => {
            render(
                <MessageItemTimestamp id='MessageItemTimestamp' time={time} />,
                container
            );
        });
        expect(document.getElementById('MessageItemTimestamp')).toBeTruthy();
        expect(snapshot).toMatchSnapshot();
    });
});
