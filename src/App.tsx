import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import ThemeProvider from 'contexts/Theme';
import UserContextProvider from 'contexts/User';
import SnackContext from 'contexts/Snack';
// import Pages from './pages';
import Routes from './routes';
import { User } from './types';

export default function App() {
    // TODO: update when user fetching/logging in is figured out
    return (
        <ThemeProvider>
            <CssBaseline />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <SnackContext maxSnack={1}>
                    <UserContextProvider>
                        <Routes />
                    </UserContextProvider>
                </SnackContext>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
}
