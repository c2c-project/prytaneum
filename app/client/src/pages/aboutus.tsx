import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        padding: theme.spacing(3),
    },
}));

const AboutUs = () => {
    const classes = useStyles();
    return (
        <Grid className={classes.root} container direction='column' justify='center' alignItems='center' spacing={3}>
            <Grid item>
                <Typography variant='h1'>About Us</Typography>
            </Grid>
            <Grid item>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultricies pulvinar eros, in
                    tincidunt arcu rutrum id. Pellentesque ac elit at felis efficitur ullamcorper pretium vel est.
                    Mauris ac velit hendrerit, rutrum lectus eget, aliquet metus. Donec venenatis dolor quis arcu
                    fermentum blandit. Maecenas finibus ac nibh et ultrices. Praesent non mattis odio, ac cursus turpis.
                    Cras euismod quam eu leo euismod, id semper felis aliquam. Fusce vulputate pretium dui id faucibus.
                    Mauris tristique nibh ut leo rhoncus sodales. Nam posuere lectus quis augue volutpat, at interdum
                    orci malesuada. Aenean cursus nisi eu pharetra condimentum. Phasellus vitae urna et ex gravida
                    eleifend.
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    Fusce condimentum, orci in accumsan pulvinar, elit tellus sollicitudin eros, eu finibus dui nunc
                    eget justo. Phasellus tincidunt nibh facilisis, tincidunt est eu, ultricies metus. Vivamus eget
                    augue id odio condimentum aliquet ut a lacus. Nulla ultrices metus placerat magna varius volutpat.
                    Praesent pretium nisi vel faucibus placerat. Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia curae; Quisque at lobortis tellus. Sed aliquet tortor justo, feugiat
                    accumsan sem aliquam at. Vestibulum ac orci odio. Vivamus placerat suscipit euismod. Sed lacinia,
                    ante ut ornare ultricies, erat turpis finibus ligula, nec consectetur lectus turpis eu nunc. Nullam
                    et facilisis urna. Praesent placerat lectus ac fermentum tincidunt. Nulla molestie suscipit lectus,
                    eget maximus dolor tincidunt ut. Aenean sollicitudin varius laoreet. Fusce aliquet non nibh
                    convallis venenatis.
                </Typography>
            </Grid>
        </Grid>
    );
};

export default AboutUs;
