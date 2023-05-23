import Countdown from 'react-countdown';
import { Typography } from '@mui/material';

const styles = {
    spaceEvenly: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    inline: {
        display: 'inline-block',
    },
    textCenter: {
        textAlign: 'center' as 'center',
    },
};

interface TimeBlockProps {
    /** Decides when to show a particular time block (e.g. if 0 days are left, time blocks for days are hidden). */
    condition: boolean;
    /** Number of seconds, minutes, hours, or days. */
    num: string;
    /** Label for the time blocks (e.g. 'days', 'seconds'). */
    label: string;
    /** Decides when to show a separator after a pair of time blocks. */
    separator?: boolean;
}

export interface rendererProps {
    /** Start date & time of the event */
    days: Date | string | number;
    hours: Date | string | number;
    minutes: Date | string | number;
    seconds: Date | string | number;
    completed: boolean;
}

export interface CountdownWrapperProps {
    date: Date | string;
}

/** Blocks representing a unit of time in XX format. */
function TimeBlock({ condition, num, label, separator }: TimeBlockProps) {
    return (
        <>
            {condition && (
                <>
                    <div>
                        <Typography variant='subtitle2'>{label}</Typography>
                        <div>
                            {Array.from(num).map((n, idx) => (
                                <Typography variant='h3' key={label + String(idx)} style={styles.inline}>
                                    {n}
                                </Typography>
                            ))}
                        </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>{separator && <Typography variant='h3'> : </Typography>}</div>
                </>
            )}
        </>
    );
}

const CompletedComponent = () => (
    <div>
        <Typography variant='h5'>Please wait for the organizers to start the event.</Typography>
    </div>
);

const renderer = ({ days, hours, minutes, seconds, completed }: rendererProps) => {
    if (completed) {
        return <CompletedComponent />;
    } else {
        const numDays = days < 10 ? String(`0${days}`) : String(days);
        const numHours = hours < 10 ? String(`0${hours}`) : String(hours);
        const numMinutes = minutes < 10 ? String(`0${minutes}`) : String(minutes);
        const numSeconds = seconds < 10 ? String(`0${seconds}`) : String(seconds);

        return (
            <div style={styles.textCenter}>
                <Typography variant='h6'>Event Countdown</Typography>
                <div style={styles.spaceEvenly}>
                    <TimeBlock condition={true} num={numDays} label='days' separator />
                    <TimeBlock condition={true} num={numHours} label='hours' separator />
                    <TimeBlock condition={true} num={numMinutes} label='mins' separator />
                    <TimeBlock condition={true} num={numSeconds} label='secs' />
                </div>
            </div>
        );
    }
};

export function CountdownWrapper({ date }: CountdownWrapperProps) {
    return (
        <h2>
            <Countdown date={date} renderer={renderer} />
        </h2>
    );
}
