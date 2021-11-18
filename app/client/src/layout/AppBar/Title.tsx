import * as React from 'react';
import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { useUser } from '@local/features/accounts';

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
    },
}));

export default function Title() {
    const classes = useStyles();
    const [user] = useUser();
    const router = useRouter();

    const handleNavigation = (path: string) => () => router.push(path);

    return (
        <div className={classes.titleContainer}>
            <div className={classes.title}>
                <Image
                    src='/static/prytaneum_logo.svg' 
                    width={97}
                    height={135}
                    objectFit='contain'
                    onClick={user ? handleNavigation('/app/home') : handleNavigation('/')}
                />
            </div>
        </div>
    );
}
