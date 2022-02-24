import { Grid, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.grey[300],
        borderRadius: '7px',
        gap: theme.spacing(1)
    },
    button: {
        width: '100%',
        borderRadius: '7px',
    }
}));

interface Props {
    tabIndex: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (e: React.ChangeEvent<any>, newTabIndex: number) => void
    tabs: string[]
}

export const Tabs = ({ tabIndex, onChange, tabs }: Props) => {
    const classes = useStyles();
    return (
        <Grid className={classes.root}>
            { tabs.map((tabTitle: string, idx: number) =>
                <Button
                    key={tabTitle}
                    // conditionally styles the color/variant selected tab
                    color={idx === tabIndex ? 'primary' : 'inherit'}
                    variant={idx === tabIndex ? 'contained' : 'text'}
                    onClick={(e) => onChange(e, idx)}
                    className={classes.button}
                >
                    {tabTitle}
                </Button>
            )}
        </Grid>
    );
}