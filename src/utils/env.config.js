import 'dotenv/config';

/**
 * The port on which the application will listen for incoming requests.
 * @default 3000
 */
export const PORT = Number.parseInt(__env__('PORT', false, 3000), 10);

/**
 * App environment; currently only affects the logger module
 * @default false
 */
export const DEV = __env__('DEV', false, false);

/**
 *
 * @param {string} name
 * @param {boolean} required
 * @param {*} fallback
 * @returns
 */
function __env__(name, required, fallback) {
  const parse = value => {
    if (value) value = String(value).toLowerCase().trim();
    switch (value) {
      case 'true':
        return true;
      case 'false':
        return false;
      case 'null':
        return null;
      case 'undefined':
        return undefined;
      default:
        return value;
    }
  };

  const value = parse(process.env[name]);

  if (!required && fallback === undefined) {
    throw new Error(`Missing fallback for optional .env key: ${name}`);
  }
  if (required && value === undefined && fallback === undefined) {
    throw new Error(`Missing required .env key: '${name}'`);
  }

  return value ?? fallback;
}
