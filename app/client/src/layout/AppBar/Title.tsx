import * as React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { useUser } from '@local/hooks/useUser';

// function formatTitle(str: string | undefined): string | undefined {
//     if (!str) {
//         return str;
//     }
//     return str
//         .split('-')
//         .map((word) => {
//             return word.slice(0, 1).toUpperCase() + word.slice(1);
//         })
//         .join(' ');
// }

const useStyles = makeStyles(() => ({
    titleContainer: {
        flexGrow: 1,
        display: 'flex',
    },
    title: {
        flexShrink: 1,
        flexGrow: 0,
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
                <Typography align='left' variant='h6' noWrap onClick={user && handleNavigation('/app/home')}>
                    Prytaneum
                </Typography>
            </div>
        </div>
    );
}
