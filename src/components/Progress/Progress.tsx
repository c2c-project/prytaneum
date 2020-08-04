import React, { useLayoutEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginLeft: 'auto !important',
            marginRight: 'auto !important',
        },
    })
);

const muiTheme = createMuiTheme({
    overrides: {
        MuiSlider: {
            thumb: {
                color: '#0074BC',
            },
            track: {
                color: '#0074BC',
            },
            rail: {
                color: 'black',
            },
        },
    },
});

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
    progress: Townhall;
}

function valuetext(value: number) {
    return `${value}`;
}
function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export default function DiscreteSlider(props: Props) {
    const classes = useStyles();
    const { progress } = props;
    const [width, height] = useWindowSize();

    return (
        <ThemeProvider theme={muiTheme}>
            <div
                className={classes.root}
                style={{
                    width: width - 200,
                }}
            >
                <Slider
                    defaultValue={progress.defaultVal}
                    getAriaValueText={valuetext}
                    marks={progress.progressData}
                    disabled
                />
            </div>
        </ThemeProvider>
    );
}
