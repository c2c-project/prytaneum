import winston from 'winston';
const { combine, timestamp, printf } = winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`
})

export default function developmentLogger() {
    return winston.createLogger({
        level: 'debug',
        format: combine(winston.format.colorize(), timestamp({ format: 'HH:mm:ss' }), customFormat),
        defaultMeta: { service: 'Prytaneum Server' },
        transports: [new winston.transports.Console()],
    });
}
