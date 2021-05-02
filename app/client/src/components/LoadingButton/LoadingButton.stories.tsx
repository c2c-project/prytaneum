import * as React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Component from './LoadingButton';

export default {
    title: '@local/components/Loading Button',
    component: Component,
};

export function LoadingButton() {
    const [loading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        const handle = setTimeout(() => {
            if (loading) {
                setIsLoading(false);
            }
        }, 1500);
        return () => clearTimeout(handle);
    }, [loading]);
    return (
        <Container maxWidth='md' style={{ height: '100%', width: '100%' }}>
            <Grid container style={{ paddingTop: '30vh' }} spacing={4}>
                <Grid item xs={12}>
                    <Component loading={loading}>
                        <Button
                            variant='contained'
                            onClick={() => setIsLoading(true)}
                            fullWidth
                        >
                            Interactive
                        </Button>
                    </Component>
                </Grid>
                <Grid item xs={12}>
                    <Component loading>
                        <Button variant='contained' fullWidth>
                            Perma Loading
                        </Button>
                    </Component>
                </Grid>
                <Grid item xs={12}>
                    <Component loading={false}>
                        <Button variant='contained' fullWidth>
                            No Loading
                        </Button>
                    </Component>
                </Grid>
            </Grid>
        </Container>
    );
}
