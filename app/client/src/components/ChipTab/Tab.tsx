import * as React from 'react';
import { Tab as MUITab, TabProps, Theme } from '@mui/material';
import { lighten, darken } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

interface Props {
    variant?: 'secondary' | 'primary';
}

const useStyles = makeStyles<Theme, Props>((theme) => ({
    root: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.pxToRem(13),
        height: 32, // material io spec for chips
        marginRight: theme.spacing(1),
        backgroundColor: theme.palette.grey[300],
        borderRadius: 24, // chip spec?
        border: '1px solid grey',
        minWidth: 'unset',
        minHeight: 'unset',
        '&.Mui-selected': {
            transition: 'background-color 300ms ease-in-out',
        },
    },
    selected: ({ variant }) => {
        if (variant === 'secondary')
            return {
                backgroundColor: lighten(theme.palette.primary.main, 0.7),
                color: darken(theme.palette.primary.main, 0.9),
            };
        return {
            backgroundColor: lighten(theme.palette.primary.main, 0.65),
            color: theme.palette.primary.main,
        };
    },
}));

function Tab(props: TabProps & Props) {
    const { variant, ...rest } = props;
    const classes = useStyles({ variant });
    return <MUITab {...rest} classes={classes} />;
}

Tab.defaultProps = {
    variant: 'primary',
};

export default Tab;
