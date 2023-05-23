import { useRouter } from 'next/router';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
    title: string;
    description: string;
    bulletPoints: string[];
    button: boolean;
}

const useStyles = makeStyles(() => ({
    featuresBar: {
        height: 40,
        width: '109%',
        marginTop: 14,
        marginLeft: -16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D2A94280',
    },
    contain: {
        objectFit: 'contain',
    },
}));

export default function MobileRoleCard(props: Props) {
    const router = useRouter();
    const classes = useStyles();
    const bulletPoints = props.bulletPoints.map((value, idx) => (
        <ListItem key={idx} sx={{ display: 'list-item', marginBottom: -2 }}>
            <ListItemText primary={value} primaryTypographyProps={{ fontSize: 15 }} />
        </ListItem>
    ));

    return (
        <Accordion square={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon htmlColor='white' />} style={{ backgroundColor: '#F5C64F' }}>
                <img
                    className={classes.contain}
                    alt={`${props.title} Icon`}
                    src={`/static/${props.title.toLowerCase()}_icon.svg`}
                    width={31}
                    height={31}
                />
                <Typography color='white' variant='h4' fontSize='25px' marginLeft={3}>
                    {props.title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: '#F5C64F80' }}>
                <Typography fontSize='15px' align='center'>
                    {props.description}
                </Typography>
                <Grid item className={classes.featuresBar}>
                    <Typography variant='h4' color='white' fontSize={20}>
                        Features
                    </Typography>
                </Grid>
                <List disablePadding={true} sx={{ listStyleType: 'disc', marginTop: 1, marginLeft: 5 }}>
                    {bulletPoints}
                </List>
                {props.button && (
                    <Grid
                        item
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        marginTop={3}
                        marginBottom={2}
                    >
                        <Button
                            size='medium'
                            style={{ backgroundColor: '#886816', color: 'white' }}
                            onClick={() => router.push(`/guides/${props.title.toLowerCase()}`)}
                        >
                            {props.title} Guide
                        </Button>
                    </Grid>
                )}
            </AccordionDetails>
        </Accordion>
    );
}
