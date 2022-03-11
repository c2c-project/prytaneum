import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },

    title: {
        fontSize: '25px',
    },
    text: {
        fontWeight: theme.typography.fontWeightLight,
    },
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export interface Bill {
    name: string;
    summaryText: string;
}
interface Props {
    bill: Bill;
}

export default function BillSummary(props: Props) {
    const classes = useStyles();
    const { bill } = props;
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card className={classes.root} elevation={0}>
            <CardHeader
                title={
                    <>
                        <Typography className={clsx([classes.text, classes.title])}>{bill.name}</Typography>
                    </>
                }
                subheaderTypographyProps={{ className: classes.text }}
                action={<></>}
            />

            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                    size='large'
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <Typography paragraph>{bill.summaryText}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
