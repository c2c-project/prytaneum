import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        textAlign: 'center',
    },
    title: {
        fontSize: '25px',
    },
    paragraph: {
        fontSize: '18px',
    },
    roleicon: {
        '& > *': {
            fontSize: '5.5rem',
        }
    },
}));

interface Props {
    title?: string;
    icon?: React.ReactNode;
    paragraphs?: string[];
    titleColor?: string;
    paragraphsColor?: string;
}

export function Blurb({title, icon, paragraphs, titleColor, paragraphsColor}: Props) {
    const classes = useStyles();

    return (
        <Grid item xs={12} className={classes.section}>
            {
                title &&
                <Typography variant='h4' color={titleColor} className={classes.title}>
                    {title}
                </Typography>
            }
            {
                icon &&
                <div className={classes.roleicon}>
                    {icon}
                </div>
            }
            {
                paragraphs?.map((paragraph, index) =>
                    <Typography key={index} variant='body1' color={paragraphsColor} className={classes.paragraph}>
                        {paragraph}
                    </Typography>
                )
            }
        </Grid>
    );
}
