'use client';

import './styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CssBaseline } from '@mui/material';
import { Providers } from '@local/components';
import { inter } from './styles/fonts';

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
                <body className={inter.className}>{children}</body>
            </Providers>
        </html>
    );
}
