export function getOriginURL(req) {
  return `${req.protocol}://${req.get('host')}`;
}

export function validateURL(url) {
  // if url was undefined, short circuit to an empty string to avoid
  // a high-caliber footgun when dealing with the string value 'undefined'
  url = String(url || '')
    .trimStart()
    .trimEnd();

  // inserting a protocol here can break validation. just expect it directly
  // from the caller because other protocols exist
  //
  // if (url && !/^https?:\/\//i.test(url)) {
  //   url = 'https://' + url;
  // }

  try {
    new URL(url).href;
  } catch {
    return false;
  }
  return url;
}
