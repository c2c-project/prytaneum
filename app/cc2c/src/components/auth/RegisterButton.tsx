'use client';

import React from 'react';
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
        <Button variant='contained' color='primary' onClick={() => router.push('/auth/signup')} {...restProps}>
            Register
        </Button>
    );
}
