import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import INTERNAL_LOGIN from './Login';
import INTERNAL_FORGOT_PASS_REQUEST from './ForgotPassRequest';
import API from '../../utils/API';

export default { title: 'Auth' };

export function Login() {
    const [status, setStatus] = React.useState(200);
    API.mock = true;
    API.resolve = true;
    API.resolveWith = { status };
    const statusMap = {
        200: 'Succeed',
        400: 'Fail',
    };
    return (
        <>
            <Grid container spacing={1} alignItems='center'>
                <Grid item xs='auto'>
                    <Button
                        onClick={() => setStatus(200)}
                        disabled={status === 200}
                        variant='contained'
                    >
                        Succeed
                    </Button>
                </Grid>
                <Grid item xs='auto'>
                    <Button
                        onClick={() => setStatus(400)}
                        disabled={status === 400}
                        variant='contained'
                    >
                        Fail
                    </Button>
                </Grid>
                <Grid item xs='auto'>
                    <Typography>
                        {`Submission will currently: ${statusMap[status]}`}
                    </Typography>
                </Grid>
            </Grid>
            <INTERNAL_LOGIN />
        </>
    );
}

export function ForgotPassRequest() {
    const [status, setStatus] = React.useState({
        status: 200,
        statusText: 'Ok',
    });
    API.mock = true;
    API.resolve = true;
    API.resolveWith = status;
    const statusMap = {
        200: 'Succeed',
        400: 'Fail',
    };
    return (
        <>
            <Grid container spacing={1} alignItems='center'>
                <Grid item xs='auto'>
                    <Button
                        onClick={() =>
                            setStatus({ status: 200, statusText: 'Ok' })
                        }
                        disabled={status.status === 200}
                        variant='contained'
                    >
                        Succeed
                    </Button>
                </Grid>
                <Grid item xs='auto'>
                    <Button
                        onClick={() =>
                            setStatus({
                                status: 400,
                                statusText: 'Bad Request',
                            })
                        }
                        disabled={status.status === 400}
                        variant='contained'
                    >
                        Fail
                    </Button>
                </Grid>
                <Grid item xs='auto'>
                    <Typography>
                        {`Submission will currently: ${
                            statusMap[status.status]
                        }`}
                    </Typography>
                </Grid>
            </Grid>
            <INTERNAL_FORGOT_PASS_REQUEST />
        </>
    );
}
