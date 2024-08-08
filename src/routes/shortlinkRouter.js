import { Router } from 'express';
import { fetchShortURL } from '../controllers/shortlinkController';
import { httpLogger as logger } from '../utils/logger';
import { shortURLtoID } from '../utils/shortener';

export const router = Router();

router.get('/:shortURL', async (req, res) => {
  const { shortURL } = req.params;
  const id = shortURLtoID(shortURL);

  const { url, hits } = await fetchShortURL(id);

  logger.trace(
    'ID: %d - URL: %s - SHORT: %s - HITS: %d',
    id,
    url,
    shortURL,
    hits
  );

  if (!id || !url) return res.status(404).redirect('/');

  res.redirect(url);
});

export default router;
