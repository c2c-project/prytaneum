import * as React from 'react';
import Image from 'next/image';
import { Grid, Link, Typography } from '@mui/material';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        minHeight: '85vh',
        paddingLeft: '1rem',
        scrollPaddingTop: '-10rem',
    },
    paragraph: {
        fontSize: '18px',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    centeredSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
    },
    icon: {
        fontSize: '2.25rem',
    },
}));

export default function ParticipantGuide() {
    const classes = useStyles();

    return (
        <Grid container alignItems='center' className={classes.root} justifyContent='center' spacing={4}>
            <Grid item xs={4} sm={3}>
                <Image
                    src='/static/prytaneum_logo.svg'
                    width={1107}
                    height={1108}
                    objectFit='contain'
                    alt='Prytaneum Logo'
                />
            </Grid>
            <Grid item xs={12} sm={9} className={classes.section}>
                <Typography variant='h3'>
                    <BookOutlinedIcon className={classes.icon} /> <b>Guide Title</b>
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    Guide sub header
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    This article covers:
                </Typography>
                <Link href='#'></Link>
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='h4' id=''>
                    Section A
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    Paragraph
                </Typography>
            </Grid>
        </Grid>
    );
}
