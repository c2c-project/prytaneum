/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import { Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ChipTab from '@local/components/ChipTab';
import { Panes } from '../types';

const useStyles = makeStyles((theme) => ({
    badge: {
        marginRight: -theme.spacing(0.5),
    },
    root: {
        margin: theme.spacing(1, 0),
    },
}));

export interface Props {
    label: string;
    /**
     * tabs parent component passes this in
     */
    selected?: boolean;
    onClick: () => void;
    /**
     * tabs parent component inspects this, otherwise it doesn't matter
     */
    // eslint-disable-next-line react/no-unused-prop-types
    value?: Panes;
    badgeContent?: number | boolean;
}

function StyledTab({ label, selected, onClick, badgeContent }: Props) {
    const classes = useStyles();
    return (
        <Badge
            badgeContent={badgeContent}
            overlap='circle'
            color='secondary'
            classes={{ root: classes.root, badge: classes.badge }}
        >
            <ChipTab
                aria-selected={selected}
                aria-controls={`${label}-panel`}
                role='tab'
                label={label}
                selected={selected}
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
export default React.memo(StyledTab, (prevProps, nextProps) => {
    return prevProps.selected === nextProps.selected && prevProps.badgeContent === nextProps.badgeContent;
});
