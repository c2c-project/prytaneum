'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
    visible: boolean;
}

export function SignOutButton({ visible, ...restProps }: Props): JSX.Element | null {
    if (!visible) return null;
    return (
        <Button
            variant='contained'
            color='primary'
            onClick={() => signOut({ callbackUrl: process.env.NEXT_PUBLIC_ORIGIN_URL || 'http://localhost:3000/' })}
            {...restProps}
        >
            Sign Out
        </Button>
    );
}
