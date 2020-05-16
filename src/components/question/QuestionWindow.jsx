import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FilterList from '@material-ui/icons/FilterList';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import useQuestions from '../../hooks/useQuestions';
import Questions from './Questions';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        flex: 1,
        height: '100%'
    },
    divider: {
        margin: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px 0`
    },
    chatbar: {
        flexBasis: 0
    },
    messages: {
        flexBasis: 0,
        overflowY: 'scroll',
        flexGrow: 1
    }
}));

export function QuestionWindow({ roomId, title }) {
    const [questions, , currentQuestion] = useQuestions(roomId);
    const classes = useStyles();
    const [showFilter, setShowFilter] = React.useState(false);
    const [sortBy, setSortBy] = React.useState('clusterNumber');

    const handleClickFilterIcon = () => {
        setShowFilter(!showFilter);
    };

    const [filter, setFilter] = React.useState({
        asked: true,
        toxicity: true,
    });

    const [showsUserName, setShowUserName] = React.useState(true)
    
    const filterQuestions = () => {
        let questionList = questions.map(question => ({
            ...question,
            message: question.question
        }))
        Object.entries(filter).forEach(entry => {
            const key = entry[0];
            const value = entry[1];
            if(value === false) {
                questionList = questionList.filter(question => {
                    return question[key] === false
                })
            }
        });
        return questionList
    }

    const handleChange = event => {
        setFilter({ ...filter, [event.target.name]: event.target.checked });
    };

    return (
        <Paper className={classes.paper}>
            <Grid container direction='column' spacing={2}>
                <Grid container direction='row' spacing={2} justify='center'>
                    <Grid item xs={5}>
                        <Typography variant='h4'>{title}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton
                            onClick={handleClickFilterIcon} 
                        >
                            <Tooltip 
                                title={showFilter? 'Close Filter': 'Show Filter'}
                                placement='top'
                                TransitionComponent={Zoom}
                            >
                                <FilterList />
                            </Tooltip>
                        </IconButton>
                        <Collapse
                            in={showFilter}
                        >
                            <FormControl component='fieldset' className={classes.formControl}>
                                <FormLabel component='legend'>Filter Question List</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={filter.asked} onChange={handleChange} name='asked' />}
                                        label='Asked Questions'
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={filter.toxicity} onChange={handleChange} name='toxicity' />}
                                        label='Toxic Questions'
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={showsUserName} onChange={(e) => setShowUserName(e.target.checked)} />}
                                        label='Show User Name'
                                    />
                                </FormGroup>
                            </FormControl>
                        </Collapse>
                    </Grid>
                    <Grid item xs={3}>
                        <InputLabel>Sort by</InputLabel>
                        <Select
                            native
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            inputProps={{
                                name: 'Sort by',
                                id: 'sort-by',
                            }}
                        >
                            <option value='clusterNumber'>cluster number</option>
                            <option value='time: low to high'>time: late to current</option>
                            <option value='time: high to low'>time: current to late</option>
                        </Select>
                    </Grid>
                </Grid>
                
                <Divider className={classes.divider} />
                <Grid item xs={12} className={classes.messages}>
                    <Questions
                        messages={filterQuestions()}
                        variant='questions'
                        currentQuestion={currentQuestion}
                        showsUserName={showsUserName}
                        sortBy={sortBy}
                    />
                </Grid>
                {/* <Divider className={classes.divider} /> */}
                {/* <Grid item xs={12} className={classes.chatbar}>
                    <Chatbar onMessageSend={sendMsg} />
                </Grid> */}
            </Grid>
        </Paper>
    );
}

QuestionWindow.propTypes = {
    roomId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default QuestionWindow;