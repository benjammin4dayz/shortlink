import { addHit, addURL, getURL } from '../models/dbModel';
import { getOriginURL, validateURL } from '../utils/helpers';
import { shortLogger } from '../utils/logger';
import { idToShortURL } from '../utils/shortener';

const logger = shortLogger.getSubLogger({ name: 'Controller' });

export async function createShortURL(req, url) {
  url = validateURL(url);
  if (!url) return false;

  const id = await addURL(url);
  logger.trace(`Added URL with ID: ${id}`);

  const endpoint = `/s/${idToShortURL(id)}`;
  logger.trace(`Created new endpoint at: ${endpoint}`);

  const shortURL = new URL(endpoint, getOriginURL(req)).href;
  logger.trace(`Returning short URL: ${shortURL}`);

  return shortURL;
}

export async function fetchShortURL(id) {
  let url, hits;

  try {
    url = await getURL(id);
  } catch (e) {
    logger.error(e);
    logger.warn(500, id);
  }

  if (url) {
    try {
      hits = await addHit(id);
    } catch (e) {
      logger.fatal(e);
      logger.warn(500, id);
    }
  }

  return {
    url,
    hits,
  };
}
