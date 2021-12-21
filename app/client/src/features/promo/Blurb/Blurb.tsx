import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        textAlign: 'center',
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
}

export function Blurb({title, icon, paragraphs}: Props) {
    const classes = useStyles();

    return (
        <Grid item xs={12} className={classes.section}>
            {
                title &&
                <Typography variant='h4'>
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
                paragraphs?.map((paragraph) =>
                    <Typography variant='body1' className={classes.paragraph}>
                        {paragraph}
                    </Typography>
                )
            }
        </Grid>
    );
}