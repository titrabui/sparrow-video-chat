import winston from 'winston'
import 'winston-daily-rotate-file'
import config from '../config'

const TRANSPORT_ROTATE_CONFIG = {
  filename: 'application-%DATE%.log',
  dirname: 'logs',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '1d'
}

let transport
if (config.NODE_ENV === 'production') {
  transport = new winston.transports.DailyRotateFile(
    TRANSPORT_ROTATE_CONFIG
  )
} else {
  transport = new winston.transports.Console({
    format: winston.format.combine(
      winston.format.align(),
      winston.format.colorize({ colors: { error: 'red' }}),
      winston.format.simple()
    )
  })
}

const logger = winston.createLogger({
  level: config.logger.level,
  levels: winston.config.cli.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: process.env.PROCESS_TYPE },
  transports: [ transport ],
  exceptionHandlers: [ transport ],
  silent: !config.logger.enabled
})

export default logger
