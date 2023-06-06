/* eslint-disable react/prop-types */
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { Tabs } from '@mui/material';
import type { TabsProps } from '@mui/material';

interface StyledTabsProps {
    children: React.ReactNode;
    props?: TabsProps;
    theme: Theme;
    value: string;
}

export const StyledTabs = ({ children, props, theme, value }: StyledTabsProps) => (
    <Tabs
        sx={{
            '& .MuiTabs-indicator': { backgroundColor: 'custom.creamCan' },
            '& .MuiTab-root': {
                color: 'white',
                backgroundColor: alpha(theme.palette.custom.darkCreamCan, 0.25),
                borderRadius: '20px 20px 0 0',
            },
            '& .Mui-selected': { color: 'white !important', backgroundColor: 'custom.creamCan' },
        }}
        value={value}
        centered
        {...props}
    >
        {children}
    </Tabs>
);
