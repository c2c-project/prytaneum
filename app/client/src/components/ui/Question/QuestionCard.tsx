import React from 'react';
import { Card, CardProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface QuestionCardProps extends CardProps {
    children: React.ReactNode | React.ReactNode[] | null;
}

export function QuestionCard({ children, ...restProps }: QuestionCardProps) {
    const theme = useTheme();
    return (
        <Card
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                paddingTop: theme.spacing(0.5),
                borderRadius: '10px',
            }}
            {...restProps}
        >
            {children}
        </Card>
    );
}
