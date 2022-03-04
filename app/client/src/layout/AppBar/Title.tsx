import * as React from 'react';
import Image from 'next/image';
import makeStyles from '@mui/styles/makeStyles';
// import { useRouter } from 'next/router';
// import { useUser } from '@local/features/accounts';


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
        marginRight: '15px'
    },
}));

export default function Title() {
    const classes = useStyles();
    // const [user] = useUser();
    // const router = useRouter();

    // const handleNavigation = (path: string) => () => router.push(path);

    return (
        <div className={classes.titleContainer}>
            <div className={classes.title}>
                <Image
                    src='/static/prytaneum_logo.svg' 
                    alt='Prytaneum Logo'
                    width={97}
                    height={135}
                    objectFit='contain'
                    // onClick={user ? handleNavigation('/app/home') : handleNavigation('/')}
                />
            </div>
        </div>
    );
}
