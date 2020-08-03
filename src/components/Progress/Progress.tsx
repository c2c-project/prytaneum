import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 300,
        },
        margin: {
            height: theme.spacing(10),
        },
    })
);

export interface TownhallForm {
    speaker?: string;
    moderator?: string;
    date?: Date;
    description?: string;
    url?: string;
    topic: string;
}

export type Townhall = Required<TownhallForm> & {
    _id: string;
    picture: string;
};

interface Props {
    townhall: Townhall;
}



function valuetext(value: number) {
    return `${value}`;
}

export default function DiscreteSlider(props: Props) {
    const classes = useStyles();
    const { townhall } = props;

    return (
        <div className={classes.root}>
            <Typography id='discrete-slider-custom' gutterBottom>
                Custom marks
            </Typography>
            <Slider
                getAriaValueText={valuetext}
                aria-labelledby='discrete-slider-custom'
                valueLabelDisplay='auto'
                marks={townhall}
                disabled
            />
        </div>
    );
}
