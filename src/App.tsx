import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import UserContext from 'contexts/User';
import SnackContext from 'contexts/Snack';
import theme from 'theme';
// import Pages from './pages';
import Routes from './routes';
import { User } from './types';

export default function App() {
    // TODO: update when user fetching/logging in is figured out
    const [user, setUser] = React.useState<User | null>(null);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <SnackContext maxSnack={1}>
                    <UserContext.Provider value={{ user, setUser }}>
                        <Routes />
                    </UserContext.Provider>
                </SnackContext>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
}
