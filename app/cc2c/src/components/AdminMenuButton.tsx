import React from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
    visible: boolean;
}

export function AdminMenuButton({ visible, ...restProps }: Props): JSX.Element | null {
    if (!visible) return null;
    return (
        <Link style={{ textDecoration: 'none' }} href='/admin'>
            <Button variant='contained' {...restProps}>
                Admin Menu
            </Button>
        </Link>
    );
}
