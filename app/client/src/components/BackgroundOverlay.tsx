import React from 'react';
import { Box } from '@mui/material';

interface BackgroundOverlayProps {
    children?: React.ReactNode;
    bgColor?: string;
}

const BackgroundOverlay = ({ children, bgColor = 'grey.100' }: BackgroundOverlayProps) => (
    <Box
        sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            bgcolor: bgColor,
        }}
    >
        {children}
    </Box>
);

export default BackgroundOverlay;
