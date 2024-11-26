import { createLogger, format, transports } from 'winston';
import path from 'path';

// Define the log directory
const logDirectory = 'c:/logs/dockersample';

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message, stack }) => {
            return `${timestamp} ${level}: ${stack || message}`;
        })
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),
        new transports.File({ filename: path.join(logDirectory, 'combined.log') })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

export default logger;