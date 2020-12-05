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
    Grid,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';

import { formatDate } from 'utils/format';

export interface QuestionProps {
    children: React.ReactNode | React.ReactNodeArray;
    user: string;
    timestamp: string | Date;
    actions?: JSX.Element | false;
    onClickMore?: (e: React.MouseEvent) => void;
    compact?: boolean;
    className?: string;
}

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 0,
    },
    cardActions: {
        padding: 0,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    card: {
        borderRadius: theme.spacing(1.5),
    },
}));

// TODO: maybe do something like if it's >24 hours ago it displays the full date? otherwise use formatdistancetonow
function QuestionFeedItem(props: QuestionProps) {
    const {
        children,
        user,
        timestamp,
        actions,
        onClickMore,
        compact,
        className,
    } = props;
    const classes = useStyles(); // NOTE: probably will get a perf boost if I remove this somehow

    const [time, month] = React.useMemo(
        () => formatDate(timestamp, 'p-P').split('-'),
        [timestamp]
    );
    const subheader = React.useMemo(
        () =>
            compact ? (
                <Typography variant='caption' color='textSecondary'>
                    {time}
                    &nbsp; &middot; &nbsp;
                    {month}
                </Typography>
            ) : undefined,
        [compact, time, month]
    );

    const action = React.useMemo(
        () =>
            onClickMore ? (
                <IconButton onClick={onClickMore}>
                    <MoreVertIcon />
                </IconButton>
            ) : undefined,
        [onClickMore]
    );
    const avatar = React.useMemo(
        () => (compact ? <Avatar>{user[0]}</Avatar> : undefined),
        [compact, user]
    );

    return (
        <Grid item xs={12} className={className}>
            <Card classes={{ root: classes.card }} elevation={10}>
                <CardHeader
                    classes={{ root: classes.cardHeader }}
                    avatar={avatar}
                    title={user}
                    titleTypographyProps={{
                        variant: 'subtitle2',
                    }}
                    subheader={subheader}
                    action={action}
                />
                <CardContent>{children}</CardContent>
                {!compact && actions && (
                    <CardActions classes={{ root: classes.cardActions }}>
                        {actions}
                    </CardActions>
                )}
            </Card>
        </Grid>
    );
}

QuestionFeedItem.defaultProps = {
    onClickMore: undefined,
    compact: false,
    actions: undefined,
    className: undefined,
};

QuestionFeedItem.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    user: PropTypes.string.isRequired,
    timestamp: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string,
    ]).isRequired,
    actions: PropTypes.node,
    onClickMore: PropTypes.func,
    compact: PropTypes.bool,
    className: PropTypes.string,
};

export default React.memo(QuestionFeedItem);
