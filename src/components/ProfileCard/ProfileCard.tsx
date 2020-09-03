import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import OpenIcon from '@material-ui/icons/Launch';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { teamMember as teamMemberType } from '../Team/types';

interface Props {
    teamMember: teamMemberType;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        medium: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
        large: {
            width: theme.spacing(22),
            height: theme.spacing(22),
        },
        card: {
            maxWidth: 300,
            padding: 25,
        },
        black: {
            color: theme.palette.common.black,
        },
    })
);

export default function ProfileCard({ teamMember }: Props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Card className={classes.card}>
            <Grid
                spacing={2}
                container
                direction='column'
                alignItems='center'
                justify='center'
            >
                <Grid container direction='row' justify='flex-end'>
                    <Grid item>
                        <IconButton
                            size='small'
                            onClick={() => handleClickOpen()}
                            aria-label='open-dialog'
                        >
                            <OpenIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item>
                    <Avatar
                        className={classes.medium}
                        alt={teamMember.fullName}
                        src={teamMember.picturePath}
                    />
                </Grid>
                <Grid item>
                    <Typography align='center' variant='h5'>
                        {teamMember.fullName}
                    </Typography>
                </Grid>
                {teamMember.references && (
                    <Grid item container direction='row' justify='center'>
                        {teamMember.references.map((reference, index) => (
                            <Grid item key={index}>
                                <IconButton
                                    target='_blank'
                                    href={reference.link}
                                    color='primary'
                                    aria-label={reference.name}
                                >
                                    {reference.icon}
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>
            <Dialog maxWidth='xs' open={open} onClose={handleClose}>
                <Grid container direction='column' alignItems='center'>
                    <Grid item>
                        <DialogTitle>
                            <Typography align='center' variant='h4'>
                                {teamMember.fullName}
                            </Typography>
                        </DialogTitle>
                    </Grid>
                    <Grid item>
                        <DialogContent dividers>
                            <Grid
                                container
                                direction='column'
                                alignItems='center'
                                spacing={2}
                            >
                                <Grid item>
                                    <Avatar
                                        className={classes.large}
                                        alt={teamMember.fullName}
                                        src={teamMember.picturePath}
                                    />
                                </Grid>
                                <Grid item>
                                    <DialogContentText>
                                        {teamMember.description}
                                    </DialogContentText>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Grid>
                    <Grid item>
                        <DialogActions>
                            <Button
                                autoFocus
                                onClick={handleClose}
                                color='primary'
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </Grid>
                </Grid>
            </Dialog>
        </Card>
    );
}
