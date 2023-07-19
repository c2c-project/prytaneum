'use client';
import './globals.css';
import { darkTheme, lightTheme } from './theme/themes';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Providers } from '@local/components';
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <head>
                <title>Create Next App</title>
                <meta name='Connecting Classrooms to Congress' content='Connecting Classrooms to Congress' />
                <link rel='icon' href='/favicon.ico' />
            </head>
            <Providers>
                <CssBaseline />
                <body>{children}</body>
            </Providers>
        </html>
    );
}
