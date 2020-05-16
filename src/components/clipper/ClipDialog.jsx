import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RangeSlider from './RangeSlider';
import FullScreenDialog from '../Dialoag';


export default function ClipDialog({
    currentClip,
    confirm,
    openState,
    edit,
    modeOff,
}) {

    const handleClose = () => {
        modeOff();
    };

    // case: editing the timeframe without the question.
    function handleClipTime(start, end) {
        edit({ ...currentClip, start, end });
    }

    // e is pre-defined event object to stop form from refreshing.
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
    const handleSubmit = e => {
        e.preventDefault();
        confirm();
        // }

        handleClose();
    };

    return (
        <div>
            <FullScreenDialog
                open={false || openState}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
            >
                {/* with a form tag you don't need to create onClick events for your buttons */}
                <form onSubmit={handleSubmit}>
                    <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Current Question:</DialogContentText>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='name'
                            label='edit question here'
                            type='text'
                            value={currentClip.question}
                            onChange={event => {
                                const question = event.target.value;
                                // console.log('Current event: '+event.target.value);
                                // setForm({ ...form, question });
                                edit({...currentClip, question});
                            }}
                            fullWidth
                        />
                        <RangeSlider
                            timeStamp={currentClip}
                            confirm={handleClipTime}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='primary'>
                            Cancel
                        </Button>
                        {/* no need for a onClick, a button inside a form tag will execute its onSubmit */}
                        <Button type='submit' color='primary'>
                            Confirm
                        </Button>
                    </DialogActions>
                </form>
            </FullScreenDialog>
        </div>
    );
}

// ClipDialog.defaultProps = {
//     currentClip: PropTypes.shape({
//         question: '',
//         start:2,
//         end: 23,
//     }),
// };

ClipDialog.propTypes = {
    currentClip: PropTypes.shape({
        question: PropTypes.string,
        start: PropTypes.number,
        end: PropTypes.number,
        category: PropTypes.shape({
            tag: PropTypes.string,
            color: PropTypes.string,
        }),
        link: PropTypes.shape({
            text: PropTypes.string
        })
    }).isRequired,
    confirm: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    openState: PropTypes.bool.isRequired,
    modeOff: PropTypes.func.isRequired,

};
