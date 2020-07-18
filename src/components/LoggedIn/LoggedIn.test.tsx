import React, { Children } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from 'theme';
import LoggedIn from './LoggedIn';

describe('LoggedIn', function() {
    let container: HTMLDivElement | null = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() =>{
        // cleanup
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
        }
        container = null;
        jest.restoreAllMocks();
    });

    /*test('should not redirect when NODE_ENV === \'development\'', 
        async () => {
            expect(NODE_ENV)
        }
    );*/
    
    // check if NODE_ENV === 'development'
    it('should NODE_ENV be development', () => {
        const children = <h1>hi</h1>;
        ReactTestUtils.act(
            () => {
                render(
                    <ThemeProvider theme={theme}>
                        <MemoryRouter initialEntries={['/']}>
                            <Route path='/'>
                                <LoggedIn 
                                    children={children}
                                />
                            </Route>
                        </MemoryRouter>
                    </ThemeProvider>,
                    container
                );
            }
        );
    });
});