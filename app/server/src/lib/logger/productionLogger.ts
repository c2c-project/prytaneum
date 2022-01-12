import winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';
const { combine, timestamp, errors, json } = winston.format;

const loggingWinston = new LoggingWinston();

export function buildProductionLogger() {
    const logger = winston.createLogger({
        level: 'info',
        format: combine(timestamp(), errors({ stack: true }), json()),
        defaultMeta: { service: 'Prytaneum Server' },
        transports: [new winston.transports.Console(), loggingWinston],
        exceptionHandlers: [new winston.transports.Console()],
    });

    return logger;
}
