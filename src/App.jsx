/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SnackbarProvider } from 'notistack';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Pages from './pages';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#0074bc' },
        secondary: { main: '#fdb813' }
    }
});

// eslint-disable-next-line react/prop-types
function Snackbar({ children, ...rest }) {
    // add action to all snackbars
    const notistackRef = React.createRef();
    const onClickDismiss = k => () => {
        notistackRef.current.closeSnackbar(k);
    };
    return (
        <SnackbarProvider
            ref={notistackRef}
            action={key => (
                <Button onClick={onClickDismiss(key)}>Dismiss</Button>
            )}
            {...rest}
        >
            {children}
        </SnackbarProvider>
    );
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <CssBaseline />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Snackbar maxSnack={1}>
                        <Pages />
                    </Snackbar>
                </MuiPickersUtilsProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
