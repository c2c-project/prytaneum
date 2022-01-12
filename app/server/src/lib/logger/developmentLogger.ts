import winston from 'winston';
const { combine, timestamp, printf, errors } = winston.format;

export function buildDevelopmentLogger() {
    const customFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} [${level}] ${stack || message}`;
    });

    const logger = winston.createLogger({
        level: 'debug',
        format: combine(
            winston.format.colorize(),
            timestamp({ format: 'HH:mm:ss' }),
            errors({ stack: true }),
            customFormat
        ),
        transports: [new winston.transports.Console()],
        exceptionHandlers: [new winston.transports.Console()],
    });

    return logger;
}
