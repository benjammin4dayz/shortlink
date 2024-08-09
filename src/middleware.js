import { httpFmt, httpLogger, logger } from './utils/logger';

export const httpRequestLogger = () => (req, res, next) => {
  const logMessage = httpFmt(req, res);

  httpLogger.info(logMessage);

  next();
};

export const errorHandler = () => (err, req, res, next) => {
  if (err) {
    logger.silly(err);
    switch (err.type) {
      case 'charset.unsupported':
      case 'encoding.unsupported':
      case 'entity.parse.failed':
      case 'entity.too.large':
      case 'entity.verify.failed':
      case 'parameters.too.many':
      case 'request.aborted':
      case 'request.size.invalid':
      case 'stream.encoding.set':
        logger.error(err.message);
        return res
          .status(err.status)
          .send({ status: err.status, message: err.message });
      default:
        break;
    }
  }
  next();
};
