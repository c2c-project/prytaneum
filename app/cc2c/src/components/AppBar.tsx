'use client';

import React from 'react';
import Link from 'next/link';
import { SignInButton } from './SignInButton';

export function AppBar() {
    return (
        <header>
            <Link href='/'>Home</Link>
            <Link href='/dashboard'>Dashboard</Link>
            <SignInButton />
        </header>
    );
}
