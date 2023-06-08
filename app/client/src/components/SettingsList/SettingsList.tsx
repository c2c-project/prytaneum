import * as React from 'react';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Props {
    children: JSX.Element | JSX.Element[];
    className?: string;
}

export default function SettingsList({ children, className }: Props) {
    const theme = useTheme();

    return (
        <Grid container spacing={2} padding={theme.spacing(2)} className={className}>
            {React.Children.map(children, (child) => (
                <Grid item xs={12}>
                    {child}
                </Grid>
            ))}
        </Grid>
    );
}
