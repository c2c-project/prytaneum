import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import rootReducer from 'reducers';
import UserProvider from 'contexts/User';
import ThemeProvider from 'contexts/Theme';
import SnackContext from 'contexts/Snack';
import Routes from './routes';

const store = createStore(rootReducer);

export default function App() {
    return (
        <ThemeProvider>
            <CssBaseline />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <SnackContext maxSnack={1}>
                    <UserProvider>
                        <Provider store={store}>
                            <Routes />
                        </Provider>
                    </UserProvider>
                </SnackContext>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
}
