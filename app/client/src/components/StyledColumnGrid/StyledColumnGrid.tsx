import * as React from 'react';
import { Grid } from '@mui/material';
import type { GridProps } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

export interface StyledColumnGridProps {
    children: React.ReactNode;
    props?: GridProps;
}

export const StyledColumnGrid = ({ children, props }: StyledColumnGridProps) => {
    const theme = useTheme();
    return (
        <Grid
            {...props}
            width={props?.width ? props.width : '100%'}
            id='event-sidebar-bottom-tabs-scrollable'
            container
            justifyContent='center'
            sx={{
                border: 5,
                padding: 1,
                borderImage: `linear-gradient(${theme.palette.custom.creamCan},${alpha(
                    theme.palette.custom.creamCan,
                    0.06
                )}) 10`,
                backgroundColor: alpha(theme.palette.custom.creamCan, 0.06),
                overflowY: 'scroll',
                '::-webkit-scrollbar': {
                    backgroundColor: 'transparent',
                },
                '::-webkit-scrollbar-thumb': {
                    backgroundColor: '#D9D9D9',
                    backgroundOpacity: '0.3',
                    borderRadius: '20px',
                    border: '5px solid transparent',
                    backgroundClip: 'content-box',
                },
            }}
        >
            {children}
        </Grid>
    );
};
