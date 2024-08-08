import { Logger } from 'tslog';
import { DEV } from './env.config';

export const logger = new Logger({
  ...(DEV ? {} : { hideLogPositionForProduction: true }),
});

export const httpLogger = logger.getSubLogger({
  name: 'HTTP',
});

export const apiLogger = logger.getSubLogger({
  name: 'API',
});

export const shortLogger = logger.getSubLogger({
  name: 'SHRT',
});

export const dbLogger = logger.getSubLogger({
  name: 'DB',
});

// ideal log message structure for http requests
export const httpFmt = (req, res) => {
  const {
    socket: { remoteAddress: address },
    method,
    url,
    httpVersion,
    headers: { referer, 'user-agent': userAgent },
  } = req;
  const { statusCode } = res;

  return `${address} - - ${method} ${url} HTTP/${httpVersion} ${statusCode} ${
    referer || '-'
  } ${userAgent || '-'}`;
};
