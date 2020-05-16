import React from 'react';
import Grid from '@material-ui/core/Grid';
import Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Lane from './Lane';

const useStyles = makeStyles(theme => ({
    lane: {
        padding: `0 ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`
    },
    root: {
        height: '100%',
        width: '100%'
    }
}));

export default function ModDashboard() {
    const [lanes, setLanes] = React.useState(['New']);
    const { roomId } = useParams();
    const [inputLane, setInputLane] = React.useState(false);
    const ref = React.useRef();
    React.useEffect(() => {
        if (inputLane) {
            ref.current.focus();
        }
    }, [inputLane]);
    // const Lanes = ['New', 'Would Ask', 'Inappropriate', 'Off Topic', 'Asked'];

    const classes = useStyles();
    return (
        <DndProvider backend={Backend}>
            <Grid container className={classes.root}>
                {lanes.map(el => (
                    <Grid item xs={12} md={3} key={el} className={classes.lane}>
                        <Lane title={el} roomId={roomId} />
                    </Grid>
                ))}
                {!inputLane && (
                    <Grid item xs={12} md={3} className={classes.lane}>
                        <Button
                            fullWidth
                            variant='contained'
                            onClick={() => setInputLane(true)}
                        >
                            <AddIcon />
                            Add Lane
                        </Button>
                    </Grid>
                )}
                {inputLane && (
                    <Grid item xs={12} md={3} className={classes.lane}>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                const title = e.target.title.value;
                                setInputLane(false);
                                setLanes(current => [...current, title]);
                            }}
                        >
                            <TextField
                                fullWidth
                                inputRef={ref}
                                id='title'
                                label='Lane Title'
                                autoComplete='off'
                                variant='outlined'
                            />
                            <Grid container justify='flex-end'>
                                <Button onClick={() => setInputLane(false)}>
                                    Cancel
                                </Button>
                                <Button type='submit'>Add</Button>
                            </Grid>
                        </form>
                    </Grid>
                )}
            </Grid>
        </DndProvider>
    );
}
