import fs from 'fs';
import path  from 'path';
import winston from 'winston';

// Create logger for request info
const requestLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'postaway project' },
    transports: [
        new winston.transports.File({ filename: path.resolve('src', 'public', 'info.log') })
    ]
});

// Create logger for errors
const errorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `{\n "level":"${level}",\n "timestamp":"${timestamp}",\n "message":"${message}"\n}`;
        })
    ),
    defaultMeta: { service: 'postaway project' },
    transports: [
        new winston.transports.File({ filename: path.resolve('src', 'public', 'error.log') })
    ]
});

// Logger middleware for logging request details requestLoggingMiddleware
const requestLoggingMiddleware = async (req, res, next) => {
    const data = `Time: ${new Date().toString()}, req Body: ${JSON.stringify(req.body)} from req URL: ${req.url}`;
    requestLogger.info(data);
    next();
};

// Error logging middleware
const errorLoggingMiddleware = (err, req, res, next) => {
    const errorMessage = `, Error Message: ${err.message}, Req URL: ${req.originalUrl}`;
    errorLogger.error(errorMessage);
    next(err); // Pass the error to the next middleware
};

export { requestLoggingMiddleware, errorLoggingMiddleware };
