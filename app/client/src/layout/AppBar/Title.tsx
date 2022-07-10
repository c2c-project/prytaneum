/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
    titleContainer: {
        flexGrow: 1,
        display: 'flex',
    },
    title: {
        flexShrink: 1,
        flexGrow: 0,
        width: 25,
        cursor: 'pointer',
        marginRight: '15px',
    },
    logo: {
        width: 50,
        height: 50,
        padding: 4,
        objectFit: 'contain',
    },
}));

export default function Title() {
    const classes = useStyles();
    // const router = useRouter();

    return (
        <div className={classes.titleContainer}>
            <div className={classes.title}>
                <img
                    data-test-id='prytaneum-title-logo'
                    src='/static/prytaneum_logo.svg'
                    alt='Prytaneum Logo'
                    className={classes.logo}
                    // onClick={() => router.push('/')}
                />
            </div>
        </div>
    );
}
