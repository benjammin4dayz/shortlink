// https://www.geeksforgeeks.org/how-to-design-a-tiny-url-or-url-shortener/
// https://en.wikipedia.org/wiki/Bijection

// Transform an integer ID into a short url
export function idToShortURL(n) {
  const map = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let shorturl = [];

  // Convert given integer id to a base 62 number
  while (n) {
    // construct short url by pushing mapped characters until n is 0
    shorturl.push(map[n % 62]);
    n = Math.floor(n / 62);
  }

  // Reverse shortURL to complete base conversion
  shorturl.reverse();

  return shorturl.join('');
}
// Transform a short URL into an integer ID
export function shortURLtoID(shortURL) {
  let id = 0,
    valid = true;

  for (let i = 0; i < shortURL.length; i++) {
    if (!Number.isSafeInteger(id)) {
      // checking for safe int prevents a vulnerability in which an attacker
      // could request a giga long url that would be parsed with undesirable results
      //
      valid = false;
      break;
    }
    // A simple base conversion logic
    if ('a' <= shortURL[i] && shortURL[i] <= 'z')
      id = id * 62 + shortURL[i].charCodeAt(0) - 'a'.charCodeAt(0);
    if ('A' <= shortURL[i] && shortURL[i] <= 'Z')
      id = id * 62 + shortURL[i].charCodeAt(0) - 'A'.charCodeAt(0) + 26;
    if ('0' <= shortURL[i] && shortURL[i] <= '9')
      id = id * 62 + shortURL[i].charCodeAt(0) - '0'.charCodeAt(0) + 52;
  }
  return valid ? id : -1;
}
