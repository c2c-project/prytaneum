import React, { Children } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { format } from 'date-fns';

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
        const toTest = "<div id=\"MessageItemTimestamp\"><p class=\"MuiTypography-root MuiTypography-body1\">"+format(new Date(time), 'hh:mm')+"</p></div>";
        ReactTestUtils.act(() => {
            render(
                <div id='MessageItemTimestamp'>
                    <MessageItemTimestamp time={time} />
                </div>,
                container
            )
        });
        expect(document.getElementById('MessageItemTimestamp')).toBeTruthy();
        expect(document.getElementById('MessageItemTimestamp')).toContainHTML(toTest);
    });

});
