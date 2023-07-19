'use client';

import React, { ReactNode } from 'react';
import { darkTheme, lightTheme } from '@local/app/theme';
import { ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';

interface Props {
    children: ReactNode;
}

export function Providers({ children }: Props) {
    return (
        <SessionProvider>
            <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
        </SessionProvider>
    );
}
