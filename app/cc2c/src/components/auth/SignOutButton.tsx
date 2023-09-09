'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Props extends ButtonProps {
    visible: boolean;
}

export function SignOutButton({ visible, ...restProps }: Props): JSX.Element | null {
    if (!visible) return null;

    return (
        <Button variant='contained' color='primary' onClick={() => signOut()} {...restProps}>
            Sign Out
        </Button>
    );
}
