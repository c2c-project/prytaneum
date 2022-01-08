import winston from 'winston';
const { combine, timestamp, printf } = winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`
})

export default function productionLogger(): winston.Logger {
    return winston.createLogger({
        level: 'http',
        format: combine(timestamp(), customFormat),
        defaultMeta: { service: 'Prytaneum Server' },
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: 'prytaneumServer.log' })
        ],
      });
}
