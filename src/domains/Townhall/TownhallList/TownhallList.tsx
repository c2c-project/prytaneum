import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import clsx from 'clsx';

import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import { getTownhallList, Townhall } from '../api';

const useStyles = makeStyles((theme) => ({
    text: {
        fontWeight: theme.typography.fontWeightLight,
    },
    title: {
        fontSize: '25px',
    },
    avatar: {
        paddingRight: theme.spacing(3)
    },
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

export default function TownhallList() {
    const classes = useStyles();
    const [list, setList] = React.useState<Townhall[]>([]);
    const isMounted = React.useRef(true);
    const renderCount = React.useRef(0);
    const [sendRequest, isLoading] = useEndpoint(getTownhallList, {
        onSuccess: (results) => {
            if (isMounted.current) {
                setList(results.data.list);
            }
        },
    });

    React.useEffect(() => {
        renderCount.current += 1;
    });

    React.useEffect(() => {
        isMounted.current = true;
        sendRequest();
        return () => {
            isMounted.current = false;
        };
    }, []);
    if (renderCount.current < 1 || isLoading) {
        return <Loader />;
    }

    return (
        <List>
            {list.map((townhall) => {
                return (
                    <ListItem key={townhall._id} button divider>
                        <ListItemAvatar className={classes.avatar}>
                            <Avatar
                                className={classes.largeAvatar}
                                src={townhall.picture}
                            />
                        </ListItemAvatar>
                        {/* <ListItemText
                            primary={`${townhall.speaker} - ${townhall.topic}`}
                            secondary={format(townhall.date, 'MM/dd/yyyy p')}
                        /> */}
                        <ListItemText
                            primary={
                                <>
                                    <Typography
                                        className={clsx([
                                            classes.text,
                                            classes.title,
                                        ])}
                                    >
                                        {townhall.speaker}
                                    </Typography>
                                    <Typography className={classes.text}>
                                        {townhall.topic}
                                    </Typography>
                                </>
                            }
                            secondary={format(townhall.date, 'MM/dd/yyyy p')}
                            secondaryTypographyProps={{
                                className: classes.text,
                            }}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
}
