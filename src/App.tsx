import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import UserContext from 'contexts/User';
import SnackContext from 'contexts/Snack';
import theme from 'theme';
import Pages from './pages';
import { User } from './types';

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment, global-require
    const { worker } = require('mock/browser');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    worker.start();
}

export default function App() {
    const [user, setUser] = React.useState<User | null>(null);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <SnackContext maxSnack={3}>
                    <BrowserRouter>
                        <UserContext.Provider value={{ user, setUser }}>
                            <Pages />
                        </UserContext.Provider>
                    </BrowserRouter>
                </SnackContext>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
}
