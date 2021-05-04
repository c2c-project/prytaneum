import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// import { createStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import { useApollo } from '@local/utils/apolloClient';
// import rootReducer from '@local/reducers';
// import UserProvider from '@local/contexts/User';
import ThemeProvider from '@local/contexts/Theme';
import SnackContext from '@local/contexts/Snack';
import '@local/index.css';

// const store = createStore(rootReducer);

export default function App({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps);
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);
    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider>
                <CssBaseline />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackContext maxSnack={1}>
                        {/* <UserProvider> */}
                        {/* <Provider store={store}> */}
                        <Component {...pageProps} />
                        {/* </Provider> */}
                        {/* </UserProvider> */}
                    </SnackContext>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        </ApolloProvider>
    );
}
