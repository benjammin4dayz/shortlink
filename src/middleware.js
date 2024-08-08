import { httpFmt, httpLogger } from './utils/logger';

export const httpRequestLogger = () => (req, res, next) => {
  const logMessage = httpFmt(req, res);

  httpLogger.info(logMessage);

  next();
};
