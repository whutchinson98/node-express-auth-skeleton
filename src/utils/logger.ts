const winston = require('winston');

/*
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7
 */

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  defaultMeta: { date: new Date(Date.now()).toString() },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  ],
});

export const initLogger = (logLevel:string):void => {
  logger.level = logLevel;
};

export const logDebug = (message: string):void => {
  logger.log('debug', message.toString());
};

export const logInfo = (message: string):void => {
  logger.info(message.toString());
};

export const logWarn = (message: string):void => {
  logger.warn(message.toString());
};

export const logError = (message: string):void => {
  logger.error(message.toString());
};
export const logCrit = (message: string):void => {
  logger.log('crit', message.toString());
};
