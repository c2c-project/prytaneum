import * as React from 'react';
import { Grid, Button, MobileStepper } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

interface Props {
    cards: React.ReactNode[];
}

export function Carousel({cards}: Props) {
    const [activeCard, setActiveCard] = React.useState(0);

    const handleNextRole = () => {
        setActiveCard((prevActiveCard) => prevActiveCard + 1);
    };
    const handleBackRole = () => {
        setActiveCard((prevActiveCard) => prevActiveCard - 1);
    };

    return (
        <Grid item xs={12}>
            {cards[activeCard]}
            <MobileStepper
                variant='dots'
                steps={cards.length}
                position='static'
                activeStep={activeCard}
                nextButton={
                    <Button size='small' onClick={handleNextRole} disabled={activeCard === cards.length-1}>
                        Next
                        <KeyboardArrowRightIcon />
                    </Button>
                }
                backButton={
                    <Button size='small' onClick={handleBackRole} disabled={activeCard === 0}>
                        <KeyboardArrowLeftIcon />
                        Back
                    </Button>
                }
            />
        </Grid>
    );
}
