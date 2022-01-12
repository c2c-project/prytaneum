import winston from 'winston';
const { combine, timestamp, errors, json } = winston.format;

export function buildProductionLogger() {
    const logger = winston.createLogger({
        level: 'http',
        format: combine(timestamp(), errors({ stack: true }), json()),
        defaultMeta: { service: 'Prytaneum Server' },
        transports: [new winston.transports.Console()],
        exceptionHandlers: [new winston.transports.Console()],
    });

    return logger;
}
