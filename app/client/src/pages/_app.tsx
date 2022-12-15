import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, Theme } from '@mui/material/styles';
import { AppProps } from 'next/app';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Head from 'next/head';
import { RelayEnvironmentProvider } from 'react-relay';

import { UserProvider } from '@local/features/accounts/UserContext';
import { ThemeProvider, SnackContext, useEnvironment } from '@local/core';
import { Layout } from '@local/layout';
import '@local/index.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as ga from '../utils/ga/index';

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    // https://arturocampos.dev/blog/nextjs-with-google-analytics <- referenced for the router implementation
    useEffect(() => {
        const handleRouteChange = (url: any) => {
            ga.pageview(url, document.title);
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    const { env } = useEnvironment(pageProps.initialRecords);

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) jssStyles.parentElement?.removeChild(jssStyles);
        // Navigator.serviceWork is undefined in a private window (it seems).
        if (navigator.serviceWorker) {
            // Unregister old service workers
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                registrations.forEach((registration) => {
                    registration.unregister();
                });
            });
        }
    }, []);

    return (
        <>
            <Head>
                <title>Prytaneum</title>
            </Head>
            <RelayEnvironmentProvider environment={env}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider>
                        <CssBaseline />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <SnackContext maxSnack={3}>
                                <UserProvider userInfo={pageProps.userInfo}>
                                    <Layout
                                        hideSideNav={pageProps.hideSideNav}
                                        ContainerProps={pageProps.containerProps}
                                        disablePadding={pageProps.disablePadding}
                                    >
                                        <Component {...pageProps} />
                                    </Layout>
                                </UserProvider>
                            </SnackContext>
                        </LocalizationProvider>
                    </ThemeProvider>
                </StyledEngineProvider>
            </RelayEnvironmentProvider>
        </>
    );
}
