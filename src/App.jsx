import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SnackContext from './contexts/Snack';
import theme from './theme';
import Pages from './pages';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <CssBaseline />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackContext maxSnack={1}>
                        <Pages />
                    </SnackContext>
                </MuiPickersUtilsProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
