const winston = require('winston');
require('winston-daily-rotate-file');

const transport = new (winston.transports.DailyRotateFile)({
  filename: 'logs/server-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.label({ label: 'smrtx-ms-boilerplate' }),
    winston.format.align(),
    winston.format.printf(
      entry => `${entry.timestamp} ${entry.level}: (${entry.label}) ${entry.message}`,
    ),
  ),
  transports: [
    transport,
  ],
});

logger.add(new winston.transports.Console());

module.exports = logger;
