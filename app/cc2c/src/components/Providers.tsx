'use client';

import React, { ReactNode } from 'react';
import { darkTheme, lightTheme } from '@local/app/theme';
import type { Theme } from '@mui/material/styles';
import { ThemeProvider, Button } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider, ProviderContext } from 'notistack';

interface Props {
    children: ReactNode;
}

export function useThemeMode() {
    const [theme, setTheme] = React.useState<Theme | undefined>();
    const [darkMode, setDarkMode] = React.useState<boolean | undefined>();

    React.useEffect(() => {
        setTheme(localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme);
        setDarkMode(localStorage.getItem('theme') === 'dark');
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            localStorage.setItem('theme', 'light');
            setDarkMode(false);
            setTheme(lightTheme);
        } else {
            localStorage.setItem('theme', 'dark');
            setDarkMode(true);
            setTheme(darkTheme);
        }
    };

    return { darkMode, toggleTheme, theme };
}

export function Providers({ children }: Props) {
    const notistackRef = React.useRef<ProviderContext | null>(null);
    const { theme } = useThemeMode();

    const onClickDismiss = (key: string | number) => () => {
        notistackRef?.current?.closeSnackbar(key);
    };

    if (!theme) return null;

    return (
        <SessionProvider>
            <ThemeProvider theme={theme}>
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
