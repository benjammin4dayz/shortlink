import { Router } from 'express';
import querystring from 'qs';
import { createShortURL } from '../controllers/shortlinkController';
import { apiLogger as logger } from '../utils/logger';

const router = Router();

router.post('/v1/shorten', async (req, res) => {
  const { url } = req.body;

  logger.trace('Received URL %s', url);

  const shortURL = await createShortURL(req, url);

  if (!shortURL) {
    logger.warn('Invalid URL %s - returning error', url);
    return res.status(400).json({ error: 'Invalid URL' });
  }

  res.status(201).json({
    message: 'URL created successfully',
    data: {
      url: shortURL,
    },
  });
});

router.get('/v1/shorten', async (req, res) => {
  const { url } = querystring.parse(req.query);

  // if the requester didn't send a url= param, this could be undefined
  // do not allow it to propagate any further
  // if (!url) {
  //   logger.warn('Received bad request - missing required query parameter: url');
  //   return res.status(400).send('');
  // }

  logger.trace('Received URL %s', url);

  const shortURL = await createShortURL(req, url);

  if (!shortURL) {
    logger.warn('Invalid URL %s - returning empty string', url);
    return res.send('');
  }

  res.send(shortURL);
});

export default router;
