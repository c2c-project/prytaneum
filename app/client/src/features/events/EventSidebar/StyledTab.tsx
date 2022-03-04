/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import { Badge } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import ChipTab from '@local/components/ChipTab';

const useStyles = makeStyles((theme) => ({
    badge: {
        marginRight: -theme.spacing(0.5),
    },
    root: {
        margin: theme.spacing(1, 0),
    },
}));

export interface StyledTabProps {
    label: string;
    /**
     * tabs parent component passes this in
     */
    selected?: boolean;
    onClick: () => void;
    badgeContent?: number | boolean;
}

function StyledTab({ label, selected, onClick, badgeContent }: StyledTabProps) {
    const classes = useStyles();
    return (
        <Badge
            badgeContent={badgeContent}
            overlap='circular'
            color='secondary'
            classes={{ root: classes.root, badge: classes.badge }}
        >
            <ChipTab
                aria-selected={selected}
                aria-controls={`${label}-panel`}
                role='tab'
                label={label}
                // FIXME: had to remove this due to MUI v5 upgrade
                // selected={selected}
                value={label}
                onClick={onClick}
            />
        </Badge>
    );
}

StyledTab.defaultProps = {
    selected: false,
    value: undefined,
    badgeContent: 0,
};

// realistically, this should only ever update if the selected or badgeContent property has changed
// changes to onClick are ignored here because we don't need to care about those
// onClick should effectively do the same thing every render
export const MemoizedStyledTab = React.memo(
    StyledTab,
    (prevProps, nextProps) =>
        prevProps.selected === nextProps.selected && prevProps.badgeContent === nextProps.badgeContent
);
