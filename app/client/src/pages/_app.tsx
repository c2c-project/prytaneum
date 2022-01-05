import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { RelayEnvironmentProvider } from 'react-relay';

import { UserProvider } from '@local/features/accounts/UserContext';
import { ThemeProvider, SnackContext, useEnvironment } from '@local/features/core';
import { Layout } from '@local/layout';
import '@local/index.css';

export default function App({ Component, pageProps }: AppProps) {
    const { env } = useEnvironment(pageProps.initialRecords);

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) jssStyles.parentElement?.removeChild(jssStyles);
    }, []);

    return (
        <>
            <Head>
                <title>Prytaneum</title>
            </Head>
            <RelayEnvironmentProvider environment={env}>
                <ThemeProvider>
                    <CssBaseline />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <SnackContext maxSnack={1}>
                            <UserProvider userInfo={pageProps.userInfo}>
                                <Layout hideSideNav={pageProps.hideSideNav} ContainerProps={pageProps.containerProps}>
                                    <Component {...pageProps} />
                                </Layout>
                            </UserProvider>
                        </SnackContext>
                    </MuiPickersUtilsProvider>
                </ThemeProvider>
            </RelayEnvironmentProvider>
        </>
    );
}
