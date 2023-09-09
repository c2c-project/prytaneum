'use client';

import React, { ReactNode } from 'react';
import { darkTheme, lightTheme } from '@local/app/theme';
import { ThemeProvider, Button } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider, ProviderContext } from 'notistack';

interface Props {
    children: ReactNode;
}

export function Providers({ children }: Props) {
    const notistackRef = React.useRef<ProviderContext | null>(null);

    const onClickDismiss = (key: string | number) => () => {
        notistackRef?.current?.closeSnackbar(key);
    };

    return (
        <SessionProvider>
            <ThemeProvider theme={darkTheme}>
                <SnackbarProvider
                    ref={(ref) => {
                        notistackRef.current = ref;
                    }}
                    action={(key) => (
                        <Button color='inherit' onClick={onClickDismiss(key)}>
                            Dismiss
                        </Button>
                    )}
                    maxSnack={3}
                >
                    {children}
                </SnackbarProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
