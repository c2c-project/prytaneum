import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Avatar,
    IconButton,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { formatDate } from 'utils/format';

export interface QuestionProps {
    children: JSX.Element | string;
    user: string;
    timestamp: string;
    actionBar?: JSX.Element;
    onClickMore?: (e: React.MouseEvent) => void;
    compact?: boolean;
}

const useStyles = makeStyles<Theme, Pick<QuestionProps, 'compact'>>(() => ({
    cardHeader: ({ compact }) => ({
        display: 'flex',
        alignItems: 'center',
        paddingBottom: compact ? 0 : 16,
    }),
}));

export default function QuestionFeedItem(props: QuestionProps) {
    const {
        children,
        user,
        timestamp,
        actionBar,
        onClickMore,
        compact,
    } = props;
    const date = React.useMemo(() => formatDate(timestamp, 'p-P'), [timestamp]);
    const [time, month] = date.split('-');
    const classes = useStyles({ compact });
    return (
        <Card>
            <CardHeader
                classes={{ root: classes.cardHeader }}
                avatar={!compact && <Avatar>{user[0]}</Avatar>}
                title={user}
                titleTypographyProps={{
                    variant: 'subtitle2',
                }}
                subheader={
                    !compact && (
                        <Typography variant='caption' color='textSecondary'>
                            {time}
                            &nbsp; &middot; &nbsp;
                            {month}
                        </Typography>
                    )
                }
                action={
                    onClickMore && (
                        <IconButton onClick={onClickMore}>
                            <MoreVertIcon />
                        </IconButton>
                    )
                }
            />
            <CardContent>
                <Typography>{children}</Typography>
            </CardContent>
            {!compact && actionBar && <CardActions>{actionBar}</CardActions>}
        </Card>
    );
}

QuestionFeedItem.defaultProps = {
    onClickMore: undefined,
    compact: false,
    actionBar: undefined,
};

QuestionFeedItem.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    user: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    actionBar: PropTypes.node,
    onClickMore: PropTypes.func,
    compact: PropTypes.bool,
};
