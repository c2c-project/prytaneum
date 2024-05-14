import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, Theme } from '@mui/material/styles';
import { AppProps } from 'next/app';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Head from 'next/head';
import { RelayEnvironmentProvider } from 'react-relay';

import { UserProvider } from '@local/features/accounts/UserContext';
import { ThemeProvider, SnackContext, useEnvironment } from '@local/core';
import { Layout } from '@local/layout';
import '@local/index.css';
import { useRouter } from 'next/router';
import * as ga from '@local/utils/ga/index';
import { GlobalStyles } from '@mui/material';

declare module '@mui/material/styles' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}

// Consistant scrollbar styling
const inputGlobalStyles = (
    <GlobalStyles
        styles={{
            '*::-webkit-scrollbar-track': {
                background: '#f1f1f1',
            },
            '*::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
                borderRadius: '20px',
            },
            '*::-webkit-scrollbar-thumb:hover': {
                background: '#555',
            },
            '*::-webkit-scrollbar': {
                width: '0.4em',
                backgroundColor: 'transparent',
            },
        }}
    />
);

export default function App({ Component, pageProps }: AppProps & { pageProps: any }) {
    const router = useRouter();
    const { env } = useEnvironment(pageProps.initialRecords);

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

    useEffect(() => {
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

    function Providers({ children }: { children: React.ReactNode }) {
        return (
            <RelayEnvironmentProvider environment={env}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider>
                        <CssBaseline />
                        {inputGlobalStyles}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <SnackContext maxSnack={3}>
                                <UserProvider userInfo={pageProps.userInfo}>{children}</UserProvider>
                            </SnackContext>
                        </LocalizationProvider>
                    </ThemeProvider>
                </StyledEngineProvider>
            </RelayEnvironmentProvider>
        );
    }

    return (
        <>
            <Head>
                <title>Prytaneum</title>
            </Head>
            <Providers>
                <Layout
                    hideSideNav={pageProps.hideSideNav}
                    ContainerProps={pageProps.containerProps}
                    disablePadding={pageProps.disablePadding}
                >
                    <Component {...pageProps} />
                </Layout>
            </Providers>
        </>
    );
}
