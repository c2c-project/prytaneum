import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import SnackContext from 'contexts/Snack';
import theme from 'theme';
import Pages from './pages';

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment, global-require
    const { worker } = require('mock/browser');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    worker.start();
}

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <SnackContext maxSnack={3}>
                    <BrowserRouter>
                        <Pages />
                    </BrowserRouter>
                </SnackContext>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
}
