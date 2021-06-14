import * as React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import OpenIcon from '@material-ui/icons/Launch';
import ResponsiveDialog from '@local/components/ResponsiveDialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import GithubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ResumeIcon from '@material-ui/icons/Description';
import PersonalWebsiteIcon from '@material-ui/icons/Web';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import OtherIcon from '@material-ui/icons/PermContactCalendar';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { formatDate } from '@local/utils/format';
import { TeamMember, ReferenceNames } from 'types';

const IconFactory = (IconName: ReferenceNames): JSX.Element => {
    switch (IconName) {
        case 'Github':
            return <GithubIcon />;
        case 'LinkedIn':
            return <LinkedInIcon />;
        case 'resume':
            return <ResumeIcon />;
        case 'personalWebsite':
            return <PersonalWebsiteIcon />;
        case 'email':
            return <EmailIcon />;
        case 'phone':
            return <PhoneIcon />;
        default:
            return <OtherIcon />;
    }
};

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
            maxHeight: 400,
            minHeight: 400,
        },
        black: {
            color: theme.palette.common.black,
        },
        center: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
        },
        paddingTop: {
            paddingTop: 30,
        },
    })
);

interface Props {
    teamMember: TeamMember;
}
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
            <Grid spacing={2} container direction='column' alignItems='center' justify='center'>
                <Grid container item justify='flex-end'>
                    <IconButton size='small' onClick={handleClickOpen} aria-label='open-dialog' color='primary'>
                        <OpenIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Avatar className={classes.medium} alt={teamMember.fullName} src={teamMember.picturePath} />
                </Grid>
                <Grid item>
                    <Typography align='center' variant='h5'>
                        {teamMember.fullName}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography align='center' variant='h6' color='textSecondary'>
                        {teamMember.subtitle}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography align='center' variant='h6' color='textSecondary'>
                        {`${formatDate(teamMember.startDate)} - ${formatDate(teamMember.endDate)}`}
                    </Typography>
                </Grid>
                <Grid item container justify='center'>
                    {teamMember.references &&
                        teamMember.references.map((reference, index) => (
                            <Grid item key={index}>
                                <IconButton
                                    target='_blank'
                                    href={reference.link}
                                    color='primary'
                                    aria-label={reference.name}
                                >
                                    {IconFactory(reference.name)}
                                </IconButton>
                            </Grid>
                        ))}
                </Grid>
            </Grid>
            <ResponsiveDialog open={open} onClose={handleClose}>
                <Typography
                    // id='profile-card-dialog-title'
                    align='center'
                    variant='h4'
                    className={classes.paddingTop}
                    style={{ padding: 30 }}
                >
                    {teamMember.fullName}
                </Typography>
                <DialogContent>
                    <div className={classes.center}>
                        <Avatar className={classes.large} alt={teamMember.fullName} src={teamMember.picturePath} />
                    </div>
                    <DialogContentText className={classes.paddingTop}>{teamMember.description}</DialogContentText>
                </DialogContent>
            </ResponsiveDialog>
        </Card>
    );
}
