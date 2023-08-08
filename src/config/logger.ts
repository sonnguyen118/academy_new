import * as winston from 'winston';
// import config from "./index";
import 'winston-daily-rotate-file';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'debug' : 'info',
  levels: {
    error: 0,
    warn: 1,
    debug: 2,
    info: 3,
    http: 4,
    verbose: 5,
    silly: 6,
  },
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.NODE_ENV === 'development'
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`),
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'error-%DATE%.log',
      zippedArchive: false,
      maxFiles: '30d',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
    }),
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'debug-%DATE%.log',
      zippedArchive: false,
      maxFiles: '30d',
      datePattern: 'YYYY-MM-DD',
      level: 'debug',
    }),
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'info-%DATE%.log',
      zippedArchive: false,
      maxFiles: '30d',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
    }),
    new winston.transports.Console({
      stderrLevels: ['error', 'debug', 'info'],
    }),
  ],
  exceptionHandlers: [
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'exception-%DATE%.log',
      zippedArchive: false,
      maxFiles: '30d',
      datePattern: 'YYYY-MM-DD',
      level: 'exception',
    }),
  ],
});

export default logger;
