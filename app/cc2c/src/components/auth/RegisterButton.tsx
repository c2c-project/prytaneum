'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
    visible: boolean;
}

export function RegisterButton({ visible, ...restProps }: Props): JSX.Element | null {
    const router = useRouter();
    if (!visible) return null;

    return (
        <Link style={{ textDecoration: 'none' }} href='/auth/signup'>
            <Button variant='contained' color='primary' {...restProps}>
                Register
            </Button>
        </Link>
    );
}
