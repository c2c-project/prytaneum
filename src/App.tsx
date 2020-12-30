import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import ThemeProvider from 'contexts/Theme';
import SnackContext from 'contexts/Snack';
import Routes from './routes';

export default function App() {
    return (
        <ThemeProvider>
            <CssBaseline />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <SnackContext maxSnack={1}>
                    <Routes />
                </SnackContext>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
}
