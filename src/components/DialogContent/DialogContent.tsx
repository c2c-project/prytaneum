import React from 'react';
import { Container } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

interface RequiredProps {
    children: JSX.Element | JSX.Element[];
}

interface OptionalProps {
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

type Props = RequiredProps & OptionalProps;

export default function DialogContent({ children, maxWidth }: Props) {
    const theme = useTheme();
    return (
        <Container maxWidth={maxWidth} style={{ paddingTop: theme.spacing(2) }}>
            {children}
        </Container>
    );
}

DialogContent.defaultProps = {
    maxWidth: 'md',
};
