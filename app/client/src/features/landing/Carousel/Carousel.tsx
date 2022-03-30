import * as React from 'react';
import { Grid, Button, MobileStepper } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

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
