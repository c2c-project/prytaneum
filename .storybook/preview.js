import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';

import UserContext from '../src/contexts/User';
import SnackContext from '../src/contexts/Snack';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeviceContext from '../src/contexts/Device';
import theme from '../src/theme';
import './main.css';
import { worker } from '../src/mock/browser';

worker.start();

addDecorator((storyFn) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackContext maxSnack={1}>
            <UserContext.Provider value={{ _id: '1', username: 'anonymous' }}>
                <DeviceContext>
                    <div style={{ height: '100%', width: '100%' }}>
                        {storyFn()}
                    </div>
                </DeviceContext>
            </UserContext.Provider>
        </SnackContext>
    </ThemeProvider>
));

addParameters({
    a11y: {
        element: '#root',
        config: {},
        options: {},
        manual: true,
    },
});
