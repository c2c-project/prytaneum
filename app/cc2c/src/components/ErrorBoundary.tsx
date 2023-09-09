import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Grid, Button, Typography } from '@mui/material';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Grid container direction='column' alignItems='center'>
                    <Grid item>
                        <Typography variant='h3' marginY='3rem'>
                            An Error Occurred
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' onClick={() => window.location.reload()}>
                            Reload
                        </Button>
                    </Grid>
                </Grid>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
