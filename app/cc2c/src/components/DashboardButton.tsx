import React from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
    visible: boolean;
}

export function DashboardButton({ visible, ...restProps }: Props): JSX.Element | null {
    if (!visible) return null;
    return (
        <Link style={{ textDecoration: 'none' }} href='/dashboard'>
            <Button variant='contained' {...restProps}>
                Dashboard
            </Button>
        </Link>
    );
}
