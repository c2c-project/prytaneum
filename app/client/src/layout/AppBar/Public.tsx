import * as React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LoginForm, RegisterForm } from '@local/features/accounts';
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';

import Title from './Title';

const useStyles = makeStyles((theme) => ({
    item: {
        marginRight: theme.spacing(1),
    },
}));

type TButtons = 'login' | 'register' | null;
export default function Public() {
    const classes = useStyles();
    const [type, setType] = React.useState<TButtons>(null);

    const handleClick = (btnType: NonNullable<TButtons>) => () => setType(btnType);
    const close = () => setType(null);

    return (
        <>
            <Title />
            <Button color='primary' variant='contained' className={classes.item} onClick={handleClick('login')}>
                Login
            </Button>
            <ResponsiveDialog open={type === 'login'} onClose={close}>
                <LoginForm onSuccess={close} />
            </ResponsiveDialog>
            <Button color='primary' variant='outlined' onClick={handleClick('register')}>
                Register
            </Button>
            <ResponsiveDialog open={type === 'register'} onClose={close}>
                <RegisterForm onSuccess={close} />
            </ResponsiveDialog>
        </>
    );
}
