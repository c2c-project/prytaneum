import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import UserContext from '../src/contexts/User';
import SnackContext from '../src/contexts/Snack';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeviceContext from '../src/contexts/Device';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import theme from '../src/theme';
import './main.css';

addParameters({
    viewport: {
        viewports: MINIMAL_VIEWPORTS,
    },
});

addDecorator((storyFn) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
            <SnackContext maxSnack={1}>
                <UserContext.Provider
                    value={{ _id: '1', username: 'anonymous' }}
                >
                    <DeviceContext>
                        <div style={{ height: '100%', width: '100%' }}>
                            {storyFn()}
                        </div>
                    </DeviceContext>
                </UserContext.Provider>
            </SnackContext>
        </BrowserRouter>
    </ThemeProvider>
));

addDecorator(withA11y);
