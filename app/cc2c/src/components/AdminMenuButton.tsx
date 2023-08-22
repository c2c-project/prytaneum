'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
    visible: boolean;
}

export function AdminMenuButton({ visible, ...restProps }: Props): JSX.Element | null {
    const router = useRouter();
    const handleNavigation = (href: string) => () => {
        router.push(href);
    };

    if (!visible) return null;
    return (
        <Button variant='contained' onClick={handleNavigation('/admin')} {...restProps}>
            Admin Menu
        </Button>
    );
}
