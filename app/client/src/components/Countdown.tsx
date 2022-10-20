import Countdown from 'react-countdown'

const styles = {
  spaceBetween: {
    display: 'flex',
    justifyContent:'space-between'
  },
  inline: {
    display: 'inline-block',
  },
  textCenter: {
    textAlign: 'center' as 'center'
  }
}

interface TimeBlockProps {
  /** Decides when to show a particular time block (e.g. if 0 days are left, time blocks for days are hidden). */
  condition: boolean
  /** Number of seconds, minutes, hours, or days. */
  num: string
  /** Label for the time blocks (e.g. 'days', 'seconds'). */
  label: string
  /** Decides when to show a separator after a pair of time blocks. */
  separator?: boolean
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
      {condition &&
      <>
        <div>
          <div>
            { Array.from(num).map((n, idx) =>
              <div key={label+String(idx)} style={styles.inline}>{n}</div>
            )}
          </div>
          <p>{label}</p>
        </div>
        { separator && 
          <div> : </div> }
      </>}
    </>
  )
}

const CompletedComponent = () => (
  <div>
    <h2>Please wait for the organizers to start the event.</h2>
  </div>
)

const renderer = ({ days, hours, minutes, seconds, completed }: rendererProps) => {
  if (completed) {
    return <CompletedComponent />
  } 
  else {
    const numDays = days < 10 ? String(`0${days}`) : String(days)
    const numHours = hours < 10 ? String(`0${hours}`) : String(hours)
    const numMinutes = minutes < 10 ? String(`0${minutes}`) : String(minutes)
    const numSeconds = seconds < 10 ? String(`0${seconds}`) : String(seconds)

    return (
      <div style={styles.textCenter}>
        <h3>
          Event will start in
        </h3>
        <div style={styles.spaceBetween}>
          <TimeBlock
            condition={Boolean(days > 0)}
            num={numDays}
            label='days'
            separator
          />
          <TimeBlock
            condition={Boolean(days > 0 || hours > 0)}
            num={numHours}
            label='hours'
            separator
          />
          <TimeBlock
            condition={Boolean(days > 0 || hours > 0 || minutes > 0)}
            num={numMinutes}
            label='mins'
            separator
          />
          <TimeBlock
            condition={Boolean(days > 0 || hours > 0 || minutes > 0 || seconds > 0)}
            num={numSeconds}
            label='secs'
          />
        </div>
      </div>
    )
  }
}

export function CountdownWrapper({ date }: CountdownWrapperProps) {
  return (
    <h2>
      <Countdown date={date} renderer={renderer} />
    </h2>
  )
}