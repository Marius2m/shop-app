import { format, createLogger, transports } from "winston"

const { combine, colorize, timestamp, printf, errors, json } = format

const devLogFormat = combine(
    colorize(),
    timestamp({ format: 'DD HH:mm:ss' }),
    printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`)
)

const prodLogFormat = format.combine(
    timestamp(),
    errors({ stack: true }),
    json(),
)

export const logger = createLogger({
    format: process.env.SERVER_ENV === 'dev' ? devLogFormat : prodLogFormat,
    defaultMeta: { service: 'products-service' },
    transports: [
        new transports.Console(),
        new transports.File({
			level: 'info',
			filename: './logs/file.log',
            format: format.json(),
		}),
    ]
})