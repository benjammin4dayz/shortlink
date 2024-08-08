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
export const DEV = Boolean(
  __env__('DEV', false, false).toLowerCase() === 'true'
);

/**
 *
 * @param {string} name
 * @param {?boolean} [required]
 * @param {?string} [defaultValue]
 * @returns {string}
 */
function __env__(name, required, defaultValue) {
  const value = process.env[name];
  if (required && !value) {
    throw new Error(`Missing required .env key: '${name}'`);
  }
  if (!value) {
    return defaultValue || '';
  }
  return String(value);
}
