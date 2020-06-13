import React from 'react';
import { addDecorator } from '@storybook/react';
import UserContext from '../src/contexts/User';
import SnackContext from '../src/contexts/Snack';
import ApiContext from '../src/contexts/API';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';
import './main.css';

addDecorator((storyFn) => (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <SnackContext maxSnack={1}>
                <UserContext.Provider
                    value={{ _id: '1', username: 'anonymous' }}
                >
                    <div style={{ height: '100%', width: '100%' }}>
                        {storyFn()}
                    </div>
                </UserContext.Provider>
            </SnackContext>
        </BrowserRouter>
    </ThemeProvider>
));
